import apiClient from "@/src/api/client";
import {
  IRecruiterJobsSearchParams,
  IRecruiterJobsSuccessResponse,
} from "@/src/dto/recruiterJobs.dto";

export const getRecruiterOwnJobsService = <T = IRecruiterJobsSuccessResponse>(
  params?: IRecruiterJobsSearchParams
) => {
  return apiClient.request<T, unknown>(
    {
      method: "GET",
      url: "/api/recruiter/jobs",
      ...(params && { params }),
    },
    true
  );
};
