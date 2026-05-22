"use client";

import Select, { SingleValue } from "react-select";

type DistributorOption = {
  value: string;
  label: string;
};

interface DistributorSelectProps {
  options: DistributorOption[];
  value: DistributorOption | null;
  onChange: (id: string) => void;
}

export function DistributorSelect({
  options,
  value,
  onChange,
}: DistributorSelectProps) {
  const handleChange = (option: SingleValue<DistributorOption>) => {
    if (option?.value) {
      onChange(option.value);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_45px_rgba(0,0,0,0.06)] sm:p-6">
      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Buscar distribuidor
      </label>

      <Select
        instanceId="distributor-select"
        options={options}
        value={value}
        onChange={handleChange}
        placeholder="Selecciona una sede..."
        noOptionsMessage={() => "No hay distribuidores"}
        classNamePrefix="pvc-select"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "52px",
            borderRadius: "16px",
            borderColor: state.isFocused ? "#f0c040" : "#e2e8f0",
            boxShadow: state.isFocused ? "0 0 0 4px rgba(240,192,64,0.18)" : "none",
            "&:hover": {
              borderColor: "#f0c040",
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#061540"
              : state.isFocused
                ? "rgba(240,192,64,0.14)"
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
            borderRadius: "16px",
            overflow: "hidden",
            zIndex: 40,
          }),
        }}
      />

      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        Puedes buscar por nombre de sede o ciudad para encontrar más rápido el
        distribuidor más cercano.
      </p>
    </div>
  );
}