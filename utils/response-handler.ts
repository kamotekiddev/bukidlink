type SuccessResponse<T> = {
    status: 'success';
    message: string;
    data: T | null;
};

type ErrorReponse<T> = {
    status: 'error';
    message: string;
    error?: T;
};

type SuccessParams<T> = {
    message?: string;
    data: T | null;
};

type ErrorParams<T> = {
    message?: string;
    error?: T;
};

export class ResponseHandler {
    public static success<T>({
        message = 'Success',
        data,
    }: SuccessParams<T>): SuccessResponse<T> {
        return {
            status: 'success',
            message,
            data,
        };
    }

    public static error<T>({
        message = 'An error occurred',
        error,
    }: ErrorParams<T>): ErrorReponse<T> {
        return {
            status: 'error',
            message,
            ...(error !== undefined ? { error } : {}),
        };
    }
}
