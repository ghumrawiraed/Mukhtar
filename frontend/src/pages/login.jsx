import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_USERNAME, SET_ID } from "../redux/auth/authSlice";
import { loginUser } from "../services/authService";
//import logo from "../../assets/Logo.png";

// FIX: Added password so your controlled input fields don't crash or trigger warnings
const initialState = {
  username: "",
  password: "", 
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

    // attempts to login the user
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
 

  <div className="w-full bg-white/50 rounded-lg shadow  md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800/50 dark:border-gray-700">
    
    <div className="w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-white backdrop-blur-lg" dir="rtl">
    
      <h2 className="text-2xl font-bold text-center mb-6">
        تسجيل الدخول
      </h2>

      <form className="space-y-4 md:space-y-6" onSubmit={login}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1"
          >
            اسم المستخدم
          </label>

          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            name="username"
            id="username"
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل اسم المستخدم"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1"
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
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          disabled={isLoading}
          className="w-full px-3 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-medium shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? "جاري التحميل..." : "دخول"}
        </button>
      </form>
    </div>
        </div>


  );
}

export default Login;

