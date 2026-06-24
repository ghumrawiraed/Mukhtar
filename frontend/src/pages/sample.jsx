
export default function Sample() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden" dir="rtl">
    
    
      {/* Main Content Area */}
      <main className="relative z-20 min-h-screen w-full flex items-center justify-center p-4">
        

        {/* Centered Form Component with Background Blur */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition duration-200 mt-2"
            >
              دخول
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}