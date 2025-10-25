import {
  ContentState,
  convertFromHTML,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { IRichTextInputProps } from "./RichTextInput.type";

const useRichTextInputManager = ({ value, onChange }: IRichTextInputProps) => {
  const [isActive, setIsActive] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>(null);
  const isExternalChange = useRef(true);

  const getChangeHandler: ComponentProps<typeof Editor>["onChange"] = (
    editorState
  ) => {
    setEditorState(editorState);
    isExternalChange.current = false;
    if (onChange) {
      if (!editorState.getCurrentContent().getPlainText())
        return onChange("", "");
      const htmlContent = stateToHTML(editorState.getCurrentContent());
      onChange(htmlContent, editorState.getCurrentContent().getPlainText());
    }
  };

  const getKeyCommandHandler: ComponentProps<
    typeof Editor
  >["handleKeyCommand"] = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (!editorState.getCurrentContent().getPlainText() && onChange) {
      onChange("", "");
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const getBeforeInputHandler: ComponentProps<
    typeof Editor
  >["handleBeforeInput"] = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const blockText = block.getText().trim();

    if (blockText === "-" && chars === " ") {
      const newContentState = Modifier.removeRange(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        "backward"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(
        RichUtils.toggleBlockType(newEditorState, "unordered-list-item")
      );
      return "handled";
    }
    if (blockText === "1." && chars === " ") {
      const newContentState = Modifier.removeRange(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        "backward"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(
        RichUtils.toggleBlockType(newEditorState, "ordered-list-item")
      );
      return "handled";
    }

    return "not-handled";
  };

  const getKeyBindingFn: ComponentProps<typeof Editor>["keyBindingFn"] = (
    e
  ) => {
    if (e.key === "Enter") {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const blockKey = selection.getStartKey();
      const block = contentState.getBlockForKey(blockKey);

      // Reset block type after pressing Enter if the current block is a list
      if (
        block.getType() === "unordered-list-item" ||
        block.getType() === "ordered-list-item"
      )
        setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    }

    return getDefaultKeyBinding(e);
  };

  useEffect(() => {
    if (typeof value !== "undefined" && isExternalChange.current) {
      const blocksFromHTML = convertFromHTML(value);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);

      setEditorState(newEditorState);
    } else if (!value) {
      const emptyContentState = ContentState.createFromText("");
      const emptyEditorState = EditorState.push(
        editorState,
        emptyContentState,
        "remove-range"
      );
      const resetEditorState = RichUtils.toggleBlockType(
        EditorState.moveFocusToEnd(emptyEditorState),
        "unstyled"
      );
      setEditorState(resetEditorState);
    }
    isExternalChange.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    getChangeHandler,
    getKeyCommandHandler,
    getBeforeInputHandler,
    getKeyBindingFn,
    containerRef,
    editorRef,
    isExternalChange,
    editorState,
    setEditorState,
    setIsActive,
    isActive,
  };
};

export default useRichTextInputManager;
