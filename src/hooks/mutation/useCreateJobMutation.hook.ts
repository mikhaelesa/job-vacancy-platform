import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import { ICreateJobRequestBody } from "@/src/dto/createJob.dto";
import { createJobService } from "@/src/services/jobs/createJob.service";
import { useMutation } from "@tanstack/react-query";

const useCreateJobMutation = () => {
  return useMutation({
    mutationFn: (data: ICreateJobRequestBody) => createJobService(data),
    mutationKey: [MUTATION_KEYS.createJob],
  });
};

export default useCreateJobMutation;
