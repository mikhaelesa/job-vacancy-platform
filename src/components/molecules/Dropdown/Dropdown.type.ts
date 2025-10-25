import { ReactNode } from "react";

export interface IDropdownContext {
  isOpen: boolean;
  setIsDropdownOpen(isOpen: boolean): void;
  onToggleDropdown(): void;
}

export interface IDropdownHead {
  children: ReactNode | ((props: IDropdownContext) => ReactNode);
}

export interface IDropdownBody {
  children: ReactNode;
}

export interface IDropdownItem {
  children: ReactNode | ((props: IDropdownContext) => ReactNode);
}

export interface IDropdownSubComponents {
  Head: React.FC<IDropdownHead>;
  Body: React.FC<IDropdownBody>;
  Item: React.FC<IDropdownItem>;
}
