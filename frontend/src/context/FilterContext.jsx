import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All"); // "All" | "Men" | "Women"
  const [sort, setSort] = useState("newest"); // "newest" | "price_asc" | "price_desc"
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch all distinct categories from backend
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("/products/categories");
        if (res.data?.data) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.log("Categories fetch failed:", err.message);
      }
    };
    fetchCats();
  }, []);

  // Compute number of active filters applied
  const activeFiltersCount =
    (category !== "All" ? 1 : 0) +
    (genderFilter !== "All" ? 1 : 0) +
    (search.trim() !== "" ? 1 : 0) +
    (sort !== "newest" ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setGenderFilter("All");
    setSort("newest");
  };

  return (
    <FilterContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        search,
        setSearch,
        category,
        setCategory,
        genderFilter,
        setGenderFilter,
        sort,
        setSort,
        categories,
        totalProducts,
        setTotalProducts,
        activeFiltersCount,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;