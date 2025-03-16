import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// ✅ Helper Function to Extract Data
const fetchData = async (endpoint) => {
    return axios.get(`${API_URL}${endpoint}/`)
        .then((response) => {
            console.log(`✅ ${endpoint} API Response:`, response.data);  // ✅ Debugging log
            return response.data;  // ✅ Extracts only the data array
        })
        .catch((error) => {
            console.error(`❌ Error fetching ${endpoint}:`, error);
            return [];
        });
};
const handleApiError = (error, functionName) => {
    console.error(`❌ Error in ${functionName}:`, error.response?.data || error);
};

// ✅ Fetch Species from Backend
export const getSpecies = async () => {
    try {
        const response = await axios.get(`${API_URL}species/`);
        console.log("✅ Species API Response:", response.data);  // ✅ Debugging log
        return response.data;
    } catch (error) {
        handleApiError(error, "getSpecies");
        return [];
    }
};

// ✅ Fetch Habitats from Backend
export const getHabitats = async () => {
    try {
        const response = await axios.get(`${API_URL}habitats/`);
        console.log("✅ Habitats API Response:", response.data);  // ✅ Debugging log
        return response.data;
    } catch (error) {
        handleApiError(error, "getHabitats");
        return [];
    }
};

// ✅ Fetch Animals from Backend
export const getAnimals = async () => {
    try {
        const response = await axios.get(`${API_URL}animals/`);
        console.log("✅ Animals API Response:", response.data);  // ✅ Debugging log
        return response.data;
    } catch (error) {
        handleApiError(error, "getAnimals");
        return [];
    }
};

// ✅ Animal API Calls

export const addAnimal = (data) => axios.post(`${API_URL}animals/`, data);
export const deleteAnimal = (id) => axios.delete(`${API_URL}animals/${id}/`);

// ✅ Habitat API Calls

export const addHabitat = (data) => axios.post(`${API_URL}habitats/`, data);
export const deleteHabitat = (id) => axios.delete(`${API_URL}habitats/${id}/`);

// ✅ Species API Calls

export const addSpecies = (data) => axios.post(`${API_URL}species/`, data);
export const deleteSpecies = (id) => axios.delete(`${API_URL}species/${id}/`);

// ✅ Feeding Schedule API Calls
export const getFeedingSchedules = () => fetchData("feeding_schedules");
export const addFeedingSchedule = (data) => axios.post(`${API_URL}feeding_schedules/`, data);
export const deleteFeedingSchedule = (id) => axios.delete(`${API_URL}feeding_schedules/${id}/`);

// ✅ Zookeeper API Calls
export const getZookeepers = () => fetchData("zookeepers");
export const addZookeeper = (data) => axios.post(`${API_URL}zookeepers/`, data);
export const deleteZookeeper = (id) => axios.delete(`${API_URL}zookeepers/${id}/`);
export const getAvailableZookeepers = () => fetchData("zookeepers/available");

// ✅ Care Routine API Calls
export const getCareRoutines = () => fetchData("care_routines");
export const addCareRoutine = (data) => axios.post(`${API_URL}care_routines/`, data);
export const deleteCareRoutine = (id) => axios.delete(`${API_URL}care_routines/${id}/`);

// ✅ Ticket API Calls
export const getTickets = () => fetchData("tickets");
export const addTicket = (data) => axios.post(`${API_URL}tickets/`, data);
export const deleteTicket = (id) => axios.delete(`${API_URL}tickets/${id}/`);

// ✅ Membership API Calls
export const getMembershipTiers = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/membership_tiers/");
        console.log("✅ Membership Tiers API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching membership tiers:", error);
        return [];
    }
};

export const getMemberships = () => axios.get(`${API_URL}memberships/`).then(res => res.data);
export const addMembership = (data) => {
    console.log("📤 Sending Membership Data:", data);  // ✅ Debugging Log
    return axios.post(`${API_URL}memberships/`, data)
        .then((response) => {
            console.log("✅ Membership added successfully:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("❌ Error adding membership:", error.response?.data || error);
            alert("❌ Error: " + JSON.stringify(error.response?.data || error));
        });
};



// ✅ Special Events API Calls
export const getSpecialEvents = () => axios.get(`${API_URL}special_events/`).then(res => res.data);
export const addSpecialEvent = (data) => axios.post(`${API_URL}special_events/`, data);
export const getEventBookings = () => axios.get(`${API_URL}event_bookings/`).then(res => res.data);
export const addEventBooking = (data) => axios.post(`${API_URL}event_bookings/`, data);