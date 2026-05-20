interface CreateProductLineInput {
  name: string;
  slug: string;
  description: string;
  image: File;
};

interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  productLineId: string;

  productLine: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface ProductsResponse {
  message: string;
  data: ProductListItem[];
}

interface ProductLine {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

interface ProductLineById {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;

  products: ProductLineProduct[];

  _count?: {
    products: number;
  };
}

interface ProductLineProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  recommendations?: string | null;
  technicalSheetUrl?: string | null;
  productLineId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  colors: ProductColor[];
  presentations: ProductPresentation[];
  images: ProductImage[];
}

interface ProductColor {
  id: string;
  name?: string | null;
  value: string;
  productId: string;
}

interface ProductPresentation {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string | null;
  productId: string;
}

interface ProductImage {
  id: string;
  url: string;
  publicId?: string | null;
  alt?: string | null;
  position: number;
  isMain: boolean;
  productId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProductLinePayload {
  slug: string;
  name: string;
  description: string;
  image?: File | null;
};
