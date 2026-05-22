export interface ProductLine {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export interface ProductColor {
  id: string;
  name?: string | null;
  value: string;
}

export interface ProductColorGroup {
  id: string;
  name: string;
  description?: string | null;
  colors: ProductColor[];
}

export interface ProductLineProduct {
  id: string;
  name: string;
  description: string;
  technicalSheetUrl?: string | null;
  presentations: {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku?: string | null;
  }[];
  images: {
    id: string;
    url: string;
    alt?: string | null;
  }[];
  colorGroups: ProductColorGroup[];
}

export interface ProductLineById extends ProductLine {
  products: ProductLineProduct[];
}

interface ProductById {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  recommendations: string | null;
  technicalSheetUrl: string | null;
  productLineId: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  productLine: ProductLineById | null;
  colors: ProductColorById[];
  presentations: ProductPresentationById[];
}

interface ProductByIdResponse {
  data: ProductById;
}