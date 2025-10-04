import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface BusinessCardProps {
  id: string;
  name: string;
  location: string;
  description: string;
}

export function BusinessCard({
  id,
  name,
  location,
  description,
}: BusinessCardProps) {
  return (
    <Link
      href={`/business/${id}`}
      className="block transition-transform hover:scale-[1.02]"
    >
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{location}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
