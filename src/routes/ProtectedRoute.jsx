import { Navigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/useAuth";
import Loader from "../shared/components/ui/Loader";

const ProtectedRoute = ({
  children,
}) => {
  const {
    loading,
    isAuthenticated,
  } = useAuthContext();

  if (loading) {
    return (
    <div>
      Loading...
    </div> 
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/Login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;