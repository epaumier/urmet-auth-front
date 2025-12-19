import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CloseIcon from "../icons/CloseIcon";

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  trigger: ReactNode;
}

export default function EditModal({
  isOpen,
  onOpenChange,
  title,
  children,
  trigger,
}: EditModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-[550px] shadow-lg">
          <Dialog.Title className="text-base font-semibold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Close className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <CloseIcon />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
