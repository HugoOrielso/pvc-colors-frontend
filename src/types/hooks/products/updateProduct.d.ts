interface ProductImage {
    id: string;
    url: string;
    publicId?: string | null;
    alt?: string | null;
    position: number;
    isMain: boolean;
}

interface ProductColorInput {
    id?: string;
    name?: string;
    value: string;
}

interface ProductPresentationInput {
    name: string;
    price: number;
    stock: number;
    sku?: string | null;
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

