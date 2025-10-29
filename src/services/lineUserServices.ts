// src/services/lineUserService.ts
import { QueryClient } from "@tanstack/react-query";
import { LineUser } from "@/types/lineUserTypes";

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

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ LINE ทั้งหมด
export async function fetchAllUsers(): Promise<LineUser[]> {
    try {
        const data = await fetchFromApi("users");
        return Array.isArray(data) ? (data as LineUser[]) : [];
    } catch (error) {
        throw new Error(`Unable to fetch users: ${(error as Error).message}`);
    }
}

// ฟังก์ชันสำหรับ prefetch ข้อมูลผู้ใช้ LINE ทั้งหมด
export async function prefetchAllUsers(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: ["users"],
        queryFn: fetchAllUsers,
    });
}
