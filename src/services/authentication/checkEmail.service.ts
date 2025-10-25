import apiClient from "@/src/api/client";
import {
  ICheckEmailErrorResponse,
  ICheckEmailRequestBody,
  ICheckEmailSuccessResponse,
} from "@/src/dto/checkEmail.dto";
import { AxiosResponse } from "axios";

export const checkEmailService = <
  T = ICheckEmailErrorResponse | ICheckEmailSuccessResponse
>(
  data: ICheckEmailRequestBody
): Promise<AxiosResponse<T, ICheckEmailRequestBody>> => {
  return apiClient.request({
    data,
    method: "POST",
    url: "/api/authentication/check-email",
  });
};
