"use client";

import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import EmailInput from "@/src/components/organisms/EmailInput";
import PasswordInput from "@/src/components/organisms/PasswordInput";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import Link from "next/link";
import useLoginManager from "../hooks/useLoginManager.hook";

const LoginView = () => {
  const manager = useLoginManager();

  if (manager.auth.user) return null;

  return (
    <Modal onClose={manager.getCloseModalHandler} isOpen={manager.isModalOpen}>
      <Modal.Content className="w-full max-w-[500px]">
        <div className="p-6 flex justify-between items-center border-b border-neutral-40">
          <p className="text-xl font-bold">Login</p>
          <button
            type="button"
            className="cursor-pointer "
            onClick={manager.getCloseModalHandler}
          >
            <IcClose />
          </button>
        </div>
        <form
          onSubmit={manager.getLoginHandler}
          className="px-6 py-4 flex flex-col gap-y-4"
        >
          <span className="text-m">
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary-main"
              href={`${manager.pathname}?${SEARCH_PARAMS.signUp}=true`}
            >
              Sign Up
            </Link>
          </span>
          {!!manager.apiError && (
            <div className="border border-danger-border py-0.5 rounded-sm">
              <p className="text-center text-danger-main text-s font-bold">
                {manager.apiError}
              </p>
            </div>
          )}
          <EmailInput
            isError={manager.formValidator.hasError("emptyEmail")}
            helperMessage={manager.formValidator.getError("emptyEmail")}
            onChange={manager.getChangeEmailHandler}
            value={manager.loginData.email}
            name="email"
            label="Email"
            isRequired
          />
          <PasswordInput
            isError={manager.formValidator.hasError("emptyPassword")}
            helperMessage={manager.formValidator.getError("emptyPassword")}
            onChange={manager.getChangePasswordHandler}
            value={manager.loginData.password}
            name="password"
            label="Password"
            isRequired
          />
          <Button
            disabled={manager.isPending}
            size="large"
            variant="alternative-primary"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default LoginView;
