import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Get token from localStorage (if available)
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Token ${token}` } : {};
};

// Authentication
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, { username, password });
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, { username, password, role });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// ANIMALS
export const fetchAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Fetching animals failed:", error.response?.data || error.message);
    throw error;
  }
};

export const addAnimal = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/animals/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Adding animal failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateAnimal = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/animals/${id}/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Updating animal failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/animals/${id}/`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Deleting animal failed:", error.response?.data || error.message);
    throw error;
  }
};

// HABITATS
export const fetchHabitats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/habitats/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Fetching habitats failed:", error.response?.data || error.message);
    throw error;
  }
};

export const addHabitat = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/habitats/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Adding habitat failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateHabitat = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/habitats/${id}/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Updating habitat failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteHabitat = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/habitats/${id}/`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Deleting habitat failed:", error.response?.data || error.message);
    throw error;
  }
};

// SPECIES
export const fetchSpecies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/species/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Fetching species failed:", error.response?.data || error.message);
    throw error;
  }
};

export const addSpecies = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/species/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Adding species failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateSpecies = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/species/${id}/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Updating species failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSpecies = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/species/${id}/`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Deleting species failed:", error.response?.data || error.message);
    throw error;
  }
};

// FEEDING SCHEDULES
export const fetchFeedingSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feeding_schedules/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Fetching feeding schedules failed:", error.response?.data || error.message);
    throw error;
  }
};

export const addFeedingSchedule = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feeding_schedules/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Adding feeding schedule failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateFeedingSchedule = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/feeding_schedules/${id}/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Updating feeding schedule failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteFeedingSchedule = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/feeding_schedules/${id}/`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Deleting feeding schedule failed:", error.response?.data || error.message);
    throw error;
  }
};

// TICKETS
export const fetchTickets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Fetching tickets failed:", error.response?.data || error.message);
    throw error;
  }
};

export const addTicket = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets/`, data, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Adding ticket failed:", error.response?.data || error.message);
    throw error;
  }
};
