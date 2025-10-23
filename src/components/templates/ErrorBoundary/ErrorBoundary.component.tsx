import { PropsWithChildren, ReactNode } from "react";

interface IErrorBoundaryProps {
  isError?: boolean;
  errorComponent?: ReactNode;
}

const ErrorBoundary = ({
  isError,
  children,
  errorComponent,
}: PropsWithChildren<IErrorBoundaryProps>) => {
  if (isError) return errorComponent || null;
  return children;
};

export default ErrorBoundary;
