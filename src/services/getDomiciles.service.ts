import apiClient from "@/src/api/client";
import { IDomicilesSuccessResponse } from "../dto/domiciles.dto";

export const getDomicilesService = <T = IDomicilesSuccessResponse>() => {
  return apiClient.request<T, unknown>({
    method: "GET",
    url: "/api/domiciles",
  });
};
