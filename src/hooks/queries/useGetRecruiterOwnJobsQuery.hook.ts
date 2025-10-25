import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { IRecruiterJobsSearchParams } from "@/src/dto/recruiterJobs.dto";
import { getRecruiterOwnJobsService } from "@/src/services/jobs/getRecruiterOwnJobs.service";
import { useQuery } from "@tanstack/react-query";

const useGetRecruiterOwnJobsQuery = (params?: IRecruiterJobsSearchParams) => {
  return useQuery({
    queryFn: () => getRecruiterOwnJobsService(params),
    queryKey: [QUERY_KEYS.getRecruiterOwnJobs, params?.search],
  });
};

export default useGetRecruiterOwnJobsQuery;
