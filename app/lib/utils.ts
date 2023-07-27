const verifyPlural = (
  value: number,
  custom?: {
    plural: string;
    singular: string;
  }
) => (value > 1 ? custom?.plural || "s" : custom?.singular || "s");

const formattedDate = (createdAt: Date) => {
  const diff = new Date().getTime() - createdAt.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor(diff / (1000 * 60));

  const seconds = Math.floor(diff / 1000);

  if (days >= 365) {
    const years = Math.floor(days / 365);

    return `há ${years} ano${verifyPlural(years)}`;
  }

  if (days >= 30) {
    const months = Math.floor(days / 30);

    return `há ${months} m${verifyPlural(months, {
      plural: "eses",
      singular: "ês",
    })}`;
  }

  if (days >= 7) {
    const weeks = Math.floor(days / 7);

    return `há ${weeks} semana${verifyPlural(weeks)}`;
  }

  if (days > 1) {
    return `há ${days} dia${verifyPlural(days)}`;
  }

  if (hours > 1) {
    return `há ${hours} hora${verifyPlural(hours)}`;
  }

  if (minutes > 1) {
    return `há ${minutes} minuto${verifyPlural(minutes)}`;
  }

  if (seconds > 1) {
    return `há ${seconds} segundo${verifyPlural(seconds)}`;
  }

  return "agora";
};

export { formattedDate };
