import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex gap-2">
      <Input
        type={showPassword ? "text" : "password"}
        size="lg"
        label="Enter your Password"
        className="text-black"
        required
        onChange={onChange}
        value={value}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
      </button>
    </div>
  );
};

export default PasswordInput;
