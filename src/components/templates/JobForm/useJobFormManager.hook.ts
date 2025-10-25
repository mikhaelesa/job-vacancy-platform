import {
  ICreateJobRequestBody,
  TProfileInformation,
} from "@/src/dto/createJob.dto";
import useGetJobTypesQuery from "@/src/hooks/queries/useGetJobTypesQuery.hook";
import { ChangeEventHandler, useState } from "react";
import { RichTextInputChangeHandler } from "../../organisms/RichTextInput/RichTextInput.type";
import { ISelectOption } from "../../organisms/SelectInput/SelectInput.component";

const useJobFormManager = () => {
  const jobTypesQuery = useGetJobTypesQuery();
  const jobTypesData = jobTypesQuery.data?.data.data;
  const jobTypesOptions = jobTypesData?.map<ISelectOption>((jobType) => ({
    label: jobType.name,
    value: jobType.id.toString(),
  }));
  const [createJobData, setCreateJobData] = useState<
    Partial<ICreateJobRequestBody>
  >({
    description: "",
    jobTypeId: undefined,
    maximumSalary: undefined,
    minimumSalary: undefined,
    name: "",
    candidateNeeded: undefined,
    minimumProfileInformation: {
      dateOfBirth: "mandatory",
      domicile: "mandatory",
      gender: "mandatory",
      linkedin: "mandatory",
      phoneNumber: "mandatory",
      fullName: "mandatory",
      photoProfile: "mandatory",
      email: "mandatory",
    },
  });

  const getChangeJobNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setCreateJobData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  const getChangeJobTypeHandler = (option: ISelectOption) =>
    setCreateJobData((prev) => ({
      ...prev,
      jobTypeId: parseInt(option.value),
    }));
  const getChangeDescriptionHandler: RichTextInputChangeHandler = (html) =>
    setCreateJobData((prev) => ({
      ...prev,
      description: html,
    }));
  const getChangeMinimumSalaryHandler = (value: number) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumSalary: value,
    }));
  const getChangeMaximumSalaryHandler = (value: number) =>
    setCreateJobData((prev) => ({
      ...prev,
      maximumSalary: value,
    }));
  const getChangeCandidateNeededHandler = (value: number) =>
    setCreateJobData((prev) => ({
      ...prev,
      candidateNeeded: value,
    }));
  const getChangeGenderSettingHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        gender: e.target.value as TProfileInformation,
      },
    }));
  const getChangeDomicileSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        domicile: e.target.value as TProfileInformation,
      },
    }));
  const getChangePhoneNumberSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        phoneNumber: e.target.value as TProfileInformation,
      },
    }));
  const getChangeLinkedinSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        linkedin: e.target.value as TProfileInformation,
      },
    }));
  const getChangeDateOfBirthSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        dateOfBirth: e.target.value as TProfileInformation,
      },
    }));

  return {
    jobTypesOptions,
    getChangeMaximumSalaryHandler,
    jobTypesQuery,
    getChangeJobNameHandler,
    createJobData,
    getChangeMinimumSalaryHandler,
    getChangeCandidateNeededHandler,
    getChangeJobTypeHandler,
    getChangeGenderSettingHandler,
    getChangeDomicileSettingHandler,
    getChangePhoneNumberSettingHandler,
    getChangeLinkedinSettingHandler,
    getChangeDateOfBirthSettingHandler,
    getChangeDescriptionHandler,
  };
};

export default useJobFormManager;
