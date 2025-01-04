import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Award, Clock } from "lucide-react";
import NavMenu from "./NavMenu";

interface Chef {
  id: string;
  name: string;
  bio: string;
  profile_image: string;
  cuisine_specialties: string[];
  years_of_experience: number;
  rating: number;
  total_reviews: number;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  is_veg: boolean;
}

interface WeeklyMenu {
  day_of_week: string;
  items: MenuItem[];
}

const ChefProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [chef, setChef] = useState<Chef | null>(null);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChefDetails();
  }, [id]);

  const fetchChefDetails = async () => {
    try {
      // Fetch chef details
      const { data: chefData, error: chefError } = await supabase
        .from("chefs")
        .select("*")
        .eq("id", id)
        .single();

      if (chefError) throw chefError;

      // Fetch weekly menu
      const { data: menuData, error: menuError } = await supabase
        .from("weekly_menu")
        .select("*")
        .eq("chef_id", id)
        .order("day_of_week");

      if (menuError) throw menuError;

      setChef(chefData);
      setWeeklyMenu(menuData || []);
    } catch (error) {
      console.error("Error fetching chef details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading chef details...</p>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chef not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavMenu />
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Chef Profile Header */}
        <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-100 to-orange-50">
            <img
              src={
                chef.profile_image ||
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
              }
              alt={chef.name}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="pt-20 md:pt-24 px-6 pb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{chef.name}</h1>
            <div className="flex items-center justify-center gap-4 mb-4 text-gray-600">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                {chef.rating} ({chef.total_reviews} reviews)
              </span>
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                {chef.years_of_experience}+ years experience
              </span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{chef.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {chef.cuisine_specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> Weekly Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Sunday" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <TabsTrigger key={day} value={day} className="flex-1">
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              {weeklyMenu.map((menu) => (
                <TabsContent key={menu.day_of_week} value={menu.day_of_week}>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {menu.items.map((item, index) => (
                      <Card key={index}>
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="object-cover rounded-t-lg w-full h-48"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            {item.is_veg ? (
                              <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                                Veg
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                                Non-veg
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChefProfile;
