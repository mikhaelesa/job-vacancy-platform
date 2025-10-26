import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { getDomicilesService } from "@/src/services/getDomiciles.service";
import { useQuery } from "@tanstack/react-query";

const useGetDomicilesQuery = () => {
  return useQuery({
    queryFn: () => getDomicilesService(),
    queryKey: [QUERY_KEYS.getDomiciles],
  });
};

export default useGetDomicilesQuery;
