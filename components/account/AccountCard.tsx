import { ReactNode } from "react";

interface AccountCardProps {
  title: string;
  modifierButton: ReactNode;
  children: ReactNode;
}

export default function AccountCard({
  title,
  modifierButton,
  children,
}: AccountCardProps) {
  return (
    <div className="p-5 border border-gray-300 rounded-lg">
      <div className="relative space-y-4">
        <div className="flex gap-2 items-center">
          <div className="h-6 w-6 bg-[#D9D9D9] rounded-md" />
          <h2 className="font-semibold text-[13px]">{title}</h2>
        </div>
        {modifierButton}
        <div className="flex flex-col gap-2.5">{children}</div>
      </div>
    </div>
  );
}
