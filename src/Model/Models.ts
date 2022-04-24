export interface SellCarInterface {
  _id: string;
  sellerId: string;
  sellStatus: boolean;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  run: number;
  description: string;
  address: string;
  sellerName: string;
  mobileNo: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SignupInterface {
  name: string;
  email: string;
  password: string;
  favourites: string[];
  cart: string[];
  buy: string[];
  sell: string[];
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
