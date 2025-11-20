import { NextRequest, NextResponse } from 'next/server';

// Runtime'ı Node olarak ayarla (Edge değil)
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Payment request received');

    // İyzico'yu dynamic import et
    const Iyzipay = (await import('iyzipay')).default;

    const body = await request.json();
    const { orderId, totalAmount, customer, shippingAddress, items } = body;

    console.log('📦 Order data:', {
      orderId,
      totalAmount,
      customerName: customer.name,
      itemCount: items.length,
    });

    // Validasyon
    if (!orderId || !totalAmount || !customer || !items || items.length === 0) {
      return NextResponse.json(
        { 
          status: 'failure',
          error: 'Eksik bilgi. Lütfen tüm alanları doldurun.',
        },
        { status: 400 }
      );
    }

    // API keys kontrolü
    const apiKey = process.env.NEXT_PUBLIC_IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;

    console.log('🔑 API Keys check:', {
      apiKeyExists: !!apiKey,
      secretKeyExists: !!secretKey,
      apiKeyPrefix: apiKey?.substring(0, 10),
    });

    if (!apiKey || !secretKey) {
      console.error('❌ Iyzico API keys missing!');
      return NextResponse.json(
        { 
          status: 'failure',
          error: 'Ödeme sistemi yapılandırması eksik. Lütfen .env.local dosyasını kontrol edin.',
        },
        { status: 500 }
      );
    }

    // İyzico instance oluştur
    const iyzico = new Iyzipay({
      apiKey: apiKey,
      secretKey: secretKey,
      uri: process.env.NEXT_PUBLIC_IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    });

    // İsim ayrıştırma
    const nameParts = customer.name.trim().split(' ');
    const firstName = nameParts[0] || 'Ad';
    const lastName = nameParts.slice(1).join(' ') || 'Soyad';

    // Şehir çıkarma
    const addressParts = shippingAddress.split(',');
    const city = addressParts[addressParts.length - 1]?.trim() || 'Konya';

    // Telefon temizleme
    const cleanPhone = customer.phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('+90') 
      ? cleanPhone 
      : cleanPhone.startsWith('90') 
        ? `+${cleanPhone}` 
        : cleanPhone.startsWith('0')
          ? `+9${cleanPhone}`
          : `+90${cleanPhone}`;

    // Callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payment/callback`;

    console.log('📞 Callback URL:', callbackUrl);
    console.log('👤 Buyer info:', {
      name: firstName,
      surname: lastName,
      phone: formattedPhone,
      email: customer.email,
    });

    // Sepet toplamını hesapla
    const calculatedTotal = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    console.log('💰 Total:', calculatedTotal.toFixed(2));

    const paymentRequest = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: orderId,
      price: calculatedTotal.toFixed(2),
      paidPrice: calculatedTotal.toFixed(2),
      currency: Iyzipay.CURRENCY.TRY,
      basketId: orderId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: callbackUrl,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: {
        id: customer.email,
        name: firstName,
        surname: lastName,
        gsmNumber: formattedPhone,
        email: customer.email,
        identityNumber: '11111111111',
        lastLoginDate: '2024-01-01 12:00:00',
        registrationDate: '2024-01-01 12:00:00',
        registrationAddress: shippingAddress,
        ip: '85.34.78.112',
        city: city,
        country: 'Turkey',
        zipCode: '42320',
      },
      shippingAddress: {
        contactName: `${firstName} ${lastName}`,
        city: city,
        country: 'Turkey',
        address: shippingAddress,
        zipCode: '42320',
      },
      billingAddress: {
        contactName: `${firstName} ${lastName}`,
        city: city,
        country: 'Turkey',
        address: shippingAddress,
        zipCode: '42320',
      },
      basketItems: items.map((item: any) => ({
        id: item.id.substring(0, 50),
        name: item.title.substring(0, 100),
        category1: 'Cicek',
        category2: 'Buket',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: (item.price * item.quantity).toFixed(2),
      })),
    };

    console.log('📤 Request to Iyzico:', JSON.stringify(paymentRequest, null, 2));

    // Ödeme oluştur
    const result: any = await new Promise((resolve, reject) => {
      iyzico.checkoutFormInitialize.create(
        paymentRequest,
        (err: any, result: any) => {
          if (err) {
            console.error('❌ Iyzico callback error:', JSON.stringify(err, null, 2));
            reject(err);
          } else {
            console.log('✅ Iyzico callback success:', JSON.stringify(result, null, 2));
            resolve(result);
          }
        }
      );
    });

    // Sonucu kontrol et
    if (result.status === 'success') {
      console.log('✅ Payment page URL:', result.paymentPageUrl);
      return NextResponse.json({
        status: 'success',
        paymentPageUrl: result.paymentPageUrl,
        token: result.token,
        conversationId: result.conversationId,
      });
    } else {
      console.error('❌ Iyzico returned failure:', {
        status: result.status,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
        errorGroup: result.errorGroup,
      });
      return NextResponse.json(
        {
          status: 'failure',
          error: result.errorMessage || 'Ödeme sayfası oluşturulamadı',
          errorCode: result.errorCode,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ Payment creation exception:', {
      message: error.message,
      stack: error.stack,
      full: JSON.stringify(error, null, 2),
    });
    
    return NextResponse.json(
      { 
        status: 'failure',
        error: error.message || 'Ödeme işlemi sırasında hata oluştu',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}