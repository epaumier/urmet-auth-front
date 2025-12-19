import { useAuth } from "../contexts/AuthContext";
import type { UserType } from "../services/magento";

export default function UserTypeSelector() {
  const { userInfo, switchUserType, isLoading } = useAuth();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserType = event.target.value as UserType;
    await switchUserType(newUserType);
  };

  return (
    <div className="flex gap-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
      <span className="font-semibold text-sm">Type d'utilisateur:</span>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="particulierWithoutZeno"
            checked={userInfo?.userType === "particulierWithoutZeno"}
            onChange={handleChange}
            disabled={isLoading}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm">Particulier Sans Contrat Zeno</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="interneUrmet"
            checked={userInfo?.userType === "interneUrmet"}
            onChange={handleChange}
            disabled={isLoading}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm">Interne URMET/SAV</span>
        </label>
      </div>
    </div>
  );
}
