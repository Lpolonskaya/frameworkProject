import supertest from 'supertest';
import urls from '../config/urls';

const KassaOrderEdit = {
  getOrderSold: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.sold&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getOrderReturn: async (auth, params, ticketId) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.return&auth=` + auth + `&ticket[` + ticketId + `]=` + ticketId +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getOrderCancel: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.cancel&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getTicketRemove: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.ticket.remove&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
};

export default KassaOrderEdit;
