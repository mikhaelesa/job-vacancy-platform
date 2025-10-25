import { ISelectOption } from "@/src/components/organisms/SelectInput/SelectInput.component";
import { ICreateJobRequestBody } from "@/src/dto/createJob.dto";
import useCreateJobMutation from "@/src/hooks/mutation/useCreateJobMutation.hook";
import useGetJobTypesQuery from "@/src/hooks/queries/useGetJobTypesQuery.hook";
import { AxiosError } from "axios";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { RichTextInputChangeHandler } from "../../organisms/RichTextInput/RichTextInput.type";

const useJobFormManager = () => {
  const jobTypesQuery = useGetJobTypesQuery();
  const jobTypesData = jobTypesQuery.data?.data.data;
  const jobTypesOptions = jobTypesData?.map<ISelectOption>((jobType) => ({
    label: jobType.name,
    value: jobType.id.toString(),
  }));
  const createJobMutation = useCreateJobMutation();
  const [createJobData, setCreateJobData] = useState<
    Partial<ICreateJobRequestBody>
  >({
    description: undefined,
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
  const [apiError, setApiError] = useState<Record<string, string>>();

  const getSubmitHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setApiError({});

    await createJobMutation.mutateAsync(
      createJobData as ICreateJobRequestBody,
      {
        onError: (e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const error = e as AxiosError<any>;
          if (error.response?.data?.errors) {
            const mapped: Record<string, string> = {};
            for (const [key, messages] of Object.entries(
              error.response?.data?.errors
            )) {
              mapped[key] = (messages as string[])[0];
            }
            setApiError(mapped);
          }
        },
      }
    );
  };

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
    // @ts-expect-error TODO: Check this type issue later
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        gender: e.target.value,
      },
    }));
  const getChangeDomicileSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    // @ts-expect-error TODO: Check this type issue later
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        domicile: e.target.value,
      },
    }));
  const getChangePhoneNumberSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    // @ts-expect-error TODO: Check this type issue later
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        phoneNumber: e.target.value,
      },
    }));
  const getChangeLinkedinSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    // @ts-expect-error TODO: Check this type issue later
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        linkedin: e.target.value,
      },
    }));
  const getChangeDateOfBirthSettingHandler: ChangeEventHandler<
    HTMLInputElement
  > = (e) =>
    // @ts-expect-error TODO: Check this type issue later
    setCreateJobData((prev) => ({
      ...prev,
      minimumProfileInformation: {
        ...prev.minimumProfileInformation,
        dateOfBirth: e.target.value,
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
    getSubmitHandler,
    apiError,
  };
};

export default useJobFormManager;
