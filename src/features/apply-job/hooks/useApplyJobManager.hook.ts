import { TPhoneCode } from "@/src/components/organisms/PhoneNumberInput/PhoneNumberInput.component";
import { ISelectOption } from "@/src/components/organisms/SelectInput/SelectInput.component";
import useGetDomicilesQuery from "@/src/hooks/queries/useGetDomicilesQuery.hook";
import useGetJobQuery from "@/src/hooks/queries/useGetJobQuery.hook";
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
  const isLoading = domicilesQuery.isLoading || jobQuery.isLoading;

  const [applyJobData, setApplyJobData] = useState({
    linkedin: "",
    fullName: "",
    gender: "",
    phoneCode: 0,
    phoneNumber: "",
    email: "",
    provinceId: 0,
  });

  const getChangeFullNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setApplyJobData((prev) => ({
      ...prev,
      fullName: e.target.value,
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

  return {
    applyJobData,
    job,
    domiciles,
    isLoading,
    getChangeGenderHandler,
    getChangePhoneCodeHandler,
    getChangePhoneNumberHandler,
    getChangeFullNameHandler,
    getChangeEmailHandler,
    getChangeLinkedinHandler,
    getChangeDomicileHandler,
  };
};

export default useApplyJobManager;
