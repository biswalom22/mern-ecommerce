export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    stock: number;
    sizes: any;
    ratings: any;
  }
