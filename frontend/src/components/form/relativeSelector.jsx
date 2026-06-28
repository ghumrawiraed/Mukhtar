import React from "react";
import { getEmp } from "../../services/employeeService"; // adjust path

const RelativeSelector = ({
  register,
  selectedEmpID,
  setValue,
  relatives,
  selectedRelative,
  setSelectedRelative,
}) => {
const handleChange = async (e) => {
  const relId = e.target.value;

  if (!relId) {
    setSelectedRelative(null);
    return;
  }

  setValue("relative_ID", relId);

  try {
    const fullEmployee = await getEmp(selectedEmpID);

    const selectedRel = fullEmployee.relatives.find(
      (rel) => rel.ID.toString() === relId.toString()
    );

    setSelectedRelative(selectedRel || null);
  } catch (error) {
    console.error("Error fetching employee details:", error);
  }
};

  return (
    <div className="space-y-4">
      {/* Dropdown */}
      <div className="flex flex-col space-y-2" dir="rtl">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          اختر قريب الموظف
        </label>

        <select
          onChange={handleChange}
          className="
            w-full
            px-4 py-2.5
            text-sm
            text-white
            bg-gray-800
            border border-gray-300
            rounded-xl
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500
            focus:border-indigo-500
            transition
          "
        >
          <option value="">-- اختر قريب الموظف --</option>
          {relatives.map((relative) => (
            <option key={relative.ID} value={relative.ID}>
              {`${relative.relative_name}`}
            </option>
          ))}
        </select>
      </div>

      {/* Info Panel */}
    {  console.log("selectedRelative:", selectedRelative)}
      {selectedRelative && (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border">
          <div className="grid grid-cols-2 gap-4 text-sm" dir="rtl">
            <div>
              <span className="font-semibold">رمز قريب الموظف:</span>{" "}
              {selectedRelative.ID}
            </div>

            <div>
              <span className="font-semibold">الاسم والشهرة:</span>{" "}
              {selectedRelative.relative_name}
            </div>            
          </div>
        </div>
      )}
    </div>
  );
};

export default RelativeSelector;
