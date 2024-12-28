import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      navigate("/", { replace: true });
    });
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
