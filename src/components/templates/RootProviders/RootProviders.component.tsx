"use client";

import AuthProvider from "@/src/components/contexts/AuthProvider";
import { queryClient } from "@/src/constants/queryClient.constant";
import LoginView from "@/src/features/login/view";
import SignUpView from "@/src/features/sign-up/view";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";

const RootProviders = ({ children }: PropsWithChildren) => {
  const [qc] = useState(() => queryClient);
  return (
    <>
      <ToastContainer
        position="bottom-left"
        draggable={false}
        hideProgressBar={false}
        stacked={false}
        pauseOnFocusLoss
        closeOnClick
        autoClose={3000}
        pauseOnHover
        newestOnTop
        limit={3}
      />
      <QueryClientProvider client={qc}>
        <AuthProvider>
          <Suspense>
            <SignUpView />
            <LoginView />
            {children}
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootProviders;
