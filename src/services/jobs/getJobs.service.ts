import apiClient from "@/src/api/client";
import { IJobsSuccessResponse } from "@/src/dto/jobs.dto";

export const getJobsService = <T = IJobsSuccessResponse>() => {
  return apiClient.request<T, unknown>({
    method: "GET",
    url: "/api/jobs",
  });
};
