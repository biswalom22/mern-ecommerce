import axios, { AxiosResponse } from 'axios';
import { CartItem } from './context/CartContext';
import { Product } from './types/Product';

const API_BASE_URL = 'http://localhost:4000/api'; 

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response : AxiosResponse<Product[]> = await apiClient.get('/products');
  return response.data;
};

export const fetchProductById = async (id: any): Promise<Product> => {
  const response : AxiosResponse<Product> = await apiClient.get(`/products/${id}`);
  return response.data;
}

export const setAuthToken = (token: any | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const loginUser = async (credentials: { identifier: any; password: any }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData: {
  name: any;
  emailOrPhone: any;
  password: any;
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

export const addToCart = async (cartData: CartItem) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, cartData);
  return response.data
}

export const fetchCartItems = async (userId: any) => {
  const response = await apiClient.get(`/cart/${userId}`);
  return response.data; // Return the cart data
};

// Remove an item from the cart
export const removeFromCart = async (itemId: any, userId: any) => {
  const response = await apiClient.delete(`/cart/${itemId}`, { params: { userId } });
  return response.data; // Return the updated cart data
};

// Clear all cart items for a user
export const clearCart = async (userId: any) => {
  const response = await apiClient.delete(`/cart/user/${userId}`);
  return response.data; // Return the cleared cart (empty array)
};

export const createCheckoutSession = async (userId: string, cartItems: any[]) => {
  const response = await axios.post(`${API_BASE_URL}/payment/create-checkout-session`, {
    userId,
    cartItems,
  });
  return response.data.sessionId;
};
