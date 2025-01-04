import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Calendar, MapPin } from "lucide-react";
import NavMenu from "./NavMenu";

interface DeliveryAddress {
  id: string;
  address_line1: string;
  address_line2: string;
  area: string;
  pincode: string;
  landmark: string;
}

interface Subscription {
  id: string;
  created_at: string;
  period: string;
  price: number;
  active_until: string;
  cuisine_type: string;
  delivery_address: DeliveryAddress;
}

const SubscriptionManage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select(
          `
          *,
          delivery_address:delivery_addresses(*)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (period: string) => {
    switch (period) {
      case "day":
        return <Clock className="w-5 h-5 text-gray-600" />;
      case "week":
        return <CalendarDays className="w-5 h-5" />;
      case "month":
        return <Calendar className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAddress = (address: DeliveryAddress) => {
    const parts = [
      address.address_line1,
      address.address_line2,
      address.area,
      `Chennai - ${address.pincode}`,
    ].filter(Boolean);

    return parts.join(", ");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavMenu />
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Your Subscriptions
          </h1>
          {subscriptions.length === 0 ? (
            <Card>
              <CardContent className="p-6 md:p-8 text-center">
                <p className="text-gray-600 mb-4">
                  You don't have any active subscriptions
                </p>
                <Button onClick={() => window.history.back()}>
                  Browse Meal Plans
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="overflow-hidden">
                  <CardHeader className="bg-orange-50 border-b border-orange-100 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      {getPlanIcon(sub.period)}
                      {sub.period.charAt(0).toUpperCase() +
                        sub.period.slice(1)}{" "}
                      Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Subscribed on</p>
                        <p className="font-medium">
                          {formatDate(sub.created_at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active until</p>
                        <p className="font-medium">
                          {formatDate(sub.active_until)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">₹{sub.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cuisine Type</p>
                        <p className="font-medium">{sub.cuisine_type}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> Delivery Address
                        </p>
                        <p className="font-medium">
                          {formatAddress(sub.delivery_address)}
                        </p>
                        {sub.delivery_address.landmark && (
                          <p className="text-sm text-gray-500 mt-1">
                            Landmark: {sub.delivery_address.landmark}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p
                          className={`font-medium ${new Date(sub.active_until) > new Date() ? "text-green-600" : "text-red-600"}`}
                        >
                          {new Date(sub.active_until) > new Date()
                            ? "Active"
                            : "Expired"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManage;
