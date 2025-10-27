import Button from "@/src/components/atoms/Button";
import IcArrowLeft from "@/src/components/atoms/Icons/IcArrowLeft.component";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import { PATHS } from "@/src/constants/paths.constant";
import Link from "next/link";
import JobSent from "../components/JobSent/JobSent.component";
import ProtectedDatepickerInput from "../components/ProtectedDatepickerInput";
import ProtectedDomicileInput from "../components/ProtectedDomicileInput";
import ProtectedEmailInput from "../components/ProtectedEmailInput";
import ProtectedFullNameInput from "../components/ProtectedFullNameInput";
import ProtectedGenderInput from "../components/ProtectedGenderInput";
import ProtectedLinkedinInput from "../components/ProtectedLinkedinInput";
import ProtectedPhoneNumberInput from "../components/ProtectedPhoneNumberInput";
import ProtectedPhotoProfileInput from "../components/ProtectedPhotoProfileInput";
import useApplyJobManager from "../hooks/useApplyJobManager.hook";

const ApplyJobView = () => {
  const manager = useApplyJobManager();

  if (manager.job?.is_applied || manager.applyJobMutation.isSuccess)
    return (
      <JobSent
        companyName={manager.job?.recruiter.company_name || "company_name"}
      />
    );

  return (
    <main className="bg-neutral-20 min-h-dvh w-full flex items-center justify-center">
      <div className="max-w-[700px] bg-neutral-10 my-[50px] w-full">
        <LoadingBoundary isLoading={manager.isLoading}>
          <div className="flex flex-col gap-y-6 border border-neutral-40 px-5 md:px-10 pt-5 md:pt-10 pb-3">
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <Link href={PATHS.root} className="shadow-button p-1 rounded-lg">
                <IcArrowLeft className="max-md:w-4 max-md:h-4" />
              </Link>
              <p className="text-m md:text-xl font-bold">
                Apply {manager.job?.name} at{" "}
                {manager.job?.recruiter.company_name}
              </p>
            </div>
            <div className="px-3 md:px-6 pb-3 md:pb-6 flex flex-col gap-y-4">
              <span className="text-s font-bold text-danger-main">
                * Required
              </span>
              <ProtectedPhotoProfileInput
                isError={!!manager.apiError?.photo_profile}
                helperMessage={manager.apiError?.photo_profile}
                photoProfileSetting={manager.job?.photo_profile_setting}
                onChange={manager.getChangePhotoHandler}
              />
              <ProtectedFullNameInput
                isError={!!manager.apiError?.full_name}
                helperMessage={manager.apiError?.full_name}
                fullNameSetting={manager.job?.full_name_setting}
                onChange={manager.getChangeFullNameHandler}
                value={manager.applyJobData.fullName}
              />
              <ProtectedDatepickerInput
                isError={!!manager.apiError?.date_of_birth}
                helperMessage={manager.apiError?.date_of_birth}
                dateOfBirthSetting={manager.job?.date_of_birth_setting}
                onChange={manager.getChangeDateOfBirthHandler}
              />
              <ProtectedGenderInput
                isError={!!manager.apiError?.gender}
                helperMessage={manager.apiError?.gender}
                genderSetting={manager.job?.gender_setting}
                onChange={manager.getChangeGenderHandler}
                value={manager.applyJobData.gender || ""}
              />
              <ProtectedDomicileInput
                isError={!!manager.apiError?.domicile}
                helperMessage={manager.apiError?.domicile}
                domicileSetting={manager.job?.domicile_setting}
                options={manager.domiciles}
                onChange={manager.getChangeDomicileHandler}
              />
              <ProtectedPhoneNumberInput
                isError={!!manager.apiError?.phone_number}
                helperMessage={manager.apiError?.phone_number}
                phoneNumberSetting={manager.job?.phone_number_setting}
                onChangePhoneCode={manager.getChangePhoneCodeHandler}
                onChangePhoneNumber={manager.getChangePhoneNumberHandler}
              />
              <ProtectedEmailInput
                isError={!!manager.apiError?.email}
                helperMessage={manager.apiError?.email}
                emailSetting={manager.job?.email_setting}
                onChange={manager.getChangeEmailHandler}
                value={manager.applyJobData.email}
              />
              <ProtectedLinkedinInput
                isError={!!manager.apiError?.linkedin}
                helperMessage={manager.apiError?.linkedin}
                linkedinSetting={manager.job?.linkedin_setting}
                onChange={manager.getChangeLinkedinHandler}
                value={manager.applyJobData.linkedin}
              />
            </div>
          </div>
          <div className="px-5 md:px-10 py-3 md:py-6 bg-neutral-10">
            <Button
              onClick={manager.getApplyJobHandler}
              size="large"
              className="w-full"
              disabled={manager.isPending}
            >
              Submit
            </Button>
          </div>
        </LoadingBoundary>
      </div>
    </main>
  );
};

export default ApplyJobView;
