import supertest from 'supertest';
import urls from '../config/urls';

const TicketClient = {
  get_login: async (auth) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=login&auth=` + auth).set('Content-Type', 'application/json');
    return r;
  },
  get_cities: async (auth) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=city.list&auth=` + auth).set('Content-Type', 'application/json');
    return r;
  },
  get_events: async (params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=event.list&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_event_info: async (params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=event.info&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_places: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=sector.places&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_cart_add: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=cart.add&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_cart_remove: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=cart.remove&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_order_make: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.make&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_order_sold: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.sold&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_order_info: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.info&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_order_return: async (auth, params, ticketId) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.return&auth=` + auth + `&ticket[` + ticketId + `]=` + ticketId +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_order_cancel: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.cancel&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  get_ticket_remove: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`api/client/?action=order.ticket.remove&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },


  






};

export default TicketClient;
