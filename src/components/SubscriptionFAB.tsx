import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SubscriptionFABProps {
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const SubscriptionFAB = ({
  onClick = () => console.log("Subscription FAB clicked"),
  position = "bottom-right",
}: SubscriptionFABProps) => {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-white`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-orange-600 hover:bg-orange-700"
              onClick={onClick}
            >
              <CalendarDays className="h-8 w-8 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Subscribe to meal plans</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SubscriptionFAB;
