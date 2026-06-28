import React, { useState, useEffect } from "react";
import { getEmp } from "../../services/employeeService";

const SubformRow = ({
  index,
  register,
  setValue,
  employees,
  remove,
  showDelete,
}) => {
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleChange = async (e) => {
    const empId = e.target.value;

    if (!empId) {
      setSelectedDetails(null);
      setValue(`employees.${index}.emp_ID`, "");
      return;
    }

    setValue(`employees.${index}.emp_ID`, empId);

    try {
      const res = await getEmp(empId);
      const fullEmployee = res?.data || res;
      setSelectedDetails(fullEmployee);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  // Helper function to format date properties cleanly
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
      {/* Selection Control Bar */}
      <div className="flex items-end gap-4">
        <div className="flex-1 flex flex-col space-y-2" dir="rtl">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            الموظف {index + 1}
          </label>

          <select
            {...register(`employees.${index}.emp_ID`, {
              required: "يجب اختيار موظف",
            })}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">-- اختر موظف --</option>
            {employees.map((emp) => (
              <option key={emp.ID} value={emp.ID}>
                {`${emp.first_name || ""} ${emp.family_name || ""}`}
              </option>
            ))}
          </select>
        </div>

        {showDelete && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm transition"
          >
            حذف
          </button>
        )}
      </div>

      {/* Embedded Info Panel for This Row */}
      {selectedDetails && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-md overflow-hidden transition-all duration-300">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              تفاصيل ملف الموظف
            </span>
          </div>

          <div className="p-4 flex flex-col gap-4 text-right" dir="rtl">
            {/* ROW 1: General & Personal Information (8 Fields) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  الاسم والشهرة
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {`${selectedDetails.first_name || ""} ${selectedDetails.family_name || ""}`}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  اسم الأب
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.middle_name || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  الجنس
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500">
                  {selectedDetails.sex || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  الجنسية
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.nationality || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  تاريخ الولادة
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500">
                  {formatDate(selectedDetails.birthdate)}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  الوضع العائلي
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.marital_status || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  رقم السجل
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 font-mono">
                  {selectedDetails.record_no || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  رقم الضمان
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 font-mono">
                  {selectedDetails.nssf_no || "-"}
                </p>
              </div>
            </div>

            {/* ROW 2: Address & Work Assignments (8 Fields) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  المحافظة
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.cr_mohafaza || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  القضاء
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.cr_kadaa || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  البلدة/المدينة
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.cr_city || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  الوظيفة
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.position || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  نوع العمل
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate">
                  {selectedDetails.work_type || "-"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  بدء العمل
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500">
                  {formatDate(selectedDetails.work_start_date)}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  انتهاء العمل
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-yellow-500">
                  {formatDate(selectedDetails.work_end_date)}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-2 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-400 mb-0.5">
                  ملاحظات
                </p>
                <p
                  className="text-sm font-semibold text-gray-800 dark:text-yellow-500 truncate"
                  title={selectedDetails.note}
                >
                  {selectedDetails.note || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubformRow;
