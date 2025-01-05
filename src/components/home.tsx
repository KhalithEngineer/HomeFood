import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import MealGrid from "./MealGrid";
import SubscriptionFAB from "./SubscriptionFAB";
import SubscriptionDialog from "./SubscriptionDialog";
import NavMenu from "./NavMenu";
import { supabase } from "@/lib/supabase";

interface HomePageProps {
  onSearch?: (term: string) => void;
  onCuisineFilter?: (cuisine: string) => void;
  onDietaryFilter?: (preferences: string[]) => void;
  onSubscribe?: (
    plan: "day" | "week" | "month",
    cuisineType: string,
    deliveryAddressId: string,
  ) => void;
}

interface Meal {
  id: string;
  imageUrl: string;
  title: string;
  chefName: string;
  chefId: string;
  cuisineType: string;
  price: number;
  rating: number;
}

const HomePage = ({
  onSearch = () => console.log("Search triggered"),
  onCuisineFilter = () => console.log("Cuisine filter changed"),
  onDietaryFilter = () => console.log("Dietary preferences changed"),
  onSubscribe = (plan, cuisineType, deliveryAddressId) =>
    console.log("Subscribe clicked", plan, cuisineType, deliveryAddressId),
}: HomePageProps) => {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChefData();
  }, []);

  const fetchChefData = async () => {
    try {
      const { data: chefs, error } = await supabase
        .from("chefs")
        .select("*")
        .order("rating", { ascending: false });

      if (error) throw error;

      // Transform chef data into meal data
      const transformedMeals = chefs.map((chef) => ({
        id: chef.id,
        imageUrl:
          "https://images.unsplash.com/photo-1589301760014-d929f3979dbc", // You can add this to chef table if needed
        title: `${chef.cuisine_specialties[0]} Special Thali`,
        chefName: chef.name,
        chefId: chef.id,
        cuisineType: chef.cuisine_specialties[0],
        price: 299, // You can add this to chef table if needed
        rating: chef.rating,
      }));

      setMeals(transformedMeals);
    } catch (error) {
      console.error("Error fetching chef data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <NavMenu />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p>Loading meals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavMenu />
      <HeroSection
        onSearch={onSearch}
        onCuisineFilter={onCuisineFilter}
        onDietaryFilter={onDietaryFilter}
      />
      <MealGrid
        meals={meals}
        onSubscribeClick={() => setSubscriptionDialogOpen(true)}
      />
      <SubscriptionFAB onClick={() => setSubscriptionDialogOpen(true)} />
      <SubscriptionDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
        onSubscribe={onSubscribe}
      />
    </div>
  );
};

export default HomePage;
