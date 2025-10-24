import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import TextInput from "@/src/components/organisms/TextInput";
import { Dispatch, SetStateAction } from "react";

interface IJobFormProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const JobForm = ({ isOpen, setIsOpen }: IJobFormProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen?.(false)}
      className="items-center justify-center bg-[rgba(0,0,0,.25)] min-w-screen min-h-screen inset-0 m-0 overflow-y-scroll no-scrollbar"
    >
      <Modal.Content className="rounded-[10px] w-full max-w-[900px]">
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
          <TextInput
            label="Job Name"
            isRequired
            placeholder="Ex. Front End Engineer"
          />
          <TextInput
            label="Job Type"
            isRequired
            placeholder="Select job type"
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
              <TextInput label="Minimum Estimated Salary" placeholder="Ex. 2" />
              <TextInput label="Maximum Estimated Salary" placeholder="Ex. 2" />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6 border-t border-neutral-40">
          <Button className="self-end">Publish Job</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default JobForm;
