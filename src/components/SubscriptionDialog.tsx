import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Clock, Calendar } from "lucide-react";
import AddressForm from "./AddressForm";
import { createDeliveryAddress } from "@/lib/auth";

interface SubscriptionDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubscribe?: (
    plan: "day" | "week" | "month",
    cuisineType: string,
    deliveryAddressId: string,
  ) => void;
  cuisineTypes?: string[];
}

const defaultCuisineTypes = [
  "All Cuisines",
  "South Indian",
  "North Indian",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Kerala",
];

const SubscriptionDialog = ({
  open = false,
  onOpenChange,
  onSubscribe = () => console.log("Subscribe clicked"),
  cuisineTypes = defaultCuisineTypes,
}: SubscriptionDialogProps) => {
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedPlan, setSelectedPlan] = useState<
    "day" | "week" | "month" | null
  >(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handlePlanSelect = (plan: "day" | "week" | "month") => {
    setSelectedPlan(plan);
    setShowAddressForm(true);
  };

  const handleAddressSubmit = async (address: {
    addressLine1: string;
    addressLine2: string;
    area: string;
    pincode: string;
    landmark: string;
  }) => {
    try {
      setLoading(true);
      const newAddress = await createDeliveryAddress(address);
      if (selectedPlan) {
        onSubscribe(selectedPlan, selectedCuisine, newAddress.id);
      }
      setShowAddressForm(false);
      if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error("Error creating address:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showAddressForm
              ? "Enter Delivery Address"
              : "Choose Your Meal Plan"}
          </DialogTitle>
          <DialogDescription>
            {showAddressForm
              ? "Please enter your delivery address in Chennai"
              : "Subscribe to get regular homemade meals delivered to your doorstep"}
          </DialogDescription>
        </DialogHeader>

        {showAddressForm ? (
          <AddressForm onSubmit={handleAddressSubmit} loading={loading} />
        ) : (
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
                  onClick={() =>
                    handlePlanSelect(plan.id as "day" | "week" | "month")
                  }
                >
                  Choose Plan
                </Button>
              </div>
            ))}
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">
                Select Cuisine Preference
              </label>
              <Select
                value={selectedCuisine}
                onValueChange={setSelectedCuisine}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
