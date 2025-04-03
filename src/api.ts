import axios, { AxiosResponse } from "axios";
import { CartItem } from "./context/CartContext";
import { Product } from "./types/Product";

const API_BASE_URL = "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response: AxiosResponse<Product[]> = await apiClient.get("/products");
  return response.data;
};

export const fetchProductById = async (id: any): Promise<Product> => {
  const response: AxiosResponse<Product> = await apiClient.get(
    `/products/${id}`
  );
  return response.data;
};

export const setAuthToken = (token: any | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const loginUser = async (credentials: {
  identifier: any;
  password: any;
}) => {
  const response = await apiClient.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData: {
  name: any;
  emailOrPhone: any;
  password: any;
}) => {
  const response = await apiClient.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

export const addToCart = async (cartData: CartItem) => {
  const response = await apiClient.post(`${API_BASE_URL}/cart`, cartData);
  return response.data;
};

export const apiUpdateCartItem = async (itemId: any, updatedItem: any) => {
  const response = await apiClient.put(`/cart/${itemId}`, updatedItem);
  return response.data;
};

export const fetchCartItems = async (userId: any) => {
  const response = await apiClient.get(`/cart/${userId}`);
  return response.data; 
};

export const removeFromCart = async (itemId: any, userId: any) => {
  const response = await apiClient.delete(`/cart/${itemId}`, {
    params: { userId },
  });
  return response.data;
};

export const clearCart = async (userId: any) => {
  const response = await apiClient.delete(`/cart/user/${userId}`);
  return response.data; 
};

export const createCheckoutSession = async (
  userId: string,
  cartItems: any[]
) => {
  const response = await apiClient.post(
    `${API_BASE_URL}/payment/create-checkout-session`,
    {
      userId,
      cartItems,
    }
  );
  return response.data.sessionId;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await apiClient.get(
    "/products/categories"
  );
  return response.data;
};

export const fetchColors = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await apiClient.get(
    "/products/colors"
  );
  return response.data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await apiClient.get(
    "/products/brands"
  );
  return response.data;
};

// Fetch filtered products
// Fetch filtered products with pagination
export const fetchFilteredProducts = async (
  filters: { category?: string; color?: string; brand?: string },
  page: number = 1,
  limit: number = 10
): Promise<any> => {
  const queryParams = new URLSearchParams();
  if (filters.category) queryParams.append("category", filters.category);
  if (filters.color) queryParams.append("color", filters.color);
  if (filters.brand) queryParams.append("brand", filters.brand);
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  const url = `/products?${queryParams.toString()}`;
  const response: AxiosResponse<any> = await apiClient.get(url);
  return response.data;
};
