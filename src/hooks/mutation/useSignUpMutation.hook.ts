import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import {
  ISignUpRequestBody,
  ISignUpSuccessResponse,
} from "@/src/dto/signUp.dto";
import { signUpService } from "@/src/services/authentication/signUp.service";
import { useMutation } from "@tanstack/react-query";

const useSignUpMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: ISignUpRequestBody) =>
      signUpService<ISignUpSuccessResponse>(data),
    mutationKey: [MUTATION_KEYS.signUp],
  });
  return mutation;
};

export default useSignUpMutation;
