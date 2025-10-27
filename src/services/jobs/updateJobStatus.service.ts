import apiClient from "@/src/api/client";
import { IUpdateJobStatusRequestBody } from "@/src/dto/updateJobStatus.dto";

export const updateJobStatusService = (
  id: string,
  data: IUpdateJobStatusRequestBody
) => {
  return apiClient.request(
    {
      data,
      method: "PATCH",
      url: `/api/recruiter/jobs/${id}/change-status`,
    },
    true
  );
};
