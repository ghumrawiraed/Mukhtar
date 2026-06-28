import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Table,
  FileCheck,
  Users,
  User,
  ChevronDown,
  IdCardLanyardIcon,
  Newspaper,
  BriefcaseMedical,
  Search,
  DatabaseBackupIcon,
  House,
} from "lucide-react";
import "animate.css";

const modernMenuData = [
  {
    label: "ملفات",
    items: [
      {
        name: "المقيمين",
        add: "/resident/add",
        list: "/resident/list",
        Icon: User,
      },
      {
        name: "إفادة سكن",
        add: "/ifadet-sakan/add",
        list: "/ifadet-sakan/list",
        Icon: FileCheck,
      },
      {
        name: "طلب وثيقة من دائرة النفوس",
        add: "/request/add",
        list: "/request/list",
        Icon: IdCardLanyardIcon,
      },
      {
        name: "شهادة حسن سلوك",
        add: "/suluk/add",
        list: "/suluk/list",
        Icon: Newspaper,
      },
      {
        name: "إفادة لمن يهمه الأمر",
        add: "/to-concern/add",
        list: "/to-concern/list",
        Icon: BriefcaseMedical,
      },
    ],
  },

  {
    label: "إعدادات",
    items: [
      { name: "المؤسسة", list: "/establishment", Icon: House },
      {
        name: "المستخدمين والصلاحيات",
        add: "/users/add",
        list: "/users/list",
        Icon: Users,
      },
      { name: "البحث", list: "/search", Icon: Search },
      { name: "النسخ الاحتياطي", list: "/backup", Icon: DatabaseBackupIcon },
    ],
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-xl h-20 shadow-xl"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center h-full gap-8">
        <Link to="/" className="text-3xl font-extrabold text-[#94a3b8]">
          M<span className="text-white">ukhtar</span>
        </Link>

        {/* 2. THE NAV LIST */}
        <ul className="flex justify-end  gap-4 h-full">
          {modernMenuData.map((dropdown, index) => (
            <li key={index} className="relative h-full flex items-center">
              {/* BUTTON */}
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  openDropdown === index
                    ? "text-white bg-white/20 shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {dropdown.label}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === index ? "rotate-180" : ""}`}
                />
              </button>

              {/* 3. THE DROPDOWN: Fixed positioning logic */}
              {openDropdown === index && (
                <div
                  className="absolute top-[90%] right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 z-50 border border-gray-100 
               /* THE ANIMATION POLISH */
               origin-top transition-all duration-300 ease-out
               animate-in fade-in zoom-in-95 slide-in-from-top-4"
                >
                  <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1 custom-scrollbar">
                    {dropdown.items.map((item, i) => {
                      const IconComponent = item.Icon;
                      return (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-100"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-gray-900">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {item.add && (
                              <Link
                                to={item.add}
                                onClick={() => setOpenDropdown(null)}
                                className="flex-1 py-2 bg-blue-600 !text-white rounded-lg text-center text-xs font-bold hover:bg-blue-700 transition"
                              >
                                <Plus size={14} className="inline ml-1" /> إضافة
                              </Link>
                            )}
                            <Link
                              to={item.list}
                              onClick={() => setOpenDropdown(null)}
                              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-center text-xs font-bold hover:bg-gray-300 transition"
                            >
                              <Table size={14} className="inline ml-1" /> لائحة
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
