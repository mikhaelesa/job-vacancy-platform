import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import useUpdateJobStatusMutation from "@/src/hooks/mutation/useUpdateJobStatusMutation.hook";
import useGetJobApplicantsQuery from "@/src/hooks/queries/useGetJobApplicantsQuery.hook";
import useGetJobQuery from "@/src/hooks/queries/useGetJobQuery.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { createApplicantsTableColumns } from "../constants/createApplicantsTableColumns.constant";

const useManageJobManager = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const jobId = params.id;
  const updateJobStatusMutation = useUpdateJobStatusMutation(jobId);
  const jobApplicantsQuery = useGetJobApplicantsQuery(jobId);
  const jobApplicants = jobApplicantsQuery.data?.data.data;
  const jobQuery = useGetJobQuery(jobId);
  const job = jobQuery.data?.data.data;
  const isNoApplicants = !jobApplicants?.length || !jobApplicants;
  const isLoading = jobApplicantsQuery.isLoading || jobQuery.isLoading;
  const isJobActive = job?.status === "active";
  const isUpdatingJobStatus = updateJobStatusMutation.isPending;
  const columns = useMemo(() => createApplicantsTableColumns(), []);

  const getUpdateJobStatusHandler = async () => {
    try {
      const nextStatus = job?.status === "active" ? "inactive" : "active";
      await updateJobStatusMutation.mutateAsync({ status: nextStatus });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getJobs],
        type: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getRecruiterOwnJobs],
        type: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getJob, jobId],
        type: "all",
      });
      toast.success("Job status updated successfully");
    } catch {
      toast.error("Failed to update job status. Please try again later.");
    }
  };

  return {
    job,
    isLoading,
    getUpdateJobStatusHandler,
    isJobActive,
    jobApplicants,
    isUpdatingJobStatus,
    isNoApplicants,
    columns,
  };
};

export default useManageJobManager;
