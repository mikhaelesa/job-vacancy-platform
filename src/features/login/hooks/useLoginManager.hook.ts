import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { ILoginRequestBody } from "@/src/dto/login.dto";
import useLoginMutation from "@/src/hooks/mutation/useLoginMutation.hook";
import useAuth from "@/src/hooks/useAuth.hook";
import {
  ValidationSchema,
  useFormValidator,
} from "@/src/hooks/useFormValidator.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";

const useLoginManager = () => {
  const loginMutation = useLoginMutation();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const paramsManager = useParamsManager();
  const pathname = usePathname();
  const isPending = loginMutation.isPending;
  const isError = loginMutation.isError;
  const isModalOpen = searchParams.get(SEARCH_PARAMS.login) === "true";
  const [submitCount, setSubmitCount] = useState(0);
  const [apiError, setApiError] = useState("");
  const [loginData, setLoginData] = useState<ILoginRequestBody>({
    email: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationSchema = useMemo<ValidationSchema<any>>(() => {
    return {
      emptyEmail: {
        errorMessage: "Email must be filled",
        rule: () => submitCount > 0 && !loginData.email,
      },
      emptyPassword: {
        errorMessage: "Password must be filled",
        rule: () => submitCount > 0 && !loginData.password,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);
  const formValidator = useFormValidator(validationSchema);

  const getCloseModalHandler = () => {
    paramsManager.removeParams([SEARCH_PARAMS.login]);
    setApiError("");
    setSubmitCount(0);
    setLoginData({ email: "", password: "" });
  };

  const getLoginHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setApiError("");
    setSubmitCount((prev) => (prev += 1));
    if (!loginData.email || !loginData.password) return;

    const { error } = await loginMutation.mutateAsync(loginData);
    if (!!error) setApiError("Invalid credentials.");
  };

  const getChangeEmailHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setLoginData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  const getChangePasswordHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setLoginData((prev) => ({
      ...prev,
      password: e.target.value,
    }));

  return {
    getLoginHandler,
    loginMutation,
    isPending,
    isError,
    getCloseModalHandler,
    searchParams,
    auth,
    pathname,
    isModalOpen,
    loginData,
    setLoginData,
    getChangeEmailHandler,
    getChangePasswordHandler,
    formValidator,
    apiError,
  };
};

export default useLoginManager;
