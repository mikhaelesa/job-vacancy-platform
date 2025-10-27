"use client";

import { PATHS } from "@/src/constants/paths.constant";
import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ConfirmEmailPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirm = async () => {
      const token_hash = params.get("token_hash");
      const type = params.get("type");

      if (token_hash && type === "email") {
        const { error } = await supabaseClient.auth.verifyOtp({
          token_hash,
          type: "email",
        });

        if (!error) router.replace(PATHS.root);
      }
    };
    confirm();
  }, [params, router]);

  return <p>Verifying your email...</p>;
};

export default ConfirmEmailPage;
