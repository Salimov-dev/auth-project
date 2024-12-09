export type Segment = "login" | "register";

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister extends ILogin {
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
