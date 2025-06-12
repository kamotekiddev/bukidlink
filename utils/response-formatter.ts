type ResponseParams<T> = {
    isSuccess: boolean;
    message?: string;
    data?: T;
};

type ResponseFormat<T> = {
    isSuccess: boolean;
    message?: string;
    data?: T;
};

export const formatResponse = <T>({
    isSuccess,
    message = '',
    data,
}: ResponseParams<T>): ResponseFormat<T> => {
    return {
        isSuccess,
        message,
        ...(data !== undefined ? { data } : {}),
    };
};
