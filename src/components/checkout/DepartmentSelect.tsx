import { colombiaDepartments } from "@/utils/checkoutInfo";
import Select, { SingleValue } from "react-select";

type DepartmentOption = {
  value: string;
  label: string;
};

export function DepartmentSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedValue =
    colombiaDepartments.find((department) => department.value === value) ?? null;

  const handleChange = (option: SingleValue<DepartmentOption>) => {
    onChange(option?.value ?? "");
  };

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#061540]/50">
        Departamento
      </span>

      <Select<DepartmentOption, false>
        instanceId="department-select"
        options={colombiaDepartments}
        value={selectedValue}
        onChange={handleChange}
        placeholder="Selecciona un departamento"
        noOptionsMessage={() => "No hay departamentos"}
        classNamePrefix="pvc-select"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "48px",
            borderRadius: "12px",
            borderColor: state.isFocused ? "#061540" : "rgba(6,21,64,0.12)",
            backgroundColor: "#f4f5f9",
            boxShadow: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#061540",
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#061540"
              : state.isFocused
                ? "rgba(6,21,64,0.08)"
                : "white",
            color: state.isSelected ? "white" : "#061540",
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#061540",
            fontWeight: 700,
          }),
          placeholder: (base) => ({
            ...base,
            color: "#94a3b8",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 40,
          }),
        }}
      />
    </label>
  );
}