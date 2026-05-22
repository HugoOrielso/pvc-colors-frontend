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

interface ProductColorGroupInput {
  name: string;
  description?: string | null;
  position?: number;
  colors: ProductColorInput[];
}

interface BaseProductInput {
  name: string;
  slug: string;
  description: string;
  recommendations?: string;
  coverageMinM2PerGallon?: number;
  coverageMaxM2PerGallon?: number;
  productLineId: string;
  colors?: ProductColorInput[];
  colorGroups?: ProductColorGroupInput[];
  presentations: ProductPresentationInput[];
  features?: ProductFeatureInput[];
}

interface ProductColorGroupInput {
  name: string;
  description?: string | null;
  position?: number;
  colors: ProductColorInput[];
}

interface ProductFeatureInput {
  name: string;
  description?: string;
}

interface CreateProductFormInput extends BaseProductInput {
  images: File[];
  technicalSheet?: File | null;
  colorGroups?: ProductColorGroupInput[];
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
  colorGroups?: ProductColorGroupInput[];
  presentations: ProductPresentationInput[];
  coverageMinM2PerGallon?: number | null;
  coverageMaxM2PerGallon?: number | null;
  features?: ProductFeatureInput[];
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




// types/product.types.ts

interface PublicProductImage {
  id: string;
  url: string;
  alt?: string | null;
  position: number;
  isMain: boolean;
}

interface PublicProductColor {
  id: string;
  name?: string | null;
  value: string;
}

interface PublicProductColorGroup {
  id: string;
  name: string;
  description?: string | null;
  colors: PublicProductColor[];
}

interface PublicProductPresentation {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string | null;
}

interface PublicProductFeature {
  id: string;
  name: string;
  description: string;
}

interface PublicProductDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  recommendations?: string | null;
  technicalSheetUrl?: string | null;
  productLineId: string;
  isActive: boolean;
  coverageMinM2PerGallon?: number;
  coverageMaxM2PerGallon?: number;
  images: PublicProductImage[];
  colors: PublicProductColor[];
  colorGroups: PublicProductColorGroup[];
  presentations: PublicProductPresentation[];
  features?: PublicProductFeature[];
  productLine?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface PublicProductResponse {
  ok: boolean;
  data: PublicProductDetail;
}