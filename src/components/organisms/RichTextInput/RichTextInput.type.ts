import { ComponentProps } from "react";
import InputBase from "../../molecules/InputBase";

export type RichTextInputChangeHandler = (html: string, text: string) => void;

export interface IRichTextInputProps extends ComponentProps<typeof InputBase> {
  onChange?: RichTextInputChangeHandler;
  value?: string;
}
