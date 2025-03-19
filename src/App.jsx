//App.jsx

import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "./config/auth0-config";
import ChatUI from "./components/ChatUI";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { ChatProvider } from "./context/ChatContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-gray-100">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Auth0Provider {...auth0Config}>
      <ChatProvider>
        <div className="min-h-screen bg-gray-900">
          <ProtectedRoute>
            <ChatUI />
          </ProtectedRoute>
        </div>
      </ChatProvider>
    </Auth0Provider>
  );
}

export default App;
