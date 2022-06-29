import supertest from 'supertest';
import urls from '../config/urls';

const KassaInform = {
  getLogin: async (auth) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=login&auth=` + auth).set('Content-Type', 'application/json');
    return r;
  },
  getCities: async (auth) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=city.list&auth=` + auth).set('Content-Type', 'application/json');
    return r;
  },
  getEvents: async (params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=event.list&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getEventInfo: async (params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=event.info&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getPlaces: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=sector.places&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getOrderInfo: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.info&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
};

export default KassaInform;
