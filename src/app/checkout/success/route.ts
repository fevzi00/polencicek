import { NextRequest, NextResponse } from 'next/server';

// Ortak handler
function handleSuccess(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('orderId');
  
  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sipariş Başarılı - Polen Çiçek</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 600px;
      padding: 40px;
      text-center;
    }
    .icon {
      width: 120px;
      height: 120px;
      margin: 0 auto 40px;
      background: #dcfce7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bounce 1s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .checkmark {
      width: 60px;
      height: 60px;
      stroke: #16a34a;
      stroke-width: 3;
      fill: none;
    }
    h1 {
      font-size: 48px;
      color: #0f172a;
      margin-bottom: 20px;
      font-weight: 700;
    }
    p {
      font-size: 20px;
      color: #64748b;
      margin-bottom: 40px;
    }
    .order-id {
      display: inline-block;
      background: #f3e8ff;
      border: 2px solid #e9d5ff;
      padding: 15px 30px;
      border-radius: 15px;
      margin-bottom: 40px;
    }
    .order-id small {
      display: block;
      font-size: 14px;
      color: #64748b;
      margin-bottom: 5px;
    }
    .order-id strong {
      font-size: 24px;
      color: #9333ea;
      font-family: monospace;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    button {
      width: 100%;
      padding: 18px;
      border: none;
      border-radius: 15px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-primary {
      background: linear-gradient(135deg, #9333ea, #ec4899);
      color: white;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(147, 51, 234, 0.3);
    }
    .btn-secondary {
      background: white;
      color: #9333ea;
      border: 2px solid #9333ea;
    }
    .btn-secondary:hover {
      background: #faf5ff;
      transform: translateY(-2px);
    }
    @media (max-width: 640px) {
      .container { padding: 20px; }
      h1 { font-size: 36px; }
      p { font-size: 18px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <svg class="checkmark" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <h1>Siparişiniz Alındı! 🎉</h1>
    <p>Ödemeniz başarıyla tamamlandı</p>
    
    ${orderId ? `
    <div class="order-id">
      <small>Sipariş Numaranız</small>
      <strong>#${orderId.slice(0, 8).toUpperCase()}</strong>
    </div>
    ` : ''}

    <div class="buttons">
      <button class="btn-primary" onclick="window.location.href='/'">
        🏠 Ana Sayfaya Dön
      </button>
      <button class="btn-secondary" onclick="window.location.href='/products'">
        🛍️ Alışverişe Devam Et
      </button>
    </div>
  </div>

  <script>
    // Sepeti temizle
    try {
      localStorage.removeItem('cart-storage');
      console.log('✅ Cart cleared');
    } catch (e) {
      console.error('Cart clear error:', e);
    }
  </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

// GET ve POST için aynı handler
export async function GET(request: NextRequest) {
  return handleSuccess(request);
}

export async function POST(request: NextRequest) {
  return handleSuccess(request);
}