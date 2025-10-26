import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { getJobsService } from "@/src/services/jobs/getJobs.service";
import { useQuery } from "@tanstack/react-query";

const useGetJobsQuery = () => {
  return useQuery({
    queryFn: () => getJobsService(),
    queryKey: [QUERY_KEYS.getJobs],
  });
};

export default useGetJobsQuery;
