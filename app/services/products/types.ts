export interface Product {
  ean: string;
  name: string;
  price: string;
  categoryId: number;
  description: string;
  image: string;
  url: string;
}

export type ProductExtended = Product & {
  categoryName: string;
  quantity: number;
};
