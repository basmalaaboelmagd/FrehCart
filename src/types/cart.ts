export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category?: { _id: string; name: string };
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  data: Cart;
}