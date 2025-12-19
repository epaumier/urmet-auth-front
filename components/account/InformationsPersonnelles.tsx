import { useState } from "react";
import AccountCard from "./AccountCard";
import EditModal from "../common/EditModal";
import FormField from "../common/FormField";
import ModalActions from "../common/ModalActions";
import { useAuth } from "../../contexts/AuthContext";
import type { AccountField } from "../../dummyData/particulierWithoutZeno";

export default function InformationsPersonnelles() {
  const { data } = useAuth();

  if (!data) {
    return null;
  }

  const { AccountData } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "Claudine",
    nom: "DELARUE",
    societe: "Entreprise DELARUE",
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
      title="Informations personnelles"
      modifierButton={
        <EditModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Modification des informations personnelles"
          trigger={
            <button className="hover:cursor-pointer absolute right-0 top-0 text-[#1100FF] font-semibold text-[13px]">
              Modifier
            </button>
          }
        >
          <form className="space-y-4">
            <FormField
              label="Prénom *"
              value={formData.prenom}
              onChange={(value) => setFormData({ ...formData, prenom: value })}
            />
            <FormField
              label="Nom *"
              value={formData.nom}
              onChange={(value) => setFormData({ ...formData, nom: value })}
            />
            <FormField
              label="Société *"
              value={formData.societe}
              onChange={(value) => setFormData({ ...formData, societe: value })}
            />
            <ModalActions />
          </form>
        </EditModal>
      }
    >
      {AccountData[0].fields.map(renderAccountField)}
    </AccountCard>
  );
}
