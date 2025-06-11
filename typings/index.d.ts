export type Location = {
    address_1?: string;
    brgy: string;
    city: string;
    province_or_state: string;
    zip_code: string;
    coords?: {
        lat: string;
        lng: string;
    };
};

export type Name = {
    first: string;
    middle?: string;
    last: string;
};

export type ApiSuccessResponse<T> = {
    status: 'success';
    message: string;
    data?: T;
};

export type ApiErrorResponse<T> = {
    status: 'error';
    message: string;
    error?: T;
};
