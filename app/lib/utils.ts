import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const verifyPlural = (
  value: number,
  custom?: {
    plural: string;
    singular: string;
  }
) => (value > 1 ? custom?.plural || "s" : custom?.singular || "s");

const formattedDate = (createdAt: Date) => {
  const diff = new Date().getTime() - createdAt.getTime();

  const actualYear = new Date().getFullYear();

  const year = createdAt.getFullYear();

  const month = createdAt.toLocaleString("pt-BR", { month: "long" });

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor(diff / (1000 * 60));

  const seconds = Math.floor(diff / 1000);

  if (days >= 365) {
    const years = Math.floor(days / 365);

    return `${days} ${month}, ${year}`;
  }

  if (days >= 30) {
    const months = Math.floor(days / 30);

    return `${days} ${month}${actualYear > year ? `, ${year}` : ""}`;
  }

  if (days >= 7) {
    const weeks = Math.floor(days / 7);

    return `${weeks} week${verifyPlural(weeks)}`;
  }

  if (days > 1) {
    return `${days}d`;
  }

  if (hours >= 1) {
    return `${hours}h`;
  }

  if (minutes > 1) {
    return `${minutes} min`;
  }

  if (seconds > 1 && seconds < 60) {
    return `${seconds} sec`;
  }

  return "agora";
};

export { formattedDate, cn };
