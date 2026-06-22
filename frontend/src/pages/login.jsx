import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_USERNAME, SET_ID } from "../redux/auth/authSlice";
import { loginUser } from "../services/authService";
//import logo from "../../assets/Logo.png";

const initialState = {
  username: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { username, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    // validation
    if (!username || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 chars ");
    }

    const userData = { username, password };
    setIsLoading(true);

    // attemps to login the user
    try {
      const data = await loginUser(userData);

      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USERNAME(data.username));

      await dispatch(SET_ID(data.id));

      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log("Network Error ...");
      }
    }
  };

  return (
  <div className="" dir="rtl">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto pt-24">

      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Mukhtar
      </a>

      <div className="w-full bg-white/50 rounded-2xl shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800/90 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-right">
          <h2 className="!text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
            تسجيل الدخول
          </h2>

          <form className="space-y-4 md:space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                اسم المستخدم
              </label>

              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                name="username"
                id="username"
                className="bg-gray-50 border  text-gray-900 rounded-2xl focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-right  focus:ring-indigo-500 dark:bg-[#303134]"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                كلمة المرور
              </label>

              <input
                type="password"
                value={password}
                onChange={handleInputChange}
                name="password"
                id="password"
                placeholder="ادخل كلمة المرور"
                className="rounded-2xl bg-gray-50 border border-gray-300 text-gray-900  focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-right "
                required
              />
            </div>

            <div className="flex items-center justify-between flex-row-reverse">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="mr-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    تذكرني
                  </label>
                </div>
              </div>

              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:underline dark:text-gray-300"
              >
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-3 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-medium shadow-md transition"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);


}

export default Login;
