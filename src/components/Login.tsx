import React from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth";

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1596797038530-2c107229654b)`,
      }}
    >
      <div className="max-w-md w-full space-y-8 p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-gray-900 font-serif">
            HomeTaste
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover authentic Indian home-cooked meals
          </p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-700">
              Connect with local home chefs and enjoy traditional recipes passed
              down through generations
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Button
            variant="outline"
            className="w-full p-6 flex items-center justify-center gap-2 hover:bg-gray-50 text-lg"
            onClick={signInWithGoogle}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
