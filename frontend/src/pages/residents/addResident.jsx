import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formSections } from "./formSections";
import FormInput from "../../components/form/formInput";
import FormSelect from "../../components/form/formSelect";
import { registerResident } from "../../services/residentService";
import { toast } from "react-toastify";

const AddResident = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const cleanedData = { ...data };

    // -------- NUMBER FIELDS --------
    const numberFields = [];

    numberFields.forEach((field) => {
      if (cleanedData[field] === "" || cleanedData[field] === undefined) {
        cleanedData[field] = null;
      } else {
        cleanedData[field] = Number(cleanedData[field]);
      }
    });

    // -------- DATE FIELDS --------
    const dateFields = ["birthdate"];

    dateFields.forEach((field) => {
      if (cleanedData[field] === "" || cleanedData[field] === undefined) {
        cleanedData[field] = null;
      } else {
        cleanedData[field] = new Date(cleanedData[field]);
      }
    });

    try {
      await registerResident(cleanedData);
      toast.success("Resident Added Successfully");
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-slate-900 py-10 px-4"
      dir="rtl"
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-5">
          <h2 className="text-2xl font-bold text-white">نموذج المقيم</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* Form Fields */}
          {Object.keys(formSections).map((sectionKey) => (
            <div
              key={sectionKey}
              className={activeTab === sectionKey ? "block" : "hidden"}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-2">
                {formSections[sectionKey].map((field) => (
                  <div key={field.name}>
                    {field.type === "select" ? (
                      <FormSelect
                        {...field}
                        register={register}
                        errors={errors}
                      />
                    ) : (
                      <FormInput
                        {...field}
                        register={register}
                        errors={errors}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Tabs */}
          <div className="mt-2 border-t pt-6">
            <div className="flex flex-wrap justify-center gap-3">
              {["personal", "contact", "notes"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-100 dark:bg-slate-700 dark:text-gray-200"
                  }`}
                >
                  {tab === "personal" && "البيانات الشخصية"}
                  {tab === "contact" && "العنوان وبيانات التواصل"}
                  {tab === "notes" && "ملاحظات"}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex justify-end gap-4 border-t pt-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700 shadow-lg"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResident;
