import { Product } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};