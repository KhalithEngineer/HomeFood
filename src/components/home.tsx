import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import MealGrid from "./MealGrid";
import SubscriptionFAB from "./SubscriptionFAB";
import SubscriptionDialog from "./SubscriptionDialog";
import NavMenu from "./NavMenu";
import { supabase } from "@/lib/supabase";

interface HomePageProps {
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
  onSubscribe = (plan, cuisineType, deliveryAddressId) =>
    console.log("Subscribe clicked", plan, cuisineType, deliveryAddressId),
}: HomePageProps) => {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all cuisines");
  const [selectedDiet, setSelectedDiet] = useState("all diets");

  useEffect(() => {
    fetchChefData();
  }, []);

  useEffect(() => {
    filterMeals();
  }, [searchTerm, selectedCuisine, selectedDiet, allMeals]);

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
          chef.featured_image_url ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        title: `${chef.cuisine_specialties[0]} Special Thali`,
        chefName: chef.name,
        chefId: chef.id,
        cuisineType: chef.cuisine_specialties[0],
        price: 299,
        rating: chef.rating,
      }));

      setAllMeals(transformedMeals);
      setFilteredMeals(transformedMeals);
    } catch (error) {
      console.error("Error fetching chef data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMeals = () => {
    let filtered = [...allMeals];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (meal) =>
          meal.title.toLowerCase().includes(searchLower) ||
          meal.chefName.toLowerCase().includes(searchLower) ||
          meal.cuisineType.toLowerCase().includes(searchLower),
      );
    }

    // Apply cuisine filter
    if (selectedCuisine !== "all cuisines") {
      filtered = filtered.filter(
        (meal) =>
          meal.cuisineType.toLowerCase() === selectedCuisine.toLowerCase(),
      );
    }

    // Apply dietary filter (you might want to add a vegetarian/non-vegetarian field to your chefs table)
    if (selectedDiet !== "all diets") {
      // This is a placeholder. You'll need to add dietary information to your database
      filtered = filtered.filter((meal) => {
        // Example implementation - you should modify this based on your actual data structure
        if (selectedDiet.toLowerCase() === "vegetarian") {
          return (
            meal.cuisineType.toLowerCase().includes("gujarati") ||
            meal.cuisineType.toLowerCase().includes("jain")
          );
        }
        return true;
      });
    }

    setFilteredMeals(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  const handleDietaryFilter = (preferences: string[]) => {
    setSelectedDiet(preferences[0]);
  };

  const handleSubscribeClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setSubscriptionDialogOpen(true);
  };

  const handleSubscribe = (
    plan: "day" | "week" | "month",
    cuisineType: string,
    deliveryAddressId: string,
  ) => {
    if (selectedMeal) {
      onSubscribe(plan, selectedMeal.cuisineType, deliveryAddressId);
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
        onSearch={handleSearch}
        onCuisineFilter={handleCuisineFilter}
        onDietaryFilter={handleDietaryFilter}
      />
      <MealGrid
        meals={filteredMeals}
        onSubscribeClick={(meal) => handleSubscribeClick(meal)}
      />
      <SubscriptionFAB
        onClick={() => {
          if (filteredMeals.length > 0) {
            handleSubscribeClick(filteredMeals[0]);
          }
        }}
      />
      <SubscriptionDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
        onSubscribe={handleSubscribe}
        cuisineTypes={[selectedMeal?.cuisineType || "All Cuisines"]}
      />
    </div>
  );
};

export default HomePage;
