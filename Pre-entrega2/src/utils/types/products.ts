export type IProduct = {
    id?: string;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    sku?: string;
    stock: number;
    created_at?: Date;
    updated_at?: Date;
  };