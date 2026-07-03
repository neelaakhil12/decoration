"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [location, setLocation] = useState({ city: "Mumbai", address: "Mumbai Metro" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const addToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const selectLocation = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <AppContext.Provider
      value={{
        location,
        selectLocation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cartCount,
        addToCart,
        isLocationOpen,
        setIsLocationOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
