import { AxiosResponse } from "axios";
import apiClient from "../../api/client";
import {
  ICheckEmailErrorResponse,
  ICheckEmailRequestBody,
  ICheckEmailSuccessResponse,
} from "../../dto/checkEmail.dto";

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
