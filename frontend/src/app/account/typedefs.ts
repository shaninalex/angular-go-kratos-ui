export interface GeneralError {
    id: string
    error: Error
    created_at: string
    updated_at: string
}

export interface Error {
    id: string
    code: number
    reason: string
    status: string
    details: ErrorDetails
    message: string
}

export interface ErrorDetails {
    docs: string
    hint: string
    reject_reason: string
}
