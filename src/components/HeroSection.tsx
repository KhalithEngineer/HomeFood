import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (term: string) => void;
  onCuisineFilter?: (cuisine: string) => void;
  onDietaryFilter?: (preferences: string[]) => void;
}

const HeroSection = ({
  onSearch = () => console.log("Search triggered"),
  onCuisineFilter = () => console.log("Cuisine filter changed"),
  onDietaryFilter = () => console.log("Dietary preferences changed"),
}: HeroSectionProps) => {
  const cuisineTypes = [
    "All Cuisines",
    "South Indian",
    "North Indian",
    "Rajasthani",
    "Bengali",
    "Gujarati",
    "Punjabi",
    "Kerala",
  ];

  const dietaryPreferences = [
    "All Diets",
    "Vegetarian",
    "Pure Veg",
    "Jain",
    "Non-Vegetarian",
    "Halal",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-orange-50 to-white px-4 py-6 md:py-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Discover Authentic Indian Home-Cooked Meals
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Find delicious regional Indian cuisine cooked with love by local
            home chefs
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-stretch md:items-center justify-center">
          <div className="relative w-full md:w-1/2 lg:w-2/5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for dishes or regional cuisines..."
              className="pl-10 pr-4 h-10 md:h-12 w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Select onValueChange={onCuisineFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-10 md:h-12">
                <SelectValue placeholder="Regional Cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => onDietaryFilter([value])}>
              <SelectTrigger className="w-full md:w-[180px] h-10 md:h-12">
                <SelectValue placeholder="Dietary Preferences" />
              </SelectTrigger>
              <SelectContent>
                {dietaryPreferences.map((diet) => (
                  <SelectItem key={diet} value={diet.toLowerCase()}>
                    {diet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="h-10 md:h-12 w-12 hidden md:flex"
              onClick={() => console.log("Additional filters clicked")}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
