import React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

interface PremiumOffer {
  title: string;
  remaining?: string;
  count?: string;
  value?: string;
}

interface PremiumOffersProps {
  offers: PremiumOffer[];
  showTitle?: boolean;
}

const PremiumOffers: React.FC<PremiumOffersProps> = ({ offers, showTitle = true }) => {
  const offersContent = (
    <div className="flex gap-4 p-4">
      {offers.map((offer, index) => (
        <div key={index} className="flex shrink w-full py-4  px-5 rounded-lg border border-gray-300 justify-between">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-stark">{offer.title}</div>
            {offer.remaining && (
              <div className="">
                <span className="text-2xl font-semibold text-stark">{offer.value.split("/")[0]}{" "}</span>
                <span className="">restants{" "}</span>
                <span className="">
                  / {offer.remaining.split("/")[1]}
                </span>
                {offer.remaining}
              </div>
            )}
            {offer.count && (
              <div className="text-2xl font-semibold text-stark">
                {offer.count}
              </div>
            )}
          </div>
          <button className="mt-2">
            <ChevronRightIcon width={20} height={20} />
          </button>
        </div>
      ))}
    </div>
  );

  if (!showTitle) {
    return offersContent;
  }

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-stark">Votre offre premium</h3>
        <button className="text-sm font-semibold text-[#0066CC] border p-2 rounded-lg border-[#0066CC] hover:bg-blue-50">
          Voir vos avantages
        </button>
      </div>
      {offersContent}
    </div>
  );
};

export default PremiumOffers;
