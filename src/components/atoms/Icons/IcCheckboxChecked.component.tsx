import { SVGAttributes } from "react";

const IcCheckboxChecked = (props?: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000"
      {...props}
    >
      <path
        d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM18.1641 7.8291C17.7162 7.39003 16.9899 7.39009 16.542 7.8291L10.4707 13.7842L7.45801 10.8291C7.01009 10.3901 6.28382 10.39 5.83594 10.8291C5.38798 11.2684 5.38798 11.9816 5.83594 12.4209L9.65918 16.1709C10.107 16.6101 10.8333 16.6098 11.2812 16.1709L18.1641 9.4209C18.612 8.98156 18.612 8.26844 18.1641 7.8291Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IcCheckboxChecked;
