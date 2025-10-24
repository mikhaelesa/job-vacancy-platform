import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useParamsManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    ({ ...props }) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(props).forEach(([k, v]) => {
        params.set(k, v);
      });
      return params.toString();
    },
    [searchParams]
  );

  const appendParams = ({ ...params }, options = { scroll: false }) => {
    const queryString = createQueryString(params);
    router.replace(`${pathname}?${queryString}`, options);
  };

  const deleteQueryString = useCallback(
    (props: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      props.forEach((v) => {
        params.delete(v);
      });
      return params.toString();
    },
    [searchParams]
  );

  const removeParams = (params: string[], options = { scroll: false }) => {
    const queryString = deleteQueryString(params);
    router.replace(`${pathname}?${queryString}`, options);
  };

  const replaceQueryString = useCallback(({ ...props }) => {
    const params = new URLSearchParams();
    Object.entries(props).forEach(([k, v]) => {
      params.set(k, v);
    });
    return params.toString();
  }, []);

  const replaceParams = ({ ...params }, options = { scroll: false }) => {
    const queryString = replaceQueryString(params);
    router.replace(`${pathname}?${queryString}`, options);
  };

  const resetParams = (options = { scroll: false }) => {
    router.replace(`${pathname}`, options);
  };

  return {
    appendParams,
    createQueryString,
    deleteQueryString,
    removeParams,
    replaceParams,
    replaceQueryString,
    resetParams,
  };
};
