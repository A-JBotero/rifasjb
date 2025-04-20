const API_BASE_URL = "http://localhost:5026";

const BASE_RAFFLE = `${API_BASE_URL}/Raffle`;
const BASE_TICKET = `${API_BASE_URL}/Ticket`;

export const ENDPOINTS = {
    RAFFLE: {
        GET_ALL: `${BASE_RAFFLE}`,
        REGISTER: `${BASE_RAFFLE}/RegisterRaffle`,
        DELETE: (id) => `${BASE_RAFFLE}/?id=${id}`,
        UPDATE: `${BASE_RAFFLE}`,
    },
    TICKET: {
        GET_TICKETS_BY_RAFFLE: (raffleId) => `${BASE_TICKET}/GetTicketsByRaffle/${raffleId}`,
        UPDATE_TICKET_STATE: `${BASE_TICKET}/UpdateTicketState`,
        BUY_TICKET: `${BASE_TICKET}/BuyTicket`,
    },
};

export default API_BASE_URL;