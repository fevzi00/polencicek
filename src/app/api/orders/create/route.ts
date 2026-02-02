import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// Sipariş numarası oluştur
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `PC${year}${month}${day}${random}`; // Örnek: PC2502020123
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Service role client (sadece server-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseServiceKey) {
      console.error('❌ Service role key missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Sipariş numarası ekle
    const orderData = {
      ...body,
      order_number: generateOrderNumber(),
    };

    console.log('📝 Creating order:', orderData);

    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error('❌ Order creation error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Order created:', order.id, 'Order number:', order.order_number);

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: error.message || 'Order creation failed' },
      { status: 500 }
    );
  }
}