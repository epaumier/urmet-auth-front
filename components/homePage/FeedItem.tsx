import React from "react";

interface FeedItemProps {
  content: string;
  date: string;
  linkToArticle: string;
}

const FeedItem: React.FC<FeedItemProps> = ({
  content,
  date,
  linkToArticle,
}) => {
  return (
    <div className="flex p-2.5 border border-gray-300 rounded-lg gap-2">
      <div className="h-[70px] w-[70px] bg-[#D9D9D9] rounded-md" />
      <div className="flex flex-col items-start gap-2.5 w-[193px]">
        <div className="flex flex-col gap-1">
          <span className="font-[Inter] text-[13px] leading-5">{content}</span>
          <span className="font-semibold text-[13px] leading-5">{date}</span>
        </div>
        <a className="font-semibold text-[13px] leading-5 text-raven" href={linkToArticle}>Lire l'article</a>
      </div>
    </div>
  );
};

export default FeedItem;
