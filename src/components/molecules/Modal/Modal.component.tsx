import clsx from "clsx";
import { DialogHTMLAttributes, HTMLAttributes, useEffect, useRef } from "react";

interface IModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen?: boolean;
}

const Modal = ({ isOpen = false, children, ...props }: IModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - body.clientWidth;
      body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      body.classList.add("modal-open");
      dialogRef.current?.showModal();
    } else {
      body.classList.remove("modal-open");
      body.style.removeProperty("--scrollbar-width");
      dialogRef.current?.close();
    }

    return () => {
      body.classList.remove("modal-open");
      body.style.removeProperty("--scrollbar-width");
    };
  }, [isOpen]);

  return (
    <dialog
      className="bg-[rgba(0,0,0,.25)] min-w-screen min-h-screen inset-0 m-0 overflow-y-auto no-scrollbar"
      ref={dialogRef}
      {...props}
    >
      {children}
    </dialog>
  );
};

Modal.Content = function ModalContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center m-4">
      <article
        className={clsx("rounded-[10px] bg-neutral-10", className)}
        {...props}
      >
        {children}
      </article>
    </div>
  );
};

export default Modal;
