import React from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  type: string;
  streak: number;
};

const Navbar = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(res.data);

        setUser(res.data); // Change to res.data.user if your API returns { user: ... }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-slate-100 border-b border-gray-200 px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#841DED]">
          Companion
        </h1>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-[#841DED] transition"
          >
            <div className="h-10 w-10 rounded-full bg-[#841DED] text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>

            <div className="text-left">
              <p className="font-medium">
                {user?.name || "Loading..."}
              </p>

              <p className="text-xs text-gray-500">
                {user?.type || ""}
              </p>
            </div>
          </button>

          {open && user && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

              <div className="bg-[#841DED] text-white p-6">
                <div className="h-16 w-16 rounded-full bg-white text-[#841DED] flex items-center justify-center text-2xl font-bold mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-xl font-semibold">
                  {user.name}
                </h2>

                <p className="text-sm text-purple-100">
                  {user.email}
                </p>
              </div>

              <div className="p-5 space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Role
                  </span>

                  <span className="font-medium">
                    {user.type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Streak
                  </span>

                  <span className="font-medium">
                    🔥 {user.streak}
                  </span>
                </div>

                <button className="mt-4 w-full bg-[#841DED] text-white rounded-lg py-3 hover:opacity-90 transition">
                  Logout
                </button>

              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;