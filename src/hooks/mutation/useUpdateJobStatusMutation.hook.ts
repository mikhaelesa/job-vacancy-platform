import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import { IUpdateJobStatusRequestBody } from "@/src/dto/updateJobStatus.dto";
import { updateJobStatusService } from "@/src/services/jobs/updateJobStatus.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateJobStatusMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: IUpdateJobStatusRequestBody) =>
      updateJobStatusService(id, data),
    mutationKey: [MUTATION_KEYS.updateJobStatus],
  });
};

export default useUpdateJobStatusMutation;
