type Location = {
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

type Name = {
    first: string;
    middle?: string;
    last: string;
};
