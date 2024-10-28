export const API_URL = "http://localhost:5002/v1";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  creation_date: string;
  image: string;
}

export interface Comment {
  id: number;
  email: string;
  name: string;
  text: string;
}

export interface ProductResI {
  product: ProductData;
  productComments: Comment[];
  userReview: number;
  rating: [
    {
      avg: number | null;
    }
  ];
}

export interface CommentI {
  id: number;
  name: string;
  email: string;
  text: string;
}
