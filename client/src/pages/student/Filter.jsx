import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Filter as FilterIcon, ArrowUpDown } from "lucide-react";
import React, { useState } from "react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-72 bg-card dark:bg-[#151821] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 h-fit">
      
      {/* Filter Header & Sorter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
          <FilterIcon className="w-4 h-4 text-[#FF5533]" />
          <span>Filter & Sort</span>
        </div>

        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <SelectValue placeholder="Sort by Price" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card dark:bg-[#151821] border-slate-200 dark:border-slate-800">
            <SelectGroup>
              <SelectLabel className="text-xs text-slate-400">Price Order</SelectLabel>
              <SelectItem value="low" className="text-xs">Price: Low to High</SelectItem>
              <SelectItem value="high" className="text-xs">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-slate-200 dark:bg-slate-800" />

      {/* Category Checkboxes */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="data-[state=checked]:bg-[#FF5533] data-[state=checked]:border-[#FF5533] border-slate-300 dark:border-slate-700"
              />
              <Label
                htmlFor={category.id}
                className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer flex-1"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Filter;

