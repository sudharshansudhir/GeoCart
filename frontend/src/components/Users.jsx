import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const Users = () => {
  const [users, SetUsers] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const alluser = await axios.get(`${API_BASE}/api/users`);
        SetUsers(alluser.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `${API_BASE}/api/users/delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status !== 404) {
        alert("User Deleted Successfully");
      }
    } catch (e) {
      console.log(">>>", e);
    }
  }

  return (
    <div className="flex-1 bg-green-50">
      <div className="w-full p-4 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6 text-center">
          Customers Management
        </h2>

        {/* TABLE WRAPPER */}
        <div className="overflow-x-auto bg-white border border-green-300 rounded-lg shadow">
          <table className="min-w-[700px] w-full table-auto text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    onMouseEnter={() => setHoveredUser(user._id)}
                    onMouseLeave={() => setHoveredUser(null)}
                    className="border-t border-green-200 hover:bg-green-100 transition"
                  >
                    <td className="px-4 py-3 text-center font-medium">
                      {user.name}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {user.address || "—"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {user.phonenumber || "—"}
                    </td>

                    <td className="px-4 py-3 text-center break-all">
                      {user.email}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {/* Desktop hover */}
                      <div className="hidden md:block">
                        {hoveredUser === user._id && (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      {/* Mobile always visible */}
                      <div className="md:hidden">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
