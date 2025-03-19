//Login.jsx

import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  if (isAuthenticated) {
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
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          Welcome to Chat Assistant
        </h1>
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Login with Auth0
        </button>
      </div>
    </div>
  );
};

export default Login;
