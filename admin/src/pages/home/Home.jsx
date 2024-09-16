import React from "react";
import SideBarComponent from "../../components/SideBar";

const users = [
  {
    username: "Username",
    photo: "/path/to/photo.jpg", // Replace with the actual path to your images
    createdAt: "8/16/2023",
    lastLogin: "8/16/2023",
    email: "email@example.com",
    listenedAnasheed: "00",
    playlist: "00",
    role: "Admin", // Or "User"
  },
  // Add more users here
];

const Home = () => {
  return (
    <div className="flex">
      <SideBarComponent ele={0} />
      <div className="ml-24 flex-1">
        <div className="p-8">

    <div className="p-8 bg-green-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-white">Users</h2>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600">
            <i className="fas fa-sync-alt"></i> {/* Refresh icon */}
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src="/path/to/profile.jpg" // Add profile image
              alt="Profile"
            />
            <span className="text-white font-medium">Username</span>
          </div>
        </div>
      </div>

      <table className="min-w-full text-sm text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">Photo</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Last Login</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Listened Anasheed</th>
            <th className="p-4 text-left">Playlist</th>
            <th className="p-4 text-left">Role</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {users.map((user, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-4">{user.username}</td>
              <td className="p-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photo}
                  alt={user.username}
                />
              </td>
              <td className="p-4">{user.createdAt}</td>
              <td className="p-4">{user.lastLogin}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.listenedAnasheed}</td>
              <td className="p-4">{user.playlist}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    user.role === "Admin"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>



    </div>
  );
};

export default Home;
