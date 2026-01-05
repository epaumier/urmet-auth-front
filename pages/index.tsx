import ServiceCard from "../components/homePage/ServiceCard";
import QuoteCard from "../components/homePage/QuoteCard";
import FavoriteItems from "../components/homePage/FavoriteItems";
import Feed from "../components/homePage/Feed";
import ContactUs from "../components/homePage/ContactUs";
import PremiumContractBanner from "../components/homePage/PremiumContractBanner";
import SiteInfo from "../components/homePage/SiteInfo";
import ModemAlerts from "../components/homePage/ModemAlerts";
import PremiumOffers from "../components/homePage/PremiumOffers";
import { useAuth } from "../contexts/AuthContext";

export default function Page() {
  const { userInfo, data } = useAuth();

  const isPremiumInstaller =
    userInfo?.userType === "InstallateurPremiumWithSite";

  const defaultServices = [
    "Simuler mon projet",
    "Trouver un installateur",
    "Faire un retour SAV",
    "Service après-vente",
    "Explorer tous nos services",
  ];

  const Services =
    isPremiumInstaller && data?.PremiumServices
      ? data.PremiumServices
      : defaultServices;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="flex items-center gap-4 text-xl font-semibold">
        Bonjour {userInfo?.name} {isPremiumInstaller && <div className="font-semibold text-[13px] py-1 px-2 border border-black rounded-2xl">premium +</div>}
      </h1>

      {isPremiumInstaller && data?.PremiumContractInfo && (
        <PremiumContractBanner
          contractNumber={data.PremiumContractInfo.contractNumber}
          expiryDate={data.PremiumContractInfo.expiryDate}
        />
      )}

      {isPremiumInstaller && data?.ConsumptionSiteInfo && data?.ModemAlerts && (
        <div className="flex flex-col border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between p-4">
            <h3 className="font-semibold text-stark">
              Informations sur vos sites
            </h3>
            <button className="px-3 py-1 rounded-lg font-semibold  text-[13px] text-[#0066CC] border border-[#0066CC] hover:bg-blue-50">
              Voir tous vos sites
            </button>
          </div>
          <div className="flex gap-4 p-4">
            <SiteInfo
              title={data.ConsumptionSiteInfo.title}
              sites={data.ConsumptionSiteInfo.sites}
              defaultSite={data.ConsumptionSiteInfo.defaultSite}
            />
            <ModemAlerts alerts={data.ModemAlerts} />
          </div>
        </div>
      )}

      {isPremiumInstaller && data?.PremiumOffers && (
        <PremiumOffers offers={data.PremiumOffers} />
      )}

      {isPremiumInstaller && (
        <div className="flex flex-col border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between p-4">
            <h3 className="font-semibold text-stark">Vos services</h3>
            <button className="px-3 py-1 rounded-lg font-semibold  text-[13px] text-[#0066CC] border border-[#0066CC] hover:bg-blue-50">
              Explorer tous nos services
            </button>
          </div>
          <div className="flex gap-4 p-4">
            {Services.map((element, index) => {
              return (
                <ServiceCard
                  key={index}
                  title={element}
                  isBackgroundGray={index === Services.length - 1}
                  isTitleWrapped={true}
                />
              );
            })}
          </div>
        </div>
      )}

      {!isPremiumInstaller && (
        <div className="flex w-[944px] gap-4 nowrap overflow-hidden">
          {Services.map((element, index) => {
            return (
              <ServiceCard
                key={index}
                title={element}
                isBackgroundGray={index === Services.length - 1}
                isTitleWrapped={index === Services.length - 1}
              />
            );
          })}
        </div>
      )}
      <div className="flex gap-5">
        <QuoteCard title={"Faire une demande de devis"} />
        <FavoriteItems title={"Vos articles favoris (4)"} />
      </div>

      {!isPremiumInstaller && <Feed title="Nos actualités" />}
      <ContactUs title="Nous contacter" />
    </div>
  );
}
