import mealIcon from "@/assets/icons/meal.png";
import communityIcon from "@/assets/icons/community.png";
import eventsIcon from "@/assets/icons/events.png";
import { StaticImageData } from "next/image";

export const perks: {
  icon: StaticImageData;
  textAlt: string;
  textP: string;
}[] = [
  {
    icon: mealIcon,
    textAlt: "Share & discover recipes",
    textP: "Share & discover recipes",
  },
  {
    icon: communityIcon,
    textAlt: "Find new friends & like-minded people",
    textP: "Find new friends & like-minded people",
  },
  {
    icon: eventsIcon,
    textAlt: "Participate in exclusive events",
    textP: "Participate in exclusive events",
  },
];
