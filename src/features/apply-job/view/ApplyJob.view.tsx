import Button from "@/src/components/atoms/Button";
import IcArrowLeft from "@/src/components/atoms/Icons/IcArrowLeft.component";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import { PATHS } from "@/src/constants/paths.constant";
import Link from "next/link";
import ProtectedDatepickerInput from "../components/ProtectedDatepickerInput";
import ProtectedDomicileInput from "../components/ProtectedDomicileInput";
import ProtectedEmailInput from "../components/ProtectedEmailInput";
import ProtectedFullNameInput from "../components/ProtectedFullNameInput";
import ProtectedGenderInput from "../components/ProtectedGenderInput";
import ProtectedLinkedinInput from "../components/ProtectedLinkedinInput";
import ProtectedPhoneNumberInput from "../components/ProtectedPhoneNumberInput";
import useApplyJobManager from "../hooks/useApplyJobManager.hook";

const ApplyJobView = () => {
  const manager = useApplyJobManager();

  return (
    <main className="bg-neutral-20 min-h-dvh w-full flex items-center justify-center">
      <div className="max-w-[700px] bg-neutral-10 my-[50px] w-full">
        <LoadingBoundary isLoading={manager.isLoading}>
          <div className="flex flex-col gap-y-6 border border-neutral-40 px-10 pt-10 pb-3">
            <div className="flex items-center gap-x-4">
              <Link href={PATHS.root} className="shadow-button p-1 rounded-lg">
                <IcArrowLeft />
              </Link>
              <p className="text-xl font-bold">
                Apply {manager.job?.name} at{" "}
                {manager.job?.recruiter.company_name}
              </p>
            </div>
            <div className="px-6 pb-6 flex flex-col gap-y-4">
              <ProtectedFullNameInput
                fullNameSetting={manager.job?.full_name_setting}
                onChange={manager.getChangeFullNameHandler}
                value={manager.applyJobData.fullName}
              />
              <ProtectedDatepickerInput
                dateOfBirthSetting={manager.job?.date_of_birth_setting}
              />
              <ProtectedGenderInput
                genderSetting={manager.job?.gender_setting}
                onChange={manager.getChangeGenderHandler}
                value={manager.applyJobData.gender}
              />
              <ProtectedDomicileInput
                domicileSetting={manager.job?.domicile_setting}
                options={manager.domiciles}
                onChange={manager.getChangeDomicileHandler}
              />
              <ProtectedPhoneNumberInput
                phoneNumberSetting={manager.job?.phone_number_setting}
                onChangePhoneCode={manager.getChangePhoneCodeHandler}
                onChangePhoneNumber={manager.getChangePhoneNumberHandler}
              />
              <ProtectedEmailInput
                emailSetting={manager.job?.email_setting}
                onChange={manager.getChangeEmailHandler}
                value={manager.applyJobData.email}
              />
              <ProtectedLinkedinInput
                linkedinSetting={manager.job?.linkedin_setting}
                onChange={manager.getChangeLinkedinHandler}
                value={manager.applyJobData.linkedin}
              />
            </div>
          </div>
          <div className="px-10 py-6">
            <Button size="large" className="w-full">
              Submit
            </Button>
          </div>
        </LoadingBoundary>
      </div>
    </main>
  );
};

export default ApplyJobView;
