import { IProduct } from "./products";

export type ICart = {
  id?: string;
  products: IProduct[];
  created_at?: Date;
  updated_at?: Date;
};