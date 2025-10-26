import { QUERY_KEYS } from "@/src/constants/queryKeys.constant";
import { getPhoneCodesService } from "@/src/services/getPhoneCodes.service";
import { useQuery } from "@tanstack/react-query";

const useGetPhoneCodesQuery = () => {
  return useQuery({
    queryFn: () => getPhoneCodesService(),
    queryKey: [QUERY_KEYS.getPhoneCodes],
  });
};

export default useGetPhoneCodesQuery;
