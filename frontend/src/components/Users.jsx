import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const Users = () => {
  const [users, SetUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const alluser = await axios.get(`${API_BASE}/api/users`);
        SetUsers(alluser.data); // ✅ only data
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex-1 bg-green-50">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Users Management
          </h2>
        </div>

        <div className="flex items-center justify-center w-full overflow-hidden rounded-lg bg-white border border-green-300 shadow">
          <table className="w-full table-auto">
            <thead className="bg-green-700 text-white text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Address</th>
                <th className="px-4 py-3 font-semibold">Phone No</th>
                <th className="px-4 py-3 font-semibold">Email</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-green-200 hover:bg-green-100 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3">
                      {user.address || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {user.phonenumber || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
