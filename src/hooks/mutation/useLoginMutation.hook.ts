import { MUTATION_KEYS } from "@/src/constants/mutationKeys.constant";
import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { ILoginRequestBody } from "@/src/dto/login.dto";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginRequestBody) =>
      supabaseClient.auth.signInWithPassword(data),
    mutationKey: [MUTATION_KEYS.login],
  });
};

export default useLoginMutation;
