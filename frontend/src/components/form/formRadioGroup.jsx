import React from "react";

const FormRadioGroup = ({
  label,
  name,
  options,
  register,
  errors = {},
  selectedValue, // Received from watch("field") in edit forms
  ...rest
}) => {
  return (
    <div className="flex flex-col" dir="rtl">
      {/* Group Label */}
      <label className="mb-2 text-sm font-medium !text-gray-400 dark:text-gray-200">
        {label}
      </label>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300">
        {options.map((option) => {
          const inputProps = {
            type: "radio",
            id: `${name}-${option.value}`,
            value: option.value,
            ...(register ? register(name) : {}),
            ...rest,
            className:
              "w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300",
          };

          // ONLY force the checked attribute if selectedValue is provided (Edit Form)
          // Otherwise, leave it out so React Hook Form can track clicks natively (Add Form)
          if (
            selectedValue !== undefined &&
            selectedValue !== null &&
            selectedValue !== ""
          ) {
            inputProps.checked = String(selectedValue) === String(option.value);
          }

          return (
            <div key={option.value} className="flex items-center gap-3">
              <input {...inputProps} />
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-lg text-gray-700 dark:text-gray-200 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {errors?.[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default FormRadioGroup;
