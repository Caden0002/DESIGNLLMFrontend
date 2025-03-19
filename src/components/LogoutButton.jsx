//LogoutButton.jsx

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.picture}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <span className="text-gray-100">{user.name}</span>
      <button
        onClick={() => logout({ returnTo: window.location.origin })}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
