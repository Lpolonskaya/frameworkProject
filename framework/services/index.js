import TicketClient from './kassa.service';


const api = () => ({
  TicketClient: () => ({ ...TicketClient }),
});
export default api;


