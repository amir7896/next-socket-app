import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API}/login`, data);
  return response.data;
};

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(`${API}/register`, data);
  return response.data;
};
