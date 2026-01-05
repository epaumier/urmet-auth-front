import React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

interface PremiumContractBannerProps {
  contractNumber: string;
  expiryDate: string;
}

const PremiumContractBanner: React.FC<PremiumContractBannerProps> = ({
  contractNumber,
  expiryDate,
}) => {
  return (
    <div className="flex items-center justify-between bg-[#FFF4E5] border border-[#FFB020] rounded-lg p-4">
      <div className="flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" fill="#FFB020" />
          <path
            d="M10 6V11M10 14H10.01"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm text-stark">
          Le contrat pré-payé n°{contractNumber} expire le {expiryDate}.
        </span>
      </div>
      <button className="flex items-center gap-1 text-[#0066CC] text-sm font-medium hover:underline">
        Renouveler
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="#0066CC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PremiumContractBanner;
