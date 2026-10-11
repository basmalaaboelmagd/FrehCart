export interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  category?: { _id: string; name: string };
}

// GET /wishlist  -> المنتجات كاملة
export interface WishlistListResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

// POST / DELETE /wishlist -> بيرجّع IDs بس
export interface WishlistIdsResponse {
  status: string;
  message: string;
  data: string[];
}