export interface register {
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    profile: string,
    genderCategory: 'male'|'female',
    role: string,
    token?: string;
    resetToken?: string
};