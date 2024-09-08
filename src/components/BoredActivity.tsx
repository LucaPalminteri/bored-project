"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { activityTypes } from "@/data/activityTypes";
import { Activity } from "@/types/Activity";

export default function BoredActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const url =
        selectedType !== "all"
          ? `https://bored-api.appbrewery.com/filter?type=${selectedType}`
          : "https://bored-api.appbrewery.com/random";
      const response = await fetch(url);
      const data = await response.json();
      setActivity(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Bored? Try This!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any type</SelectItem>
              {activityTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={fetchActivity} className="w-full text-lg py-6" disabled={loading}>
            {loading ? "Finding Activity..." : "Get Random Activity"}
          </Button>

          {activity && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{activity.activity}</h2>
              <p>
                <strong>Type:</strong> {activity.type}
              </p>
              <p>
                <strong>Participants:</strong> {activity.participants}
              </p>
              <p>
                <strong>Price:</strong> {activity.price}
              </p>
              <p>
                <strong>Accessibility:</strong> {activity.accessibility}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
