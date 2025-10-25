import { Session, User } from "@supabase/supabase-js";

export interface ISignUpRequestBody {
  email: string;
  password: string;
  role: string;
  fullName: string;
  companyName: string | null;
}

export interface ISignUpSuccessResponse {
  user: User | null;
  session: Session | null;
}

export interface ISignUpErrorResponse {
  message: string;
  code: string;
}
