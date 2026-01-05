import { useAuth } from "../contexts/AuthContext";
import PremiumOffers from "../components/homePage/PremiumOffers";
import PremiumServiceCard from "../components/premium/PremiumServiceCard";
import PremiumRequestHistoryTable from "../components/premium/PremiumRequestHistoryTable";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function PremiumPage() {
  const { userInfo, data } = useAuth();

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

  const {
    PremiumOffers: premiumOffers,
    PremiumServicesWithIcons,
    PremiumRequestHistory,
    PremiumRequestHistoryHeadings,
  } = data;

  return (
    <div className="flex flex-col gap-5">
      {/* Top Section: Votre offre premium + */}
      <div className="flex flex-col border border-gray-300 rounded-lg">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold text-stark">
            Votre offre premium +
          </h1>
          <div className="flex items-center gap-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-3 py-1 text-[13px] font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-blue-50 hover:cursor-pointer">
                  Télécharger
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 5L6 8L9 5"
                      stroke="#0066CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                    Télécharger le contrat
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                    Télécharger la facture
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <button className="px-3 py-1 text-[13px] font-semibold text-white bg-[#0066CC] border border-[#0066CC] rounded-lg hover:bg-blue-700 hover:cursor-pointer">
              Voir vos avantages
            </button>
          </div>
        </div>

        {/* Premium Offers Cards */}
        {premiumOffers && (
          <PremiumOffers showTitle={false} offers={premiumOffers} />
        )}

        {/* Services Section */}
        {PremiumServicesWithIcons && (
          <div className="p-4">
            <h2 className="font-semibold text-[13px] text-stark mb-4">
              Services en ligne inclus en illimité
            </h2>
            <div className="flex flex-wrap gap-3">
              {PremiumServicesWithIcons.map((service) => (
                <PremiumServiceCard
                  key={service.id}
                  title={service.title}
                  link={service.link}
                />
              ))}
            </div>
          </div>
        )}

        {/* Request History Table */}
        {PremiumRequestHistory && PremiumRequestHistoryHeadings && (
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold text-[13px] text-stark">
              Historique des demandes ({PremiumRequestHistory.length})
            </h2>
            <PremiumRequestHistoryTable
              headings={PremiumRequestHistoryHeadings}
              data={PremiumRequestHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
}
