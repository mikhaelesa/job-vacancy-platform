"use client";

import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Checkbox from "@/src/components/molecules/Checkbox";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import EmailInput from "@/src/components/organisms/EmailInput";
import PasswordInput from "@/src/components/organisms/PasswordInput";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import Link from "next/link";
import useSignUpManager from "../hooks/useSignUpManager.hook";

const SignUpView = () => {
  const manager = useSignUpManager();

  if (manager.auth.user) return null;

  return (
    <Modal onClose={manager.getCloseModalHandler} isOpen={manager.isModalOpen}>
      <Modal.Content className="w-full max-w-[500px]">
        <div className="p-6 flex justify-between items-center border-b border-neutral-40">
          <p className="text-xl font-bold">Sign Up</p>
          <button
            className="cursor-pointer"
            type="button"
            onClick={manager.getCloseModalHandler}
          >
            <IcClose />
          </button>
        </div>
        <form
          onSubmit={manager.getSignUpHandler}
          className="px-6 py-4 flex flex-col gap-y-4"
        >
          <span className="text-m">
            Already have an account?{" "}
            <Link
              className="text-primary-main"
              href={`${manager.pathname}?${SEARCH_PARAMS.login}=true`}
            >
              Login
            </Link>
          </span>
          <EmailInput
            isError={
              !!manager.apiError.email ||
              manager.formValidator.hasError("emptyEmail")
            }
            helperMessage={
              manager.apiError.email ||
              manager.formValidator.getError("emptyEmail")
            }
            name="email"
            label="Email"
            onChange={manager.getChangeEmailHandler}
            value={manager.signUpData.email}
            isRequired
          />
          <PasswordInput
            isError={
              !!manager.apiError.password ||
              manager.formValidator.hasError("emptyPassword")
            }
            helperMessage={
              manager.apiError.password ||
              manager.formValidator.getError("emptyPassword")
            }
            name="password"
            label="Password"
            onChange={manager.getChangePasswordHandler}
            value={manager.signUpData.password}
            isRequired
          />
          <div className="flex items-center gap-x-2">
            <Checkbox
              onChange={manager.getChangeRoleHandler}
              name="isRecruiter"
            />
            <p>Register as Recruiter</p>
          </div>
          <Button
            disabled={manager.isPending}
            size="large"
            variant="alternative-primary"
            className="w-full"
          >
            Sign Up
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default SignUpView;
