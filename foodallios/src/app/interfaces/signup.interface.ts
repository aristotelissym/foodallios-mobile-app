export interface SignUp {
    username: string;
    password: string;
    email: string;
    role: "CUSTOMER" | "OWNER";
    createdBy: "signUpForm";
    createdAt: Date;
    dateOfBirth: Date;
    
}