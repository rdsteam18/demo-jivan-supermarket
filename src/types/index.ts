export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  mrp: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  featured?: boolean;
  rating: number;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface ShopInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  area: string;
  city: string;
  phone: string;
  openingHours: string;
  storeImage: string;
  insideImage: string;
}
