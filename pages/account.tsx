import { useState } from "react";
import { Tabs } from "radix-ui";
import AccountCard from "../components/account/AccountCard";
import InformationsPersonnelles from "../components/account/InformationsPersonnelles";
import FacturationsExpeditions from "../components/account/FacturationsExpeditions";
import MoyenPaiement from "../components/account/MoyenPaiement";
import { AccountTabData } from "../dummy_data";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="flex-1">
      <Tabs.Root
        className="flex w-fit flex-col mb-5"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <Tabs.List className="flex" aria-label="Manage your account">
          {AccountTabData.map((t, index) => (
            <Tabs.Trigger
              key={`tab${index + 1}`}
              className="flex hover:cursor-pointer px-3 text-nowrap h-9 flex-1 cursor-default select-none items-center justify-center bg-white font-normal leading-5 pb-3 text-[13px] text-gray-300 shadow-[inset_0_-1px_0_0,0_1px_0_0] shadow-gray-300 outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-stark data-[state=active]:font-semibold data-[state=active]:shadow-[#0046DA] data-[state=active]:focus:relative"
              value={`tab${index + 1}`}
            >
              {t}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      {activeTab === "tab1" && (
        <div className="flex flex-col gap-5">
          <InformationsPersonnelles />
          <FacturationsExpeditions />
          <MoyenPaiement />
        </div>
      )}

      {activeTab === "tab2" && (
        <div className="flex flex-col gap-5">
          <AccountCard
            title="Connexion"
            modifierButton={
              <button className="hover:cursor-pointer absolute right-0 top-0 text-[#1100FF] font-semibold text-[13px]">
                Modifier
              </button>
            }
          >
            <div>
              <p className="text-[13px] text-[#5F6C96]">Adresse e-mail</p>
              <p className="text-[13px] text-stark">client@gmail.com</p>
            </div>
            <div>
              <p className="text-[13px] text-[#5F6C96]">Mot de passe</p>
              <p className="text-[13px] text-stark">********</p>
            </div>
          </AccountCard>

          <AccountCard
            title="Données personnelles"
            modifierButton={<div />}
          >
            <h3 className="text-[13px] font-semibold text-stark">
              Gestion de vos données personnelles
            </h3>
            <p className="text-[13px] text-stark leading-5">
              Accédez facilement à vos informations et exportez vos données
              personnelles en toute autonomie. Vous gardez ainsi le contrôle
              total sur vos informations et leur utilisation, en toute
              transparence et conformité avec la réglementation en vigueur.
            </p>
            <button className="text-[#1100FF] font-semibold text-[13px] text-left">
              Exporter mes données personnelles
            </button>
          </AccountCard>

          <AccountCard title="Droit à l'oubli" modifierButton={<div />}>
            <p className="text-[13px] text-stark leading-5">
              Vous pouvez supprimer votre compte urmet à tout moment. Vous
              n'aurez plus accès à votre espace client, votre compte,
              l'historique des achats et toutes les informations qui y sont
              liées seront supprimées.
            </p>
            <button className="text-[#FF0000] font-semibold text-[13px] text-left">
              Effacer mes données personnelles
            </button>
          </AccountCard>
        </div>
      )}

      {activeTab === "tab3" && (
        <div className="flex flex-col gap-5">
          <AccountCard title="Newsletter" modifierButton={<div />}>
            <p className="text-[13px] text-stark">
              Je m'inscris à la newsletter pour recevoir les actualités Urmet.
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="newsletter"
                  value="oui"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-[13px] text-stark">Oui</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="newsletter"
                  value="non"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-[13px] text-stark">Non</span>
              </label>
            </div>
          </AccountCard>
        </div>
      )}
    </div>
  );
}
