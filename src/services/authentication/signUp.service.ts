import {
  ISignUpErrorResponse,
  ISignUpRequestBody,
  ISignUpSuccessResponse,
} from "@/src/dto/signUp.dto";
import { AxiosResponse } from "axios";
import apiClient from "../../api/client";

export const signUpService = <
  T = ISignUpErrorResponse | ISignUpSuccessResponse
>(
  data: ISignUpRequestBody
): Promise<AxiosResponse<T, ISignUpRequestBody>> => {
  return apiClient.request(
    {
      data,
      method: "POST",
      url: "/api/authentication/sign-up",
    },
    true
  );
};
