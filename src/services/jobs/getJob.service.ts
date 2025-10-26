import apiClient from "@/src/api/client";
import { IJobSuccessResponse } from "@/src/dto/job.dto";

export const getJobService = <T = IJobSuccessResponse>(id: string) => {
  return apiClient.request<T, unknown>({
    method: "GET",
    url: `/api/jobs/${id}`,
  });
};
