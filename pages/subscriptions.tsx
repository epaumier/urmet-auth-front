import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function SubscriptionsPage() {
  const { userInfo, data } = useAuth();
  const [activeTab, setActiveTab] = useState<"subscriptions" | "contracts">("subscriptions");

  // Access control
  if (userInfo?.userType !== "InstallateurPremiumWithSite") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-stark mb-2">
            Accès refusé
          </h2>
          <p className="text-[13px] text-gray-600">
            Cette page est réservée aux utilisateurs premium.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  const contractInfo = {
    contractNumber: "89764534",
    expiryDate: "04/09/2025",
  };

  const subscriptionStats = [
    { label: "Nombre de modem", value: "58", subtitle: "Depuis le 01/01/2025" },
    { label: "Montant modem", value: "250,40 €", subtitle: "Depuis le 01/01/2025" },
    { label: "Service additionnel", value: "564 €", subtitle: "Depuis le 01/01/2025" },
    { label: "Total annuel", value: "4 520,80 €", subtitle: "Depuis le 01/01/2025" },
  ];

  const subscriptionData = [
    {
      contractNumber: "578619586",
      site: "Les coquelicots",
      operator: "LISA",
      address: "3 impasse des coquelicots 75...",
      contract: "Du 04/09/2024\nau 04/09/2025",
      billing: "Pré-payé",
      modemCount: "2 modems",
      modemAmount: "0,90€ /mois",
      additionalService: "1€ /mois",
    },
    {
      contractNumber: "628619595",
      site: "Jonquilles",
      operator: "Tel2Voice",
      address: "94 rue de la jacquette 92120...",
      contract: "Du 21/06/2025",
      billing: "Mensuelle",
      modemCount: "1 modem",
      modemAmount: "0,45€ /mois",
      additionalService: "10€ /mois",
    },
    {
      contractNumber: "168619552",
      site: "Primevère",
      operator: "LISA",
      address: "56 av. de la Dordogne 50200...",
      contract: "Du 21/06/2025",
      billing: "Mensuelle",
      modemCount: "9 modems",
      modemAmount: "4,05€ /mois",
      additionalService: "Aucun",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors ${
            activeTab === "subscriptions"
              ? "border-[#0066CC] text-[#0066CC]"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Souscription
        </button>
        <button
          onClick={() => setActiveTab("contracts")}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors ${
            activeTab === "contracts"
              ? "border-[#0066CC] text-[#0066CC]"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Contrats
        </button>
        <button className="ml-auto px-4 py-2 text-[13px] font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-blue-50 self-end mb-2">
          Gérer
        </button>
      </div>

      {activeTab === "subscriptions" && (
        <>
          {/* Contract expiry banner */}
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
                Le contrat pré-payé n°{contractInfo.contractNumber} expire le{" "}
                {contractInfo.expiryDate}.
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

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-4">
            {subscriptionStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white"
              >
                <div className="text-[11px] font-semibold text-stark mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-stark mb-1">{stat.value}</div>
                <div className="text-[11px] text-gray-600">{stat.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  stroke="#8994B5"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 11L14 14"
                  stroke="#8994B5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Rechercher par n° d'abonnement, n° de site, adresse"
                className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <label className="flex items-center gap-2 text-[13px] text-gray-700">
              <input type="checkbox" className="rounded" />
              Afficher uniquement les modems en erreur (3)
            </label>
          </div>

          {/* Subscriptions table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    N° de contrat
                  </th>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    Nom et adresse du site
                  </th>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    Contrat
                  </th>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    Facturation
                  </th>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    Modem et montant
                  </th>
                  <th className="text-left font-semibold text-[#8994B5] text-[11px] p-3">
                    Service additionnel
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((sub, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-[13px]">
                      <div className="font-semibold">{sub.contractNumber}</div>
                      <div className="text-gray-600">{sub.operator}</div>
                    </td>
                    <td className="p-3 text-[13px]">
                      <div className="font-semibold">{sub.site}</div>
                      <div className="text-gray-600">{sub.address}</div>
                    </td>
                    <td className="p-3 text-[13px] whitespace-pre-line text-gray-700">
                      {sub.contract}
                    </td>
                    <td className="p-3 text-[13px]">{sub.billing}</td>
                    <td className="p-3 text-[13px]">
                      <div>{sub.modemCount}</div>
                      <div className="text-gray-600">{sub.modemAmount}</div>
                    </td>
                    <td className="p-3 text-[13px]">{sub.additionalService}</td>
                    <td className="p-3">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="8" cy="3" r="1.5" fill="#374151" />
                          <circle cx="8" cy="8" r="1.5" fill="#374151" />
                          <circle cx="8" cy="13" r="1.5" fill="#374151" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">Afficher</span>
              <select className="px-2 py-1 border border-gray-300 rounded text-[13px]">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">1-25 sur 113</span>
              <div className="flex gap-1">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px] font-semibold text-[#0066CC]">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px]">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px]">
                  3
                </button>
                <span className="px-3 py-1 text-[13px]">...</span>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[13px]">
                  5
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "contracts" && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Onglet Contrats - À implémenter</p>
        </div>
      )}
    </div>
  );
}
