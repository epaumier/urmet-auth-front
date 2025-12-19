interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "select";
  options?: { value: string; label: string }[];
}

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  options,
}: FormFieldProps) {
  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <label className="block text-[13px] text-gray-600 mb-1">{label}</label>
      {type === "select" && options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      )}
    </div>
  );
}
