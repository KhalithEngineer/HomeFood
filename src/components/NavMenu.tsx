import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserName(user?.user_metadata?.full_name || "");
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="font-serif text-xl font-bold">
            HomeTaste
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {userName && (
              <span className="text-gray-700 px-3 py-2 text-sm font-medium">
                Welcome, {userName}
              </span>
            )}
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/subscriptions"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Subscriptions
            </Link>
            <Button variant="ghost" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            {userName && (
              <div className="px-3 py-2 text-sm font-medium text-gray-700">
                Welcome, {userName}
              </div>
            )}
            <div className="flex flex-col space-y-2 py-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/subscriptions"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscriptions
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut();
                }}
                className="justify-start"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
