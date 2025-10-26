import apiClient from "@/src/api/client";
import { IPhoneCodesSuccessResponse } from "../dto/phoneCodes.dto";

export const getPhoneCodesService = <T = IPhoneCodesSuccessResponse>() => {
  return apiClient.request<T, unknown>({
    method: "GET",
    url: "/api/phone-codes",
  });
};
