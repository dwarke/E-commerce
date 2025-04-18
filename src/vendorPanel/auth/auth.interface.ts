export interface register {
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    profile: string,
    genderCategory: 'male'|'female',
    role: string,
    status?: string;
    isBlocked?: boolean,
    token?: string;
    resetToken?: string
};