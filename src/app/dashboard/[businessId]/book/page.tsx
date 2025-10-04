"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { TimeSlotPicker } from "@/components/sections/time-slot-picker";
import { PaymentPopup } from "@/components/sections/payment-popup";

interface Business {
  id: string;
  name: string;
  BusinessInfo: {
    location: string;
    description: string;
  } | null;
}

interface Service {
  id: string;
  name: string;
  rate: number;
}

interface BookingPageProps {
  params: Promise<{ businessId: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const { businessId } = use(params);
  const router = useRouter();

  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [businessRes, servicesRes] = await Promise.all([
          fetch(`/api/business/${businessId}`),
          fetch(`/api/business/${businessId}/services`),
        ]);

        if (businessRes.ok) {
          const businessData = await businessRes.json();
          setBusiness(businessData);
        }

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [businessId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are selected
    if (!selectedDate || !selectedTime || !selectedService) {
      alert("Please select a date, time, and service before booking.");
      return;
    }

    // Show payment popup
    setShowPayment(true);
  };

  const isFormValid = selectedDate && selectedTime && selectedService;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-muted-foreground text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-muted-foreground text-center">
            Business not found.
          </p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="mx-auto mt-4 block"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          ← Back to Dashboard
        </Button>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{business.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              {business.BusinessInfo?.location || "Location not specified"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {business.BusinessInfo?.description || "No description available"}
            </p>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>
                Select a date, time, and service to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Service</label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.length === 0 ? (
                      <div className="text-muted-foreground p-2 text-sm">
                        No services available
                      </div>
                    ) : (
                      services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.rate.toFixed(2)}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <div className="flex justify-center rounded-lg border p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Payment Popup */}
        <PaymentPopup open={showPayment} onOpenChange={setShowPayment} />
      </div>
    </div>
  );
}
