/* eslint-disable react-hooks/refs */
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import InputBase from "../../molecules/InputBase";
import "./RichTextInput.css";
import { IRichTextInputProps } from "./RichTextInput.type";
import useRichTextInputManager from "./useRichTextInputManager.hook";

const RichTextInput = ({ onChange, value, ...props }: IRichTextInputProps) => {
  const manager = useRichTextInputManager({
    value,
    onChange,
  });

  return (
    <button
      onClick={() => manager.editorRef.current?.focus()}
      className="text-left"
      type="button"
    >
      <InputBase {...props} isActive={manager.isActive}>
        <Editor
          onFocus={() => manager.setIsActive(true)}
          onBlur={() => manager.setIsActive(false)}
          handleKeyCommand={manager.getKeyCommandHandler}
          editorState={manager.editorState}
          onChange={manager.getChangeHandler}
          handleBeforeInput={manager.getBeforeInputHandler}
          keyBindingFn={manager.getKeyBindingFn}
          ref={manager.editorRef}
        />
      </InputBase>
    </button>
  );
};

export default RichTextInput;
