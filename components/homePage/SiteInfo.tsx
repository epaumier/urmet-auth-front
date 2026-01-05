import React, { useState } from "react";

interface SiteInfoProps {
  title: string;
  sites: string[];
  defaultSite?: string;
}

const SiteInfo: React.FC<SiteInfoProps> = ({ title, sites, defaultSite }) => {
  const [selectedSite, setSelectedSite] = useState(defaultSite || sites[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col grow gap-2 border border-gray-300 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-sm text-stark mb-3">Consommation</h4>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 w-full p-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.89492 15.75H16.1051C16.2399 15.7505 16.3726 15.7163 16.4896 15.6507C16.6066 15.585 16.7038 15.4904 16.7715 15.3763C16.8392 15.2622 16.8749 15.1327 16.875 15.0008C16.8751 14.8689 16.8397 14.7392 16.7723 14.625L9.66334 2.62501C9.59593 2.51136 9.49917 2.41702 9.38276 2.35144C9.26634 2.28586 9.13435 2.25134 9 2.25134C8.86565 2.25134 8.73366 2.28586 8.61724 2.35144C8.50083 2.41702 8.40407 2.51136 8.33666 2.62501L1.22775 14.625C1.16031 14.7392 1.12487 14.8689 1.125 15.0008C1.12513 15.1327 1.16084 15.2622 1.2285 15.3763C1.29617 15.4904 1.39341 15.585 1.51042 15.6507C1.62742 15.7163 1.76005 15.7505 1.89492 15.75ZM9.77071 13.5H8.23696V12H9.77071V13.5ZM9.00383 10.5C8.80045 10.5 8.60539 10.421 8.46157 10.2803C8.31776 10.1397 8.23696 9.94893 8.23696 9.75001V8.25001C8.23696 8.0511 8.31776 7.86034 8.46157 7.71968C8.60539 7.57903 8.80045 7.50001 9.00383 7.50001C9.20722 7.50001 9.40228 7.57903 9.54609 7.71968C9.68991 7.86034 9.77071 8.0511 9.77071 8.25001V9.75001C9.77071 9.94893 9.68991 10.1397 9.54609 10.2803C9.40228 10.421 9.20722 10.5 9.00383 10.5Z"
                fill="#FF8C00"
              />
            </svg>

            <span className="text-sm text-stark flex-1 text-left">
              {selectedSite}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
              {sites.map((site, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedSite(site);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 ${
                    selectedSite === site ? "bg-blue-50" : ""
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1L9.5 6H14.5L10.5 9L12 14L8 11L4 14L5.5 9L1.5 6H6.5L8 1Z"
                      fill={selectedSite === site ? "#FFB020" : "#D1D5DB"}
                      stroke={selectedSite === site ? "#FFB020" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="text-[13px] text-stark">{site}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center text-gray-400 mt-3">
        {/* Placeholder for graph/chart */}
      </div>
    </div>
  );
};

export default SiteInfo;
