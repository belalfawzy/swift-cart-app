export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistData[];
}

export interface WishlistData {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  id: string;
}

export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: WishlistData;
}

export interface RemoveFromWishlistResponse {
  status: string;
  message: string;
}
