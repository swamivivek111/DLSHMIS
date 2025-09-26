import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <select
        {...props}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      >
        {children}
      </select>
    </div>
  );
};

export { Select };
