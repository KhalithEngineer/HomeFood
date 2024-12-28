import React from "react";
import MealCard from "./MealCard";

interface MealGridProps {
  meals?: Array<{
    id: string;
    imageUrl: string;
    title: string;
    chefName: string;
    cuisineType: string;
    price: number;
    rating: number;
  }>;
  onSubscribeClick?: () => void;
}

const MealGrid = ({
  meals = [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      title: "Homemade Pasta Carbonara",
      chefName: "Maria Garcia",
      cuisineType: "Italian",
      price: 299,
      rating: 4.5,
    },
  ],
  onSubscribeClick,
}: MealGridProps) => {
  return (
    <div className="w-full min-h-[702px] bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            imageUrl={meal.imageUrl}
            title={meal.title}
            chefName={meal.chefName}
            cuisineType={meal.cuisineType}
            price={meal.price}
            rating={meal.rating}
            onSubscribeClick={onSubscribeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MealGrid;
