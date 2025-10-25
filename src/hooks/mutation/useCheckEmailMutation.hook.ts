import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import {
  ICheckEmailRequestBody,
  ICheckEmailSuccessResponse,
} from "@/src/dto/checkEmail.dto";
import { checkEmailService } from "@/src/services/authentication/checkEmail.service";
import { useMutation } from "@tanstack/react-query";

const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: (data: ICheckEmailRequestBody) =>
      checkEmailService<ICheckEmailSuccessResponse>(data),
    mutationKey: [MUTATION_KEYS.checkEmail],
  });
};

export default useCheckEmailMutation;
