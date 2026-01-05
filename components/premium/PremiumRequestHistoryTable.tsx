import React, { useState } from "react";
import EyeIcon from "../icons/EyeIcon";

interface PremiumRequest {
  service: string;
  date: string;
  requestNumber: string;
}

interface PremiumRequestHistoryTableProps {
  headings: string[];
  data: PremiumRequest[];
}

const PremiumRequestHistoryTable: React.FC<PremiumRequestHistoryTableProps> = ({ headings, data }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Sort data based on date
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === null) return 0;

    // Extract date from format "Le DD/MM/YYYY"
    const dateMatchA = a.date.match(/\d{2}\/\d{2}\/\d{4}/);
    const dateMatchB = b.date.match(/\d{2}\/\d{2}\/\d{4}/);

    if (!dateMatchA || !dateMatchB) return 0;

    const [dayA, monthA, yearA] = dateMatchA[0].split("/").map(Number);
    const [dayB, monthB, yearB] = dateMatchB[0].split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA).getTime();
    const dateB = new Date(yearB, monthB - 1, dayB).getTime();

    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const handleSort = () => {
    if (sortOrder === null) {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder(null);
    }
  };

  return (
    <div className="pt-2 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"
              >
                {heading === "Date de la demande" ? (
                  <div className="flex items-center gap-2">
                    <span>{heading}</span>
                    <button
                      onClick={handleSort}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={
                        sortOrder === null
                          ? "Trier par date"
                          : sortOrder === "desc"
                          ? "Trier du plus ancien au plus récent"
                          : "Réinitialiser le tri"
                      }
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {sortOrder === null && (
                          <>
                            <path
                              d="M3 5L6 2L9 5"
                              stroke="#8994B5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 7L6 10L9 7"
                              stroke="#8994B5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </>
                        )}
                        {sortOrder === "desc" && (
                          <path
                            d="M3 4L6 7L9 4"
                            stroke="#0066CC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        {sortOrder === "asc" && (
                          <path
                            d="M3 8L6 5L9 8"
                            stroke="#0066CC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                ) : (
                  heading
                )}
              </th>
            ))}
            <th className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((request, index) => (
            <tr key={index}>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.service}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.date}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                {request.requestNumber}
              </td>
              <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                <button className="border border-gray-300 p-1 rounded hover:bg-gray-50">
                  <EyeIcon width={16} height={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PremiumRequestHistoryTable;
