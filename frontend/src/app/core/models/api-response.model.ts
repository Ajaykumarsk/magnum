export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    errors: any;
    status_code: number;
}

export interface PaginatedResponse<T> {
    count: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface TableQueryParams {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
    [key: string]: any;
}