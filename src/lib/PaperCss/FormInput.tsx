import React from "react";

type InputProps = {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (val: string) => void;
};

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
}: InputProps) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      className="input-block"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
