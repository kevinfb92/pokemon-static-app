export const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");

  favorites.includes(id)
    ? (favorites = favorites.filter((item) => item !== id))
    : favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return favorites.includes(id);
};

export const getFavorites = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};
