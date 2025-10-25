import {
  createContext,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IDropdownBody,
  IDropdownContext,
  IDropdownHead,
  IDropdownItem,
} from "./Dropdown.type";

const DropdownContext = createContext<IDropdownContext | undefined>(undefined);

const Dropdown = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const setIsDropdownOpen = (isOpen: boolean) => setIsOpen(isOpen);
  const onToggleDropdown = () => setIsOpen((prev) => !prev);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Element)
    )
      setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        onToggleDropdown,
        setIsDropdownOpen,
        isOpen,
      }}
    >
      <div
        ref={dropdownRef}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Head = function DropdownHead({ children }: IDropdownHead) {
  const dropdownContext = useContext(DropdownContext);
  return (
    <>
      {typeof children === "function" && dropdownContext
        ? children(dropdownContext)
        : children}
    </>
  );
};

Dropdown.Body = function DropdownBody({ children }: IDropdownBody) {
  const dropdownContext = useContext(DropdownContext);
  return <>{dropdownContext?.isOpen && children}</>;
};

Dropdown.Item = function DropdownItem({ children }: IDropdownItem) {
  const dropdownContext = useContext(DropdownContext);
  return (
    <>
      {typeof children === "function" && dropdownContext
        ? children(dropdownContext)
        : children}
    </>
  );
};

export default Dropdown;
