const FormSelect = ({
  label,
  name,
  options = [],
  register,
  errors = {},
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">{label}</label>

      <select
        {...(register && name ? register(name) : {})}
        {...rest}
        className=" rounded-xl px-3 py-2 bg-white dark:bg-[#303134]"
      >
        <option value="">-- Select --</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {register && name && errors?.[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default FormSelect;
