import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

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

    console.log('📝 Creating order:', body);

    const { data: order, error } = await supabase
      .from('orders')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('❌ Order creation error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Order created:', order.id);

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: error.message || 'Order creation failed' },
      { status: 500 }
    );
  }
}