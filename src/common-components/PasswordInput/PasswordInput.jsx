import { useState } from "react";
import { VisibleIcon, VisibleOffIcon } from "assests/icons";
import { Input } from "common-components/Input";
export const PasswordInput = ({ name, error, value, id, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        value={value}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        required
        id={id}
      />
      <span
        className="position-absolute right padding-8 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}>
        {showPassword && <VisibleIcon />}
        {!showPassword && <VisibleOffIcon />}
      </span>
      <h6 className="text-error text-sm">{error}</h6>
    </div>
  );
};
