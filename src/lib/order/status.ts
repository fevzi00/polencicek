// src/lib/order/status.ts
export type OrderStatus = "pending" | "preparing" | "shipped" | "delivered" | "cancelled";

/**
 * Görüntülenecek Türkçe metinler:
 * - "sipariş alındı" (pending)
 * - "hazırlanıyor" (preparing) -> eski "paid" yerine daha anlamlı bir ara durum
 * - "kurye yolda" (shipped)
 * - "teslim edildi" (delivered)
 * - "iptal edildi" (cancelled)
 */
export function statusText(s: OrderStatus) {
  switch (s) {
    case "pending": return "sipariş alındı";
    case "preparing": return "hazırlanıyor";
    case "shipped": return "kurye yolda";
    case "delivered": return "teslim edildi";
    case "cancelled": return "iptal edildi";
    default: return String(s);
  }
}
