import { ClipboardEvent, KeyboardEvent } from "react";

export class InputController {
  public static onlyNumber<T extends HTMLElement>(e: KeyboardEvent<T>) {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
      "End",
      "Home",
    ];

    // Allow Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x")
    ) {
      return;
    }

    // Allow numbers from 0-9
    if ((e.key >= "0" && e.key <= "9") || allowedKeys.includes(e.key)) {
      return;
    }

    // Prevent the default action for other keys
    e.preventDefault();
  }
  public static pasteOnlyNumber<T extends HTMLElement>(e: ClipboardEvent<T>) {
    const pasteData = e.clipboardData.getData("text");

    // Prevent pasting if the data contains anything other than numbers
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  }
}
