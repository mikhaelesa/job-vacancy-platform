import { TPhoneCode } from "@/src/components/organisms/PhoneNumberInput/PhoneNumberInput.component";
import { ISelectOption } from "@/src/components/organisms/SelectInput/SelectInput.component";
import { IApplyJobRequestBody } from "@/src/dto/applyJob.dto";
import parseErrorsZod from "@/src/helpers/parseErrorsZod.helper";
import useApplyJobMutation from "@/src/hooks/mutation/useApplyJobMutation.hook";
import useGetDomicilesQuery from "@/src/hooks/queries/useGetDomicilesQuery.hook";
import useGetJobQuery from "@/src/hooks/queries/useGetJobQuery.hook";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

const useApplyJobManager = () => {
  const params = useParams<{ id: string }>();
  const domicilesQuery = useGetDomicilesQuery();
  const domiciles = domicilesQuery.data?.data.data.map((domicile) => ({
    label: domicile.name,
    value: domicile.province_id.toString(),
  }));
  const jobQuery = useGetJobQuery(params.id);
  const job = jobQuery.data?.data.data;
  const applyJobMutation = useApplyJobMutation(params.id);
  const isLoading = domicilesQuery.isLoading || jobQuery.isLoading;
  const isPending = applyJobMutation.isPending;
  const [apiError, setApiError] = useState<Record<string, string>>();

  const [applyJobData, setApplyJobData] = useState<IApplyJobRequestBody>({
    linkedin: "",
    fullName: "",
    gender: "",
    phoneCode: 1,
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    provinceId: undefined,
    photo: undefined,
  });

  const getApplyJobHandler = async () => {
    setApiError({});
    const formData = new FormData();
    for (const pair of Object.entries(applyJobData))
      formData.append(pair[0], pair[1]);
    applyJobMutation.mutate(formData, {
      onError: (err) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors = (err as AxiosError<any>).response?.data.errors;
        if (errors) {
          const mapped: Record<string, string> = parseErrorsZod(errors);
          setApiError(mapped);
        }
      },
    });
  };
  const getChangeFullNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setApplyJobData((prev) => ({
      ...prev,
      fullName: e.target.value,
    }));
  const getChangeDateOfBirthHandler = (value: string) =>
    setApplyJobData((prev) => ({
      ...prev,
      dateOfBirth: value,
    }));
  const getChangeEmailHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setApplyJobData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  const getChangeGenderHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setApplyJobData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  const getChangePhoneCodeHandler = (phoneCode: TPhoneCode) =>
    setApplyJobData((prev) => ({
      ...prev,
      phoneCode: phoneCode.id,
    }));
  const getChangePhoneNumberHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    setApplyJobData((prev) => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
  const getChangeLinkedinHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setApplyJobData((prev) => ({
      ...prev,
      linkedin: e.target.value,
    }));
  const getChangeDomicileHandler = (option: ISelectOption) =>
    setApplyJobData((prev) => ({
      ...prev,
      provinceId: parseInt(option.value),
    }));
  const getChangePhotoHandler = (photo: Blob) =>
    setApplyJobData((prev) => ({
      ...prev,
      photo,
    }));

  return {
    applyJobData,
    applyJobMutation,
    apiError,
    job,
    domiciles,
    isLoading,
    isPending,
    getChangeGenderHandler,
    getChangePhoneCodeHandler,
    getChangePhoneNumberHandler,
    getChangeFullNameHandler,
    getChangeEmailHandler,
    getChangeLinkedinHandler,
    getChangeDomicileHandler,
    getChangePhotoHandler,
    getApplyJobHandler,
    getChangeDateOfBirthHandler,
  };
};

export default useApplyJobManager;
