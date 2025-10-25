import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { debounce } from "@/src/helpers/debounce.helper";
import useGetRecruiterOwnJobsQuery from "@/src/hooks/queries/useGetRecruiterOwnJobsQuery.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { useSearchParams } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";

const useAdminJobsManager = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const paramsManager = useParamsManager();
  const search = searchParams.get("search");
  const recruiterOwnJobsQuery = useGetRecruiterOwnJobsQuery({
    ...(search && { search }),
  });
  const jobs = recruiterOwnJobsQuery.data?.data.data;
  const isLoading = recruiterOwnJobsQuery.isLoading;
  const isError =
    !isLoading && !search && (recruiterOwnJobsQuery.isError || !jobs?.length);
  const isNoSearchResult =
    !!search && (recruiterOwnJobsQuery.isError || !jobs?.length);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);

  const getOpenJobFormHandler = () => setIsJobFormOpen(true);
  const getSearchJobsHandler: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      const value = e.target.value;
      if (!value) return paramsManager.removeParams([SEARCH_PARAMS.search]);
      paramsManager.appendParams({ [SEARCH_PARAMS.search]: value });
    },
    300
  );
  const getResetSearch = () => {
    const input = searchInputRef.current;
    if (input) input.value = "";
    paramsManager.removeParams([SEARCH_PARAMS.search]);
  };

  return {
    getResetSearch,
    jobs,
    isLoading,
    isError,
    isJobFormOpen,
    setIsJobFormOpen,
    getOpenJobFormHandler,
    getSearchJobsHandler,
    isNoSearchResult,
    search,
    searchInputRef,
  };
};

export default useAdminJobsManager;
