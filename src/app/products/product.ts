export interface Product {
  photo: {
    name: string;
    url: string;
  };
  name: string;
  description: string;
  price: number;
  city: string;
  category: string;
  time: Date;
}
