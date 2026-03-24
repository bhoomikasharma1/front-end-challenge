import { Product } from "@/types";

export const initialProducts: Product[] = [
  {
    id: "P-1001",
    name: "Arabica Coffee Beans",
    category: "Beverages",
    quantity: 42,
    unit: "bags",
    price: 1299,
    updatedAt: "2026-03-24",
  },
  {
    id: "P-1002",
    name: "Cold-Pressed Sunflower Oil",
    category: "Cooking",
    quantity: 18,
    unit: "cans",
    price: 2299,
    updatedAt: "2026-03-23",
  },
  {
    id: "P-1003",
    name: "Organic Brown Rice",
    category: "Grains",
    quantity: 67,
    unit: "packs",
    price: 499,
    updatedAt: "2026-03-21",
  },
];