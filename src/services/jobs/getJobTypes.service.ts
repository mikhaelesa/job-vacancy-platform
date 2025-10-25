import apiClient from "@/src/api/client";
import { IJobTypesSuccessResponse } from "@/src/dto/jobTypes.dto";

export const getJobTypesService = <T = IJobTypesSuccessResponse>() => {
  return apiClient.request<T, unknown>({
    method: "GET",
    url: "/api/job-types",
  });
};
