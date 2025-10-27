import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import { applyJobService } from "@/src/services/jobs/applyJob.service";
import { useMutation } from "@tanstack/react-query";

const useApplyJobMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: FormData) => applyJobService(id, data),
    mutationKey: [MUTATION_KEYS.applyJob],
  });
};

export default useApplyJobMutation;
