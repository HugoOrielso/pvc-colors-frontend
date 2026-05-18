interface ProductColorInput {
  name?: string | null;
  value: string;
}

interface ProductPresentationInput {
  name: string;
  price: number;
  stock: number;
  sku?: string | null;
}

interface BaseProductInput {
  name: string;
  slug: string;
  description: string;
  recommendations?: string;
  productLineId: string;
  colors?: ProductColorInput[];
  presentations: ProductPresentationInput[];
}

interface CreateProductFormInput extends BaseProductInput {
  images: File[];
  technicalSheet?: File | null;
}


interface UpdateProductFormInput extends BaseProductInput {
  images?: File[];
  technicalSheet?: File | string | null;
  existingImages?: ExistingProductImageInput[]
}

interface ExistingProductImageInput {
  id: string;
  alt?: string | null;
  position?: number;
  isMain?: boolean;
};

interface ProductImage {
  id: string;
  url: string;
  publicId?: string | null;
  alt?: string | null;
  position: number;
  isMain: boolean;
}

interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  recommendations?: string | null;
  technicalSheetUrl?: string | null;
  productLineId: string;
  isActive: boolean;
  images: ProductImage[];
  colors: ProductColorInput[];
  presentations: ProductPresentationInput[];
  productLine?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface ProductResponse {
  message: string;
  data: ProductDetail;
}