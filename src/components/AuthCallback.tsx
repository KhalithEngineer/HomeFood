import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract hash from URL if present
        const hashParams = new URLSearchParams(
          location.hash ? location.hash.substring(1) : location.search,
        );

        // If we have an access token in the URL, set it
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });

          if (error) throw error;
          if (data.session) {
            navigate("/", { replace: true });
            return;
          }
        }

        // If no access token in URL, try to get the session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          navigate("/", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/login", { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
