import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import SubscriptionManage from "./components/SubscriptionManage";
import routes from "tempo-routes";
import { supabase } from "./lib/supabase";
import { createSubscription } from "./lib/auth";
import AuthCallback from "./components/AuthCallback";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribe = async (plan: "day" | "week" | "month") => {
    try {
      if (!user) {
        toast({
          title: "Please login",
          description: "You need to be logged in to subscribe",
          variant: "destructive",
        });
        return;
      }

      await createSubscription(user.id, plan);
      toast({
        title: "Subscription successful!",
        description: `You have successfully subscribed to the ${plan} plan.`,
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription.",
        variant: "destructive",
      });
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home onSubscribe={handleSubscribe} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/subscriptions"
            element={
              user ? <SubscriptionManage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
