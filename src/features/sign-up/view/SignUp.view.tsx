"use client";

import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import EmailInput from "@/src/components/organisms/EmailInput";
import PasswordInput from "@/src/components/organisms/PasswordInput";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SignUpView = () => {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const paramsManager = useParamsManager();
  const pathname = usePathname();

  if (auth.user) return null;

  const handleCloseModal = () =>
    paramsManager.removeParams([SEARCH_PARAMS.signUp]);

  return (
    <Modal
      onClose={handleCloseModal}
      isOpen={searchParams.get(SEARCH_PARAMS.signUp) === "true"}
    >
      <Modal.Content className="w-full max-w-[500px]">
        <div className="p-6 flex justify-between items-center border-b border-neutral-40">
          <p className="text-xl font-bold">Sign Up</p>
          <button className="cursor-pointer " onClick={handleCloseModal}>
            <IcClose />
          </button>
        </div>
        <div className="px-6 py-4 flex flex-col gap-y-4">
          <span className="text-m">
            Already have an account?{" "}
            <Link
              className="text-primary-main"
              href={`${pathname}?${SEARCH_PARAMS.login}=true`}
            >
              Login
            </Link>
          </span>
          <EmailInput label="Email" isRequired />
          <PasswordInput label="Password" isRequired />
          <Button size="large" variant="alternative-primary" className="w-full">
            Sign Up
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SignUpView;
