import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";

const RegisterUser = () => {
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("تم حفظ المستخدم بنجاح");
      navigate("/users/list");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save user");
    }
  };

  return (
    <>
      <h2
        className="    text-2xl font-bold text-gray-900 dark:text-white
                            mb-8 text-right
                            px-6 sm:px-8 py-3
                            -mx-6 sm:-mx-8
                            -mt-6 sm:-mt-8
                            dark:bg-slate-700
                            rounded-t-2xl"
      >
        تسجيل مستخدم جديد
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        dir="rtl"
        autoComplete="off"
      >
        {/* Username Field */}
        <div className="flex flex-col gap-1.5 text-right">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            اسم المستخدم
          </label>
          <input
            type="text"
            id="username"
            autoComplete="new-username"
            {...register("username", { required: "هذا الحقل مطلوب" })}
            className={`w-full px-4 py-2 rounded-lg border bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.username && (
            <span className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 text-right">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password", {
              required: "هذا الحقل مطلوب",
              minLength: {
                value: 6,
                message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
              },
            })}
            className={`w-full px-4 py-2 rounded-lg border bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.password && (
            <span className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          {/* Save Button */}
          <button
            type="submit"
            className="w-1/2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            حفظ
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            className="w-1/2 px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
            onClick={() => navigate(-1)}
          >
            إلغاء
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterUser;
