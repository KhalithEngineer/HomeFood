import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Calendar } from "lucide-react";

interface SubscriptionDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubscribe?: (plan: "day" | "week" | "month") => void;
}

const plans = [
  {
    id: "day",
    name: "Trial Day",
    price: "₹299",
    description: "Try our service for a day",
    icon: Clock,
  },
  {
    id: "week",
    name: "1 Week Plan",
    price: "₹1,499",
    description: "Perfect for a week of delicious meals",
    icon: CalendarDays,
  },
  {
    id: "month",
    name: "1 Month Plan",
    price: "₹4,999",
    description: "Our most popular plan",
    icon: Calendar,
    popular: true,
  },
];

const SubscriptionDialog = ({
  open = false,
  onOpenChange,
  onSubscribe = () => console.log("Subscribe clicked"),
}: SubscriptionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Meal Plan</DialogTitle>
          <DialogDescription>
            Subscribe to get regular homemade meals delivered to your doorstep
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-4 rounded-lg border ${plan.popular ? "border-orange-600 bg-orange-50" : "border-border"}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <plan.icon className="w-4 h-4" />
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{plan.price}</p>
                  {plan.popular && (
                    <span className="text-xs text-orange-600 font-medium">
                      Most Popular
                    </span>
                  )}
                </div>
              </div>
              <Button
                className={`w-full ${plan.popular ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                onClick={() => onSubscribe(plan.id as "day" | "week" | "month")}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
