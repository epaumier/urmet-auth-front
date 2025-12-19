import { useState } from "react";
import AccountCard from "./AccountCard";
import EditModal from "../common/EditModal";
import FormField from "../common/FormField";
import ModalActions from "../common/ModalActions";
import { useAuth } from "../../contexts/AuthContext";
import type { AccountField } from "../../dummyData/particulierWithoutZeno";

export default function MoyenPaiement() {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const { AccountData } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    modePaiement: "Prélèvement mensuel",
    banque: "LCL",
    iban: "FR**** **** **** **** **75G649 **",
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
      title="Moyen de paiement"
      modifierButton={
        <EditModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Modification du moyen de paiement"
          trigger={
            <button className="hover:cursor-pointer absolute right-0 top-0 text-[#1100FF] font-semibold text-[13px]">
              Modifier
            </button>
          }
        >
          <form className="space-y-4">
            <FormField
              label="Mode de paiement *"
              value={paymentData.modePaiement}
              onChange={(value) =>
                setPaymentData({ ...paymentData, modePaiement: value })
              }
              type="select"
              options={[
                { value: "Prélèvement mensuel", label: "Prélèvement mensuel" },
                { value: "Carte bancaire", label: "Carte bancaire" },
                { value: "Virement", label: "Virement" },
              ]}
            />
            <FormField
              label="Banque *"
              value={paymentData.banque}
              onChange={(value) =>
                setPaymentData({ ...paymentData, banque: value })
              }
            />
            <FormField
              label="IBAN *"
              value={paymentData.iban}
              onChange={(value) =>
                setPaymentData({ ...paymentData, iban: value })
              }
            />
            <ModalActions />
          </form>
        </EditModal>
      }
    >
      {AccountData[2].fields.map(renderAccountField)}
    </AccountCard>
  );
}
