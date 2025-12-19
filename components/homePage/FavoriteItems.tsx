import React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

interface FavoriteItemsProps {
  title: string;
  isTitleWrapped?: boolean;
  isBackgroundGray?: boolean;
}

const FavoriteItems: React.FC<FavoriteItemsProps> = ({
  title,
  isTitleWrapped = false,
  isBackgroundGray,
}) => {
  return (
    <div
      className={`flex flex-col border border-gray-300 p-4 rounded-lg ${isBackgroundGray ? "bg-[#D7D7D7]" : ""} `}
    >
      <div className="flex justify-between pb-4">
        <span
          className={`font-semibold leading-5 text-stark ${isTitleWrapped ? "text-wrap" : "text-nowrap"} `}
        >
          {title}
        </span>
        <div>
          <ChevronRightIcon width={21} height={21} />
        </div>
      </div>
      <div className="flex">
        <div className="flex h-full gap-3">
          <div className="h-[142px] w-[92px] bg-[#D9D9D9] rounded-md" />
          <div className="flex flex-col gap-1 font-normal text-[13px] leading-5 text-stark w-[93px]">
            <span>D83/PHILPP</span>
            <span>Plaque à défilement vidéo caméra discrète</span>
          </div>
        </div>
        <div className="flex h-full pl-3 gap-3 border-l border-[#DFE6F2]">
          <div className="h-[142px] w-[92px] bg-[#D9D9D9] rounded-md" />
          <div className="flex flex-col gap-1 font-normal text-[13px] leading-5 text-stark w-[93px]">
            <span>BEQLE01</span>
            <span>Béquille VIKY avec profil européen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItems;
