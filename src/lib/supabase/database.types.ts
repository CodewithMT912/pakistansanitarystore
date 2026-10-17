export type ProductRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image_url: string;
  description: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: Omit<ProductRow, "created_at"> & { created_at?: string };
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
