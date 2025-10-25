import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import { ISignUpErrorResponse, ISignUpRequestBody } from "@/src/dto/signUp.dto";
import useCheckEmailMutation from "@/src/hooks/mutation/useCheckEmailMutation.hook";
import useSignUpMutation from "@/src/hooks/mutation/useSignUpMutation.hook";
import useAuth from "@/src/hooks/useAuth.hook";
import {
  useFormValidator,
  ValidationSchema,
} from "@/src/hooks/useFormValidator.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { AxiosError } from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";
import { toast } from "react-toastify";

const useSignUpManager = () => {
  const signUpMutation = useSignUpMutation();
  const checkEmailMutation = useCheckEmailMutation();
  const auth = useAuth();
  const isPending = signUpMutation.isPending || checkEmailMutation.isPending;
  const isError = signUpMutation.isError;
  const searchParams = useSearchParams();
  const paramsManager = useParamsManager();
  const pathname = usePathname();
  const isModalOpen = searchParams.get(SEARCH_PARAMS.signUp) === "true";
  const [signUpData, setSignUpData] = useState<ISignUpRequestBody>({
    email: "",
    password: "",
    role: USER_ROLE.applicant,
    fullName: "",
    companyName: null,
  });
  const [submitCount, setSubmitCount] = useState(0);
  const [apiError, setApiError] = useState({ email: "", password: "" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationSchema = useMemo<ValidationSchema<any>>(() => {
    return {
      emptyEmail: {
        errorMessage: "Email must be filled",
        rule: () => submitCount > 0 && !signUpData.email,
      },
      emptyPassword: {
        errorMessage: "Password must be filled",
        rule: () => submitCount > 0 && !signUpData.password,
      },
      emptyFullName: {
        errorMessage: "Full name must be filled",
        rule: () => submitCount > 0 && !signUpData.fullName,
      },
      emptyCompanyName: {
        errorMessage: "Company name must be filled",
        rule: () =>
          submitCount > 0 &&
          signUpData.role === USER_ROLE.recruiter &&
          !signUpData.companyName,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);
  const formValidator = useFormValidator(validationSchema);

  const getSignUpHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setSubmitCount((prev) => (prev += 1));
      setApiError({ email: "", password: "" });
      if (!signUpData.email || !signUpData.password) return;

      const checkEmailResponse = await checkEmailMutation.mutateAsync({
        email: signUpData.email,
      });

      if (checkEmailResponse.data.confirmed && checkEmailResponse.data.exists) {
        setApiError((prev) => ({
          ...prev,
          email: "User already exist",
        }));
        throw new Error("User already exist");
      }

      await signUpMutation.mutateAsync(signUpData, {
        onError: (error) => {
          const axiosError = error as AxiosError<ISignUpErrorResponse>;
          const data = axiosError.response?.data;
          if (data?.code === "weak_password")
            setApiError((prev) => ({
              ...prev,
              password: data?.message || "Invalid password",
            }));
        },
        onSuccess: () => {
          paramsManager.removeParams([SEARCH_PARAMS.signUp]);
          toast.success(
            "You have successfully registered. Please check your email for confirmation"
          );
        },
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getChangeEmailHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSignUpData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  const getChangeFullNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSignUpData((prev) => ({
      ...prev,
      fullName: e.target.value,
    }));
  const getChangeCompanyNameHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    setSignUpData((prev) => ({
      ...prev,
      companyName: e.target.value,
    }));
  const getChangePasswordHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSignUpData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  const getChangeRoleHandler = (value: boolean) =>
    setSignUpData((prev) => ({
      ...prev,
      role: value ? USER_ROLE.recruiter : USER_ROLE.applicant,
    }));

  const getCloseModalHandler = () => {
    paramsManager.removeParams([SEARCH_PARAMS.signUp]);
    setSubmitCount(0);
    setApiError({ email: "", password: "" });
    setSignUpData((prev) => ({
      ...prev,
      email: "",
      password: "",
    }));
  };

  return {
    getSignUpHandler,
    isPending,
    isError,
    searchParams,
    paramsManager,
    pathname,
    getCloseModalHandler,
    auth,
    isModalOpen,
    inputError: apiError,
    setSignUpData,
    signUpData,
    formValidator,
    getChangeEmailHandler,
    getChangePasswordHandler,
    apiError,
    getChangeRoleHandler,
    getChangeFullNameHandler,
    getChangeCompanyNameHandler,
  };
};

export default useSignUpManager;
