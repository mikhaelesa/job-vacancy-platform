import Spinner from "@/src/components/atoms/Spinner";
import { ReactNode } from "react";

interface ILoadingBoundaryProps {
  isLoading?: boolean;
  children?: ReactNode;
}

const LoadingBoundary = ({ isLoading, children }: ILoadingBoundaryProps) => {
  if (isLoading) return <Spinner />;
  return children;
};

export default LoadingBoundary;
