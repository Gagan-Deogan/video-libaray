export const Input = ({
  type,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <input
      name={name}
      type={type}
      autoComplete={name}
      aria-describedby={`${name}-constraints`}
      className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};
