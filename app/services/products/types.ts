export interface Product {
  ean: string;
  name: string;
  price: string;
  categoryId: number;
  description: string;
  image: string;
  url: string;
}

export type ProductWithCategory = Product & {
  categoryName: string;
};
