export type Role = "MANAGER" | "STORE_KEEPER";

export type User = {
  id: string;
  email: string;
  role: Role;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  updatedAt: string;
};