import apiClient from "@/src/api/client";

export const applyJobService = (id: string, data: FormData) => {
  return apiClient.request(
    {
      data,
      method: "POST",
      url: `/api/jobs/apply/${id}`,
    },
    true
  );
};
