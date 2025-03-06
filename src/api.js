import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// ✅ Animal API Calls
export const getAnimals = () => axios.get(`${API_URL}animals/`);
export const addAnimal = (data) => axios.post(`${API_URL}animals/`, data);
export const deleteAnimal = (id) => axios.delete(`${API_URL}animals/${id}/`);

// ✅ Habitat API Calls
export const getHabitats = () => axios.get(`${API_URL}habitats/`);
export const addHabitat = (data) => axios.post(`${API_URL}habitats/`, data);
export const deleteHabitat = (id) => axios.delete(`${API_URL}habitats/${id}/`);

// ✅ Species API Calls
export const getSpecies = () => axios.get(`${API_URL}species/`);
export const addSpecies = (data) => axios.post(`${API_URL}species/`, data);
export const deleteSpecies = (id) => axios.delete(`${API_URL}species/${id}/`);

// ✅ Feeding Schedule API Calls
export const getFeedingSchedules = () => axios.get(`${API_URL}feeding_schedules/`);
export const addFeedingSchedule = (data) => axios.post(`${API_URL}feeding_schedules/`, data);
export const deleteFeedingSchedule = (id) => axios.delete(`${API_URL}feeding_schedules/${id}/`);

// ✅ Ensure Ticket API Functions Are Defined & Exported
export const getTickets = () => axios.get(`${API_URL}tickets/`);
export const addTicket = (data) => axios.post(`${API_URL}tickets/`, data);
export const deleteTicket = (id) => axios.delete(`${API_URL}tickets/${id}/`);