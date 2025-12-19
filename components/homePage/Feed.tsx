import React from "react";
import FeedItem from "./FeedItem";
import { useAuth } from "../../contexts/AuthContext";

interface FeedProps {
  title: string;
  isTitleWrapped?: boolean;
  isBackgroundGray?: boolean;
}

const Feed: React.FC<FeedProps> = ({
  title,
  isTitleWrapped = false,
  isBackgroundGray,
}) => {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const { FeedData } = data;
  return (
    <div
      className={`flex flex-col w-[944] h-[226px] pt-3 gap-3 border border-gray-300 px-4 rounded-lg ${isBackgroundGray ? "bg-[#D7D7D7]" : ""} `}
    >
      <div className="flex w-[904] h-8 items-center justify-between">
        <span
          className={`font-semibold leading-5 text-stark ${isTitleWrapped ? "text-wrap" : "text-nowrap"} `}
        >
          {title}
        </span>
        <button className="py-1 px-2.5 border  border-raven rounded-lg hover:cursor-pointer">
          <p className="font-semibold text-[13px] leading-5 text-raven">Voir toutes nos actualités</p>
        </button>
      </div>
      <div className="flex gap-3">
        {FeedData.map((d) => (
          <FeedItem
            content={d.content}
            date={d.date}
            linkToArticle={d.linkToArticle}
            key={d.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
