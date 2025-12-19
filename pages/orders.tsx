import { useState } from "react";
import TabsDemo from "../components/common/Tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ThreeDotsIcon from "../components/icons/ThreeDotsIcon";
import InfoIcon from "../components/icons/InfoIcon";
import { useAuth } from "../contexts/AuthContext";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("tab1");
  const { data } = useAuth();

  if (!data) {
    return <div>Chargement...</div>;
  }

  const { OrdersHeadings, OrdersData, SAVHeadings, SAVData } = data;

  function returnStatus(status) {
    return status === "En attente de conf." ? (
      <div className="bg-[#EAF3FE] px-4 py-1 text-[#0046DA] font-semibold rounded-2xl">
        En attente de conf.
      </div>
    ) : status === "Expédiée" ? (
      <div className="bg-[#EAFDED] text-[#06AB65] font-semibold px-4 py-1 rounded-2xl">
        Expédiée
      </div>
    ) : (
      <>{status}</>
    );
  }

  function returnSAVStatus(status) {
    return status === "En attente de réception" ? (
      <div className="bg-[#EAF3FE] px-4 py-1 text-[#0046DA] font-semibold rounded-2xl">
        En attente de réception
      </div>
    ) : status === "Reçu" ? (
      <div className="bg-[#EAFDED] text-[#06AB65] font-semibold px-4 py-1 rounded-2xl">
        Reçu
      </div>
    ) : (
      <>{status}</>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <TabsDemo activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "tab1" ? (
        <>
          <p className="text-stark leading-5 text-[13px] font-normal ">
            Liste des services et des produits achetés uniquement sur ce site.
          </p>
          <div className="border border-gray-300 rounded-lg px-4 pt-2 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {OrdersHeadings.map((heading, index) => (
                    <th
                      key={index}
                      className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OrdersData.map((order, index) => (
                  <tr key={index}>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {order.ref}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {order.product}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {order.order}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {order.amount === "Premium" ? (
                        <div className="flex items-baseline-last gap-1">
                          Premium
                          <InfoIcon />
                        </div>
                      ) : (
                        order.amount
                      )}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      <div className="w-fit">{returnStatus(order.status)}</div>
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {order.bonsDeRetour}
                    </td>
                    <td className="h-[50px] font-normal leading-5 text-[#5F6C96] text-[13px] border-t border-gray-200">
                      {order.date}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="border border-gray-300 px-1 py-1 rounded hover:bg-gray-50">
                            <ThreeDotsIcon />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                            sideOffset={5}
                          >
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Voir plus d'informations sur la commande
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Renouveler la commande
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Accéder à la fiche produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Télécharger la documentation produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Demander un retour produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Télécharger la facture
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <p className="text-stark leading-5 text-[13px] font-normal ">
            Seuls les produits retournés dans le cadre d’un SAV sont concernés.
            Les retours de stock ou toute autre demande ne seront pas pris en
            compte.
          </p>
          <div className="border border-gray-300 rounded-lg px-4 pt-2 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {SAVHeadings.map((heading, index) => (
                    <th
                      key={index}
                      className="text-left font-semibold leading-4 text-[#8994B5] text-[11px] pb-1"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAVData.map((sav, index) => (
                  <tr key={index}>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {sav.ref}
                    </td>
                    <td className="h-[50px] w-[200px] overflow-hidden font-normal text-[13px] border-t border-gray-200">
                      <span className="line-clamp-1">{sav.product}</span>
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {sav.order}
                    </td>
                    <td className=" h-[50px] font-normal text-[13px] border-t border-gray-200">
                      <div className="w-fit">{returnSAVStatus(sav.status)}</div>
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      {sav.bonsDeRetour}
                    </td>
                    <td className="h-[50px] font-normal leading-5 text-[#5F6C96] text-[13px] border-t border-gray-200">
                      {sav.date}
                    </td>
                    <td className="h-[50px] font-normal text-[13px] border-t border-gray-200">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="border border-gray-300 px-1 py-1 rounded hover:bg-gray-50">
                            <ThreeDotsIcon />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                            sideOffset={5}
                          >
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Voir plus d'informations sur la commande
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Renouveler la commande
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Accéder à la fiche produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Télécharger la documentation produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Demander un retour produit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="text-[13px] leading-none text-gray-900 rounded flex items-center h-9 px-3 relative select-none outline-none cursor-pointer hover:bg-gray-100">
                              Télécharger la facture
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
