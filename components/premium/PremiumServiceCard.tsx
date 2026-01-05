import React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

interface PremiumServiceCardProps {
  title: string;
  link?: string;
}

const PremiumServiceCard: React.FC<PremiumServiceCardProps> = ({ title, link }) => {
  return (
    <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-6 h-10 bg-[#D9D9D9] rounded shrink-0" />
      <span className="text-left text-[13px] max-w-[187px] font-semibold text-stark">
        {title}
      </span>
      <ChevronRightIcon width={16} height={16} />
    </button>
  );
};

export default PremiumServiceCard;
