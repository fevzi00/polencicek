// src/types/index.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  title: string;  // ✅ Veritabanınızda "title" var
  slug: string;
  description?: string;
  price: number;
  stock?: number;
  images?: string[];
  is_active?: boolean;
  category_id?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  total_amount: number;
  status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}