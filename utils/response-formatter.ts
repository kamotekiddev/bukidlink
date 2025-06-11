type SuccessResponse<T> = {
    status: 'success';
    message: string;
    data?: T;
};

type ErrorResponse<T> = {
    status: 'error';
    message: string;
    error?: T;
};

type SuccessParams<T> = {
    message?: string;
    data?: T;
};

type ErrorParams<T> = {
    message?: string;
    error?: T;
};

export const formatSuccess = <T>({
    message = 'Success',
    data,
}: SuccessParams<T>): SuccessResponse<T> => {
    return {
        status: 'success',
        message,
        ...(data !== undefined ? { data } : {}),
    };
};

export const formatError = <T>({
    message = 'An error occurred',
    error,
}: ErrorParams<T>): ErrorResponse<T> => {
    return {
        status: 'error',
        message,
        ...(error !== undefined ? { error } : {}),
    };
};
