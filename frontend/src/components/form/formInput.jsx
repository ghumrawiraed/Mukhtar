const FormInput = ({
  label,
  name,
  type = "text",
  register,
  errors = {},
  textColor = "text-white",
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium !text-gray-400 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        {...(register && name
          ? register(name, type === "number" ? { valueAsNumber: true } : {})
          : {})}
        {...rest}
        className={`px-3 py-2 rounded-2xl  text-lg ${textColor} bg-white dark:bg-[#303134]
          ${
            errors?.[name]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          } 
          focus:outline-none focus:ring-2 transition`}
      />

      {register && name && errors?.[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default FormInput;
