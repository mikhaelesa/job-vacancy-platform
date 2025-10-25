import { USER_ROLE } from "@/src/constants/userRole.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode } from "react";
import Spinner from "../../atoms/Spinner";

export interface IWithRecruiterOptions {
  onUnauthorized?(router: AppRouterInstance): void;
  renderUnauthorizedComponent?(): ReactNode;
}

function withRecruiterRole<P>(
  WrappedComponent: ComponentType<P>,
  options?: IWithRecruiterOptions
) {
  const ComponentWithRecruiterRole = (props: P) => {
    const auth = useAuth();
    const router = useRouter();

    if (auth.isLoading) return <Spinner />;

    if (auth.role !== USER_ROLE.recruiter) {
      options?.onUnauthorized?.(router);
      if (options?.renderUnauthorizedComponent)
        return options.renderUnauthorizedComponent();

      return null;
    }

    // @ts-expect-error Extending P with JSX.IntrinsicAttributes introduces unnecessary complexity.
    return <WrappedComponent {...props} />;
  };

  return ComponentWithRecruiterRole;
}

export default withRecruiterRole;
