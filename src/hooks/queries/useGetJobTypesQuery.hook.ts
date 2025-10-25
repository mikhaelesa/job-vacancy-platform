import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { IJobTypesSuccessResponse } from "@/src/dto/jobTypes.dto";
import { getJobTypesService } from "@/src/services/jobs/getJobTypes.service";
import { useQuery } from "@tanstack/react-query";

const useGetJobTypesQuery = () => {
  return useQuery({
    queryFn: () => getJobTypesService<IJobTypesSuccessResponse>(),
    queryKey: [QUERY_KEYS.getJobTypes],
  });
};

export default useGetJobTypesQuery;
