export interface ApiResponse<T> {
    messages: string[]
    status: boolean
    data: T
    error: ApiError[]
}

export interface ApiError {
    field: string
    validator: string
    message: string
}

export interface Pagination {
    limit: number
    offset: number
}
