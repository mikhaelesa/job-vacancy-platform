import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { getJobService } from "@/src/services/jobs/getJob.service";
import { useQuery } from "@tanstack/react-query";

const useGetJobQuery = (id: string) => {
  return useQuery({
    queryFn: () => getJobService(id),
    queryKey: [QUERY_KEYS.getJob, id],
  });
};

export default useGetJobQuery;
