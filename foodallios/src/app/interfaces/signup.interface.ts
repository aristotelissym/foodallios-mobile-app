export interface SignUp {
    username: string;
    password: string;
    email: string;
    role: "CUSTOMER" | "OWNER";
    dateOfBirth: Date;
    
}