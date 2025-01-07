import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Exchange the OAuth code for a session
    const handleAuthRedirect = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          // Handle error (e.g., show an error message or redirect)
          navigate("/error", { replace: true });
          return;
        }

        // If session exists, redirect to home
        if (data.session) {
          console.log("Session retrieved:", data.session);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate("/error", { replace: true });
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
