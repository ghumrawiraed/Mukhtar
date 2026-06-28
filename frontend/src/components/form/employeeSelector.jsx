import React, { useEffect } from "react";
import { getEmp } from "../../services/employeeService";

const EmployeeSelector = ({
  register,
  setValue,
  employees,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  // Sync react-hook-form when selectedEmployee changes
  useEffect(() => {
    if (selectedEmployee?.ID) {
      setValue("emp_ID", selectedEmployee.ID);
    }
  }, [selectedEmployee, setValue]);

  const handleChange = async (e) => {
    const empId = e.target.value;

    if (!empId) {
      setSelectedEmployee(null);
      setValue("emp_ID", "");
      return;
    }

    // Update react-hook-form value
    setValue("emp_ID", empId);

    try {
      // Get full employee details
      const fullEmployee = await getEmp(empId);

      setSelectedEmployee(fullEmployee);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden field for react-hook-form */}
      <input type="hidden" {...register("emp_ID")} />

      {/* Dropdown */}
      <div className="flex flex-col space-y-2  " dir="rtl">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 ">
          اختر الموظف
        </label>

        <select
          value={selectedEmployee?.ID || ""}
          onChange={handleChange}
          className="
            w-full
            px-4 py-2.5
            text-sm
            text-white
            dark:bg-[#303134]
          
            rounded-xl
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500
            focus:border-indigo-500
            transition
          "
        >
          <option value="">-- اختر موظف --</option>

          {employees.map((emp) => (
            <option key={emp.ID} value={emp.ID}>
              {`${emp.first_name} ${emp.family_name}`}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Info */}
      {selectedEmployee && (
        <div
          className="
      mt-4
      rounded-2xl
      border border-gray-200 dark:border-gray-600
      bg-white dark:bg-gray-800
      shadow-lg
      overflow-hidden
    "
          dir="rtl"
        >
          {/* Header */}
          <div className="bg-indigo-600 px-5 py-3">
            <h2 className="text-white font-bold text-lg">معلومات الموظف</h2>
          </div>

          {/* Content */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card */}
         

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                الاسم والشهرة
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-yellow-500">
                {`${selectedEmployee.first_name} ${selectedEmployee.family_name}`}
              </p>
            </div>
           <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                رمز الموظف
              </p>
              <p className="text-lg font-bold text-indigo-500">
                {selectedEmployee.ID}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                اسم الأب
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-yellow-500">
                {selectedEmployee.middle_name || "-"}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                رقم الضمان
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-yellow-500">
                {selectedEmployee.nssf_no || "-"}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                اسم الزوجة
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-yellow-500">
                {selectedEmployee.w_name || "-"}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                تاريخ ميلاد الزوجة
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-yellow-500">
                {selectedEmployee.w_birthdate
                  ? new Date(selectedEmployee.w_birthdate).toLocaleDateString(
                      "en-GB",
                    )
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSelector;
