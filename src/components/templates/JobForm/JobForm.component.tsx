import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import SelectInput from "@/src/components/organisms/SelectInput";
import TextInput from "@/src/components/organisms/TextInput";
import { Dispatch, SetStateAction } from "react";
import Chip from "../../molecules/Chip";
import CurrencyInput from "../../organisms/CurrencyInput";
import LoadingBoundary from "../LoadingBoundary";
import useJobFormManager from "./useJobFormManager.hook";

interface IJobFormProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const JobForm = ({ isOpen, setIsOpen }: IJobFormProps) => {
  const manager = useJobFormManager();

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
        <div className="px-6 py-4 flex flex-col gap-y-4">
          <LoadingBoundary isLoading={manager.jobTypesQuery.isLoading}>
            <TextInput
              label="Job Name"
              isRequired
              name="jobName"
              placeholder="Ex. Front End Engineer"
            />
            <SelectInput
              label="Job Type"
              placeholder="Select job type"
              isRequired
              name="jobType"
              options={manager.jobTypesOptions}
            />
            <TextInput label="Job Description" isRequired placeholder="Ex." />
            <TextInput
              label="Number of Candidate Needed"
              isRequired
              placeholder="Ex. 2"
            />
            <div
              className="flex flex-col gap-y-4 border-t border-transparent
         [border-image:repeating-linear-gradient(to_right,#e0e0e0_0,#e0e0e0_10px,transparent_10px,transparent_15px)_1] pt-6"
            >
              <p className="text-s">Job Salary</p>
              <div className="grid grid-cols-2 gap-x-12 w-full">
                <CurrencyInput
                  label="Minimum Estimated Salary"
                  placeholder="7.000.000"
                />
                <CurrencyInput
                  label="Maximum Estimated Salary"
                  placeholder="8.000.000"
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
                  <Chip isActive label="Mandatory" />
                  <Chip label="Optional" />
                  <Chip label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Domicile</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip label="Optional" />
                  <Chip label="Off" />
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
                  <Chip isActive label="Mandatory" />
                  <Chip label="Optional" />
                  <Chip label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Linkedin link</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip label="Optional" />
                  <Chip label="Off" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-neutral-40">
                <p className="text-m text-neutral-90">Date of birth</p>
                <div className="flex items-center gap-x-2">
                  <Chip isActive label="Mandatory" />
                  <Chip label="Optional" />
                  <Chip label="Off" />
                </div>
              </div>
            </div>
          </LoadingBoundary>
        </div>
        <div className="flex flex-col p-6 border-t border-neutral-40">
          <Button className="self-end">Publish Job</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default JobForm;
