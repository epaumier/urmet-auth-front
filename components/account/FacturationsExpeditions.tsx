import { useState } from "react";
import AccountCard from "./AccountCard";
import EditModal from "../common/EditModal";
import FormField from "../common/FormField";
import ModalActions from "../common/ModalActions";
import { useAuth } from "../../contexts/AuthContext";
import type { AccountField } from "../../dummyData/particulierWithoutZeno";

export default function FacturationsExpeditions() {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const { AccountData } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    pays: "France",
    adresse: "20 rue Ramier",
    codePostal: "75001",
    ville: "Paris",
    differentAddress: false,
  });

  const renderFieldValue = (field: AccountField) => {
    if (Array.isArray(field.value)) {
      return (
        <div className="flex flex-col gap-1 text-[13px] text-stark">
          {field.value.map((line, lineIndex) => (
            <p key={lineIndex}>{line}</p>
          ))}
        </div>
      );
    }
    return <p className="text-[13px] text-stark">{field.value}</p>;
  };

  const renderAccountField = (field: AccountField, fieldIndex: number) => (
    <div key={fieldIndex}>
      {field.label && <p className="text-[13px] text-[#5F6C96]">{field.label}</p>}
      {renderFieldValue(field)}
    </div>
  );

  return (
    <AccountCard
      title="Facturations et expéditions"
      modifierButton={
        <EditModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Modification des adresses"
          trigger={
            <button className="hover:cursor-pointer absolute right-0 top-0 text-[#1100FF] font-semibold text-[13px]">
              Modifier
            </button>
          }
        >
          <form className="space-y-4">
            <h3 className="text-[13px] font-semibold text-stark pt-2 pb-1 border-b border-gray-200">
              Adresse de facturation
            </h3>
            <FormField
              label="Pays *"
              value={addressData.pays}
              onChange={(value) =>
                setAddressData({ ...addressData, pays: value })
              }
              type="select"
              options={[
                { value: "France", label: "France" },
                { value: "Belgique", label: "Belgique" },
                { value: "Suisse", label: "Suisse" },
              ]}
            />
            <FormField
              label="Adresse *"
              value={addressData.adresse}
              onChange={(value) =>
                setAddressData({ ...addressData, adresse: value })
              }
            />
            <FormField
              label="Code postal *"
              value={addressData.codePostal}
              onChange={(value) =>
                setAddressData({ ...addressData, codePostal: value })
              }
            />
            <FormField
              label="Ville *"
              value={addressData.ville}
              onChange={(value) =>
                setAddressData({ ...addressData, ville: value })
              }
            />
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="differentAddress"
                checked={addressData.differentAddress}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    differentAddress: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="differentAddress"
                className="text-[13px] text-stark cursor-pointer"
              >
                Adresse de livraison différente
              </label>
            </div>
            <ModalActions />
          </form>
        </EditModal>
      }
    >
      {AccountData[1].fields.map(renderAccountField)}
    </AccountCard>
  );
}
