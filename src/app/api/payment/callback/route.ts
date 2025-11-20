import { NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Payment callback received');

  
    const Iyzipay = (await import('iyzipay')).default;

    const formData = await request.formData();
    const token = formData.get('token') as string;

    console.log('🎫 Token:', token);

    if (!token) {
      console.error('❌ Token missing');
      // ✅ FIXED: Tam URL kullan
      return NextResponse.redirect('http://localhost:3000/checkout/error?message=Token+bulunamadı');
    }

    // İyzico instance
    const iyzico = new Iyzipay({
      apiKey: process.env.NEXT_PUBLIC_IYZICO_API_KEY!,
      secretKey: process.env.IYZICO_SECRET_KEY!,
      uri: process.env.NEXT_PUBLIC_IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    });

    // Ödemeyi doğrula
    const result: any = await new Promise((resolve, reject) => {
      iyzico.checkoutForm.retrieve(
        {
          locale: Iyzipay.LOCALE.TR,
          token: token,
        },
        (err: any, result: any) => {
          if (err) {
            console.error('❌ Retrieve error:', err);
            reject(err);
          } else {
            console.log('✅ Retrieve success:', result);
            resolve(result);
          }
        }
      );
    });

    console.log('📊 Payment result:', {
      status: result.status,
      paymentStatus: result.paymentStatus,
      basketId: result.basketId,
      paymentId: result.paymentId,
      price: result.price,
    });

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      const orderId = result.basketId;

      if (!orderId) {
        console.error('❌ Order ID missing in result');
        // ✅ FIXED: Tam URL kullan
        return NextResponse.redirect('http://localhost:3000/checkout/error?message=Siparis+ID+bulunamadi');
      }

      // Siparişi güncelle
      const supabase = serverSupabase();
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          payment_method: 'card',
          iyzico_payment_id: result.paymentId,
        })
        .eq('id', orderId);

      if (updateError) {
        console.error('❌ Order update error:', updateError);
      } else {
        console.log('✅ Order confirmed:', orderId);
      }

      // Stokları düş
      const { data: order } = await supabase
        .from('orders')
        .select('items')
        .eq('id', orderId)
        .single();

      if (order && order.items) {
        const items = typeof order.items === 'string' 
          ? JSON.parse(order.items) 
          : order.items;

        console.log('📦 Updating stock for items:', items);

        for (const item of items) {
          const { data: product } = await supabase
            .from('products')
            .select('stock')
            .eq('id', item.id)
            .single();

          if (product && product.stock !== null) {
            const newStock = Math.max(0, product.stock - item.quantity);
            
            await supabase
              .from('products')
              .update({ stock: newStock })
              .eq('id', item.id);

            console.log(`✅ Stock updated for ${item.title}: ${product.stock} → ${newStock}`);
          }
        }
      }

      // ✅ FIXED: Tam URL kullan
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const redirectUrl = `${baseUrl}/checkout/success?orderId=${orderId}`;
      
      console.log('🔀 Redirecting to:', redirectUrl);
      
      return NextResponse.redirect(redirectUrl);
    } else {
      console.error('❌ Payment failed:', {
        status: result.status,
        paymentStatus: result.paymentStatus,
        errorMessage: result.errorMessage,
      });
      
      // ✅ FIXED: Tam URL kullan
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const errorMessage = encodeURIComponent(result.errorMessage || 'Ödeme başarısız');
      return NextResponse.redirect(`${baseUrl}/checkout/error?message=${errorMessage}`);
    }
  } catch (error: any) {
    console.error('❌ Callback error:', error);
    // ✅ FIXED: Tam URL kullan
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/checkout/error?message=Odeme+dogrulama+hatasi`);
  }
}