import * as Dialog from "@radix-ui/react-dialog";

interface ModalActionsProps {
  onCancel?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function ModalActions({
  onCancel,
  onSubmit,
}: ModalActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <Dialog.Close asChild>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-[13px] text-gray-600 hover:text-gray-800"
        >
          Annuler
        </button>
      </Dialog.Close>
      <button
        type="submit"
        onClick={onSubmit}
        className="px-4 py-2 bg-[#1100FF] text-white text-[13px] font-semibold rounded hover:bg-[#0d00cc]"
      >
        Enregistrer
      </button>
    </div>
  );
}
