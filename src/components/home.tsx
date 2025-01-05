import React, { useState } from "react";
import HeroSection from "./HeroSection";
import MealGrid from "./MealGrid";
import SubscriptionFAB from "./SubscriptionFAB";
import SubscriptionDialog from "./SubscriptionDialog";
import NavMenu from "./NavMenu";

interface HomePageProps {
  onSearch?: (term: string) => void;
  onCuisineFilter?: (cuisine: string) => void;
  onDietaryFilter?: (preferences: string[]) => void;
  onSubscribe?: (
    plan: "day" | "week" | "month",
    cuisineType: string,
    deliveryAddressId: string,
  ) => void;
  meals?: Array<{
    id: string;
    imageUrl: string;
    title: string;
    chefName: string;
    cuisineType: string;
    price: number;
    rating: number;
  }>;
}

const HomePage = ({
  onSearch = () => console.log("Search triggered"),
  onCuisineFilter = () => console.log("Cuisine filter changed"),
  onDietaryFilter = () => console.log("Dietary preferences changed"),
  onSubscribe = (plan, cuisineType, deliveryAddressId) =>
    console.log("Subscribe clicked", plan, cuisineType, deliveryAddressId),
  meals = [
    {
      id: "41d37a76-5a8f-4ea3-9289-0a8294ead643",
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      title: "South Indian Thali",
      chefName: "Lakshmi Iyer",
      cuisineType: "South Indian",
      price: 299,
      rating: 4.8,
    },
    {
      id: "51072b55-8b60-433a-a9a2-f0d4836242e9",
      imageUrl: "https://images.unsplash.com/photo-1628294895950-9805252327bc",
      title: "Rajasthani Royal Thali",
      chefName: "Priya Sharma",
      cuisineType: "Rajasthani",
      price: 349,
      rating: 4.9,
    },
    {
      id: "9e5814c6-2129-4cdb-beb4-6097d7d0e48a",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
      title: "Bengali Fish Curry Meal",
      chefName: "Riya Sen",
      cuisineType: "Bengali",
      price: 329,
      rating: 4.7,
    },
    {
      id: "6c6ae651-32b9-46fe-9b5a-3ba1a25dc8ac",
      imageUrl: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db",
      title: "Gujarati Thali Special",
      chefName: "Meera Patel",
      cuisineType: "Gujarati",
      price: 299,
      rating: 4.6,
    },
    {
      id: "848ed427-d081-4c2f-9ead-924c3b90ba90",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      title: "Kerala Sadhya",
      chefName: "Anjali Menon",
      cuisineType: "Kerala",
      price: 319,
      rating: 4.8,
    },
    {
      id: "4d37d555-e77e-49d2-859e-94371c44cc16",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      title: "Punjabi Thali",
      chefName: "Harpreet Kaur",
      cuisineType: "Punjabi",
      price: 329,
      rating: 4.7,
    },
  ],
}: HomePageProps) => {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavMenu />
      <HeroSection
        onSearch={onSearch}
        onCuisineFilter={onCuisineFilter}
        onDietaryFilter={onDietaryFilter}
      />
      <MealGrid
        meals={meals.map(meal => ({...meal, chefId: meal.id}))}
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
