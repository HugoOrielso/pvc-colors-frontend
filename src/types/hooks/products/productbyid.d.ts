interface ProductColorById {
    id: string;
    name: string | null;
    value: string;
    productId: string;
}

interface ProductPresentationById {
    id: string;
    name: string;
    productId: string;
}

interface ProductLineById {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
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