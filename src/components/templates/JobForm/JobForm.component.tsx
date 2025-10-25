import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import SelectInput from "@/src/components/organisms/SelectInput";
import TextInput from "@/src/components/organisms/TextInput";
import { Dispatch, SetStateAction } from "react";
import Chip from "../../molecules/Chip";
import CurrencyInput from "../../organisms/CurrencyInput";
import NumberInput from "../../organisms/NumberInput";
import RadioChip from "../../organisms/RadioChip/RadioChip.component";
import RichTextInput from "../../organisms/RichTextInput";
import LoadingBoundary from "../LoadingBoundary";
import useJobFormManager from "./useJobFormManager.hook";

interface IJobFormProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const JobForm = ({ isOpen, setIsOpen }: IJobFormProps) => {
  const manager = useJobFormManager({
    setIsOpen,
  });

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen?.(false)}>
      <Modal.Content className="w-full max-w-[900px]">
        <div className="p-6 flex justify-between items-center border-b border-neutral-40">
          <p className="text-xl font-bold">Job Opening</p>
          <button
            className="cursor-pointer "
            onClick={() => setIsOpen?.(false)}
          >
            <IcClose />
          </button>
        </div>
        <form className="px-6 py-4 flex flex-col gap-y-4">
          <LoadingBoundary isLoading={manager.jobTypesQuery.isLoading}>
            <TextInput
              isError={!!manager.apiError?.name}
              helperMessage={manager.apiError?.name}
              label="Job Name"
              isRequired
              name="jobName"
              placeholder="Ex. Front End Engineer"
              value={manager.createJobData.name}
              onChange={manager.getChangeJobNameHandler}
            />
            <SelectInput
              isError={!!manager.apiError?.jobTypeId}
              helperMessage={manager.apiError?.jobTypeId}
              label="Job Type"
              placeholder="Select job type"
              isRequired
              name="jobType"
              options={manager.jobTypesOptions}
              onChange={manager.getChangeJobTypeHandler}
            />
            <RichTextInput
              isError={!!manager.apiError?.description}
              helperMessage={manager.apiError?.description}
              label="Job Description"
              isRequired
              value={manager.createJobData.description}
              onChange={manager.getChangeDescriptionHandler}
            />
            <NumberInput
              isError={!!manager.apiError?.candidateNeeded}
              helperMessage={manager.apiError?.candidateNeeded}
              label="Number of Candidate Needed"
              isRequired
              placeholder="Ex. 2"
              value={manager.createJobData.candidateNeeded}
              onChange={manager.getChangeCandidateNeededHandler}
            />
            <div
              className="flex flex-col gap-y-4 border-t border-transparent
         [border-image:repeating-linear-gradient(to_right,#e0e0e0_0,#e0e0e0_10px,transparent_10px,transparent_15px)_1] pt-6"
            >
              <p className="text-s">Job Salary</p>
              <div className="grid grid-cols-2 gap-x-12 w-full">
                <CurrencyInput
                  isError={!!manager.apiError?.minimumSalary}
                  helperMessage={manager.apiError?.minimumSalary}
                  label="Minimum Estimated Salary"
                  placeholder="7.000.000"
                  value={manager.createJobData.minimumSalary}
                  onChange={manager.getChangeMinimumSalaryHandler}
                />
                <CurrencyInput
                  isError={!!manager.apiError?.maximumSalary}
                  helperMessage={manager.apiError?.maximumSalary}
                  label="Maximum Estimated Salary"
                  placeholder="8.000.000"
                  value={manager.createJobData.maximumSalary}
                  onChange={manager.getChangeMaximumSalaryHandler}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 p-4 border border-neutral-30 rounded-lg">
              <p className="font-bold text-m text-neutral-90">
                Minimum Profile Information Required
              </p>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Full Name</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip isDisabled label="Optional" />
                  <Chip isDisabled label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Photo profile</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip isDisabled label="Optional" />
                  <Chip isDisabled label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Gender</p>
                <div className="flex items-center gap-x-2">
                  <RadioChip
                    name="gender"
                    value="mandatory"
                    label="Mandatory"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.gender === "mandatory"
                    }
                    onChange={manager.getChangeGenderSettingHandler}
                  />
                  <RadioChip
                    name="gender"
                    value="optional"
                    label="Optional"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.gender === "optional"
                    }
                    onChange={manager.getChangeGenderSettingHandler}
                  />
                  <RadioChip
                    name="gender"
                    value="off"
                    label="Off"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.gender === "off"
                    }
                    onChange={manager.getChangeGenderSettingHandler}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Domicile</p>
                <div className="flex items-center gap-x-2">
                  <RadioChip
                    name="domicile"
                    value="mandatory"
                    label="Mandatory"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.domicile === "mandatory"
                    }
                    onChange={manager.getChangeDomicileSettingHandler}
                  />
                  <RadioChip
                    name="domicile"
                    value="optional"
                    label="Optional"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.domicile === "optional"
                    }
                    onChange={manager.getChangeDomicileSettingHandler}
                  />
                  <RadioChip
                    name="domicile"
                    value="off"
                    label="Off"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.domicile === "off"
                    }
                    onChange={manager.getChangeDomicileSettingHandler}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Email</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip isDisabled label="Optional" />
                  <Chip isDisabled label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Phone number</p>
                <div className="flex items-center gap-x-2">
                  <RadioChip
                    name="phoneNumber"
                    value="mandatory"
                    label="Mandatory"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.phoneNumber === "mandatory"
                    }
                    onChange={manager.getChangePhoneNumberSettingHandler}
                  />
                  <RadioChip
                    name="phoneNumber"
                    value="optional"
                    label="Optional"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.phoneNumber === "optional"
                    }
                    onChange={manager.getChangePhoneNumberSettingHandler}
                  />
                  <RadioChip
                    name="phoneNumber"
                    value="off"
                    label="Off"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.phoneNumber === "off"
                    }
                    onChange={manager.getChangePhoneNumberSettingHandler}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Linkedin link</p>
                <div className="flex items-center gap-x-2">
                  <RadioChip
                    name="linkedin"
                    value="mandatory"
                    label="Mandatory"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.linkedin === "mandatory"
                    }
                    onChange={manager.getChangeLinkedinSettingHandler}
                  />
                  <RadioChip
                    name="linkedin"
                    value="optional"
                    label="Optional"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.linkedin === "optional"
                    }
                    onChange={manager.getChangeLinkedinSettingHandler}
                  />
                  <RadioChip
                    name="linkedin"
                    value="off"
                    label="Off"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.linkedin === "off"
                    }
                    onChange={manager.getChangeLinkedinSettingHandler}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Date of birth</p>
                <div className="flex items-center gap-x-2">
                  <RadioChip
                    name="dateOfBirth"
                    value="mandatory"
                    label="Mandatory"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.dateOfBirth === "mandatory"
                    }
                    onChange={manager.getChangeDateOfBirthSettingHandler}
                  />
                  <RadioChip
                    name="dateOfBirth"
                    value="optional"
                    label="Optional"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.dateOfBirth === "optional"
                    }
                    onChange={manager.getChangeDateOfBirthSettingHandler}
                  />
                  <RadioChip
                    name="dateOfBirth"
                    value="off"
                    label="Off"
                    isActive={
                      manager.createJobData.minimumProfileInformation
                        ?.dateOfBirth === "off"
                    }
                    onChange={manager.getChangeDateOfBirthSettingHandler}
                  />
                </div>
              </div>
            </div>
          </LoadingBoundary>
        </form>
        <div className="flex flex-col p-6 border-t border-neutral-40">
          <Button onClick={manager.getSubmitHandler} className="self-end">
            Publish Job
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default JobForm;
