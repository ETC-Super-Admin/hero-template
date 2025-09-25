// src/services/productService.ts
import { QueryClient } from "@tanstack/react-query";
import { PageCursor, Product, ProductsResponse } from "@/types/productTypes"; // <-- add this import
import { getImagePath } from "@/utils/imageUtils";

// อินเตอร์เฟสสำหรับ query parameters
interface ProductQueryParams {
    cursor?: number;
    pageSize?: number;
    organizeId?: number;
    classificationId?: number;
    sort?: "newest" | "oldest" | "high" | "low"; // restrict to allowed values
    categoryId?: number;
    limiter?: number;
}

// กำหนด base URL จาก environment variable
const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL;

if (!serviceUrl) {
    throw new Error("NEXT_PUBLIC_SERVICE_URL is not defined in the environment variables.");
}

// ฟังก์ชันสำหรับสร้าง query string
function buildQueryParams(params: Record<string, string | number | boolean | null | undefined>): string {
    return Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
        .join("&");
}

// ฟังก์ชันสำหรับดึงข้อมูลจาก API
async function fetchFromApi(endpoint: string, params: Record<string, string | number | boolean | null | undefined> = {}) {
    const queryString = buildQueryParams(params);
    const url = `${serviceUrl}/${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
export async function fetchProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    try {
        const data = await fetchFromApi("products", {
            cursor: params.cursor,
            pageSize: params.pageSize, // <-- remove fallback to 40
            organizeId: params.organizeId,
            classificationId: params.classificationId,
            sort: params.sort, // now type-safe
            categoryId: params.categoryId,
            limiter: params.limiter,
        });

        // Always return a fully typed ProductsResponse object
        return {
            products: Array.isArray(data.items) ? (data.items as Product[]) : [],
            totalCount: typeof data.totalCount === "number" ? data.totalCount : null,
            totalPage: typeof data.totalPage === "number" ? data.totalPage : null,
            pageCursor: Array.isArray(data.pageCursor) ? (data.pageCursor as PageCursor[]) : [],
        };
    } catch (error) {
        throw new Error(`Unable to fetch products: ${(error as Error).message}`);
    }
}

// ฟังก์ชันสำหรับ prefetch ข้อมูลสินค้า
export async function prefetchProducts(queryClient: QueryClient, params: ProductQueryParams = {}) {
    await queryClient.prefetchQuery({
        queryKey: ["products", params],
        queryFn: () => fetchProducts(params),
    });
}

// ฟังก์ชันสำหรับ preload รูปภาพ
export async function preloadImages(products: Product[]) {
    if (typeof window === "undefined" || !window.Image) {
        return;
    }

    const imagePromises = products
        .map((product) => product.imageCoverPath) // ใช้ imageCoverPath
        .filter((path): path is string => !!path) // กรองเฉพาะ path ที่ไม่เป็น null
        .map((path) => {
            return new Promise((resolve) => {
                const img = new window.Image();
                img.src = getImagePath(path); // ใช้ getImagePath
                img.onload = resolve;
                img.onerror = resolve;
            });
        });

    await Promise.all(imagePromises);
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าเดี่ยวตาม id หรือ productId
export async function fetchProductByIdOrProductId({
    id,
    productId,
}: { id?: number; productId?: string }): Promise<Product> {
    if (!id && !productId) {
        throw new Error("Either 'id' or 'productId' must be provided.");
    }
    const params: Record<string, string | number> = {};
    if (id) params.id = id;
    if (productId) params.productId = productId;

    const data = await fetchFromApi("product", params);

    if (!data || typeof data !== "object") {
        throw new Error("Product not found or invalid response.");
    }
    return data as Product;
}