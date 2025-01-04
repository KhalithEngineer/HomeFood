import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChefHat, CalendarDays } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MealCardProps {
  imageUrl?: string;
  title?: string;
  chefName?: string;
  chefId?: string;
  cuisineType?: string;
  price?: number;
  rating?: number;
  onSubscribeClick?: () => void;
}

const MealCard = ({
  imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  title = "Homemade Pasta Carbonara",
  chefName = "Maria Garcia",
  chefId = "1",
  cuisineType = "Italian",
  price = 299,
  rating = 4.5,
  onSubscribeClick = () => console.log("Subscribe clicked"),
}: MealCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-[360px] h-auto md:h-[420px] overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <ChefHat className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600 line-clamp-1">{chefName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{cuisineType}</span>
          <span className="text-lg font-bold">₹{price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="w-full sm:flex-1"
                onClick={onSubscribeClick}
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Subscribe to regular meals</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:flex-1"
                onClick={() => navigate(`/chef/${chefId}`)}
              >
                <ChefHat className="w-4 h-4 mr-2" />
                View Chef
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more about the chef</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
