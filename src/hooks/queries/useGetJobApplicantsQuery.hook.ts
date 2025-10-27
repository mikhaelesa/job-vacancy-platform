import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { getJobApplicantsService } from "@/src/services/jobs/getJobApplicants.service";
import { useQuery } from "@tanstack/react-query";

const useGetJobApplicantsQuery = (id: string) => {
  return useQuery({
    queryFn: () => getJobApplicantsService(id),
    queryKey: [QUERY_KEYS.getJobApplicants],
  });
};

export default useGetJobApplicantsQuery;
