import React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import { useAuth } from "../../contexts/AuthContext";

interface ContactUsProps {
  title: string;
  isTitleWrapped?: boolean;
  isBackgroundGray?: boolean;
}

interface PhoneContact {
  phone: string;
  pricing: string;
}

interface ContactPhoneData {
  urmetElkron: PhoneContact;
  yokis: PhoneContact;
}

const ContactUs: React.FC<ContactUsProps> = ({
  title,
  isTitleWrapped = false,
  isBackgroundGray,
}) => {
  const { userInfo } = useAuth();

  // Contact data for Particulier users
  const particulierPhoneData: ContactPhoneData = {
    urmetElkron: {
      phone: "0 899 705 634",
      pricing: "0,80€/min + prix de l'appel",
    },
    yokis: {
      phone: "07 55 85 86 87",
      pricing: "",
    },
  };

  // Contact data for Pro users
  const proPhoneData: ContactPhoneData = {
    urmetElkron: {
      phone: "0 825 890 830",
      pricing: "0,15€/min + prix de l'appel",
    },
    yokis: {
      phone: "0 899 797 999",
      pricing: "0,50€/min + prix de l'appel",
    },
  };

  // Determine which data to use based on contract type
  const isPro = userInfo?.contractType === "pro";
  const phoneData = isPro ? proPhoneData : particulierPhoneData;

  return (
    <div
      className={`flex flex-col border border-gray-300 p-4 gap-5 rounded-lg ${isBackgroundGray ? "bg-[#D7D7D7]" : ""} `}
    >
      <span
        className={`font-semibold leading-5 ${isTitleWrapped ? "text-wrap" : "text-nowrap"} `}
      >
        {title}
      </span>
      <div className="flex gap-5">
        <div className="flex grow p-4 flex-col gap-6 border border-gray-300 rounded-lg">
          <div className="flex flex-col gap-1">
            <span className="font-[Inter] font-semibold text-sm">
              Par téléphone
            </span>
            <span className="font-[Inter]  text-[13px]">
              Du lundi au jeudi de 8h30 à 12h et le vendredi de 8h30 à midi et
              de 13h30 à 16h
            </span>
          </div>
          <div className="flex gap-26">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[13px] leading-5">
                Produits Urmet et Elkron
              </span>
              <span className="font-[Inter] text-[13px] leading-5">
                Appeler le {phoneData.urmetElkron.phone}
              </span>
              {phoneData.urmetElkron.pricing && (
                <span className="font-[Inter] text-[13px] leading-5">
                  {phoneData.urmetElkron.pricing}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[13px] leading-5">
                Produit Yokis
              </span>
              <span className="font-[Inter] text-[13px] leading-5">
                Appeler le {phoneData.yokis.phone}
              </span>
              {phoneData.yokis.pricing && (
                <span className="font-[Inter] text-[13px] leading-5">
                  {phoneData.yokis.pricing}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[346px] justify-between p-4 border border-gray-300 rounded-lg">
          <div className="flex flex-col gap-2">
          <span className="font-[Inter] font-semibold text-sm text-stark">Via notre formulaire de contact</span>

          <span className="font-[Inter] text-[13px]">
            Pour être recontacté pour toutes questions concernant un besoin
            spécifique.
          </span>
          </div>
          <a className="hover:cursor-pointer text-[15px] leading-5 flex items-center justify-between">
            Accéder au formulaire
            <ChevronRightIcon width={21} height={21} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
