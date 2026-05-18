// types/product.ts

interface ProductColor {
  id?: string;
  name?: string;
  value: string;
}

interface ProductPresentation {
  id?: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
}

interface ProductImage {
  id?: string;
  url: string;
  publicId?: string | null;
  alt?: string | null;
  position: number;
  isMain: boolean;
}

interface Product {
  id: string;

  name: string;
  slug: string;
  description: string;

  recommendations?: string | null;
  technicalSheetUrl?: string | null;

  productLineId: string;

  colors: ProductColor[];
  presentations: ProductPresentation[];
  images: ProductImage[];

  isActive: boolean;

  createdAt: string;
  updatedAt: string;

  productLine?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}