import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import ChevronRightIcon from "../icons/ChevronRightIcon";

interface QuoteCardProps {
  title: string;
  isTitleWrapped?: boolean;
  isBackgroundGray?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  title,
  isTitleWrapped = false,
  isBackgroundGray,
}) => {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const { QuoteData } = data;
  const quoteCardItem = (text: string) => (
    <div className="flex items-center p-5 border border-gray-300 rounded-lg gap-2.5">
      <div className="h-6 w-6 bg-[#D9D9D9] rounded-md" />
      <div className="font-semibold text-[13px] leading-5">{text}</div>
    </div>
  );
  return (
    <div
      className={`flex flex-col grow border border-gray-300 p-4 gap-1 rounded-lg ${isBackgroundGray ? "bg-[#D7D7D7]" : ""} `}
    >
      <div className="flex justify-between pb-2.5">
        <span
          className={`leading-5 text-stark font-semibold`}
        >
          {title}
        </span>
        <div>
          <ChevronRightIcon width={21} height={21} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {QuoteData.map((q) => quoteCardItem(q))}
      </div>
    </div>
  );
};

export default QuoteCard;
