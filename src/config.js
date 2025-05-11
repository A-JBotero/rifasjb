const API_BASE_URL = "http://localhost:5026";

const BASE_RAFFLE = `${API_BASE_URL}/Raffle`;
const BASE_TICKET = `${API_BASE_URL}/Ticket`;
const BASE_APPLICATION_PROCESSING = `${API_BASE_URL}/ApplicationProcessing`;

export const ENDPOINTS = {
    RAFFLE: {
        GET_ALL: `${BASE_RAFFLE}`,
        DELETE: (id) => `${BASE_RAFFLE}/?id=${id}`,
        UPDATE: `${BASE_RAFFLE}`,
    },
    TICKET: {
        GET_TICKETS_BY_RAFFLE: (raffleId) => `${BASE_TICKET}/GetTicketsByRaffle/${raffleId}`,
        UPDATE_TICKET_STATE: `${BASE_TICKET}/UpdateTicketState`,
    },
    APPLICATION_PROCESSING: {
        REGISTER_RAFFLE: `${BASE_APPLICATION_PROCESSING}/RegisterRaffle`,       
        BUY_TICKET: `${BASE_APPLICATION_PROCESSING}/BuyTicket`,
    },
};

export default API_BASE_URL;