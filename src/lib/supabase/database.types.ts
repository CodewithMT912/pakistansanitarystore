import type { ProductVariant } from "@/data/store-data";

export type ProductRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image_url: string;
  description: string | null;
  variants: ProductVariant[];
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: Omit<ProductRow, "created_at" | "variants"> & {
          created_at?: string;
          variants?: ProductVariant[];
        };
        Update: Partial<Omit<ProductRow, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
