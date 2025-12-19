import ServiceCard from "../components/homePage/ServiceCard";
import QuoteCard from "../components/homePage/QuoteCard";
import FavoriteItems from "../components/homePage/FavoriteItems";
import Feed from "../components/homePage/Feed";
import ContactUs from "../components/homePage/ContactUs";
import { useAuth } from "../contexts/AuthContext";

export default function Page() {
  const { userInfo } = useAuth();
  const Services = [
    "Simuler mon projet",
    "Trouver un installateur",
    "Faire un retour SAV",
    "Service après-vente",
    "Explorer tous nos services",
  ];
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Bonjour {userInfo?.name},</h1>
      <div className="flex w-[944px] gap-4 nowrap overflow-hidden">
        {Services.map((element, index) => {
          return (
            <ServiceCard
              key={index}
              title={element}
              isBackgroundGray={index === 4}
              isTitleWrapped={index === 4}
            />
          );
        })}
      </div>
      <div className="flex gap-5">
        <QuoteCard title={"Faire une demande de devis"} />
        <FavoriteItems title={"Vos articles favoris (4)"} />
      </div>
      <Feed title="Nos actualités" />
      <ContactUs title="Nous contacter" />
    </div>
  );
}
