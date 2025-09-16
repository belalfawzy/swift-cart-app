export interface OrderResponse {
  status: string;
  results: number;
  data: OrderData[];
}

// Alternative response structure (when data comes as array directly)
export type OrderDataArray = OrderData[];

export interface OrderData {
  _id: string;
  shippingAddress: ShippingAddress;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  totalOrderPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  cartItems: OrderCartItem[];
  user: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderCartItem {
  count: number;
  price: number;
  product: OrderProduct;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
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
  ratingsAverage: number;
  id: string;
}

export interface OrderStatus {
  isPaid: boolean;
  isDelivered: boolean;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  statusText: string;
  statusColor: string;
}
