import { useState } from "react";
import { Dialog } from "@headlessui/react";

export function Modal({ title, children }) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"relative z-50"}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel>
          <Dialog.Title>{title}</Dialog.Title>
          {children}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
