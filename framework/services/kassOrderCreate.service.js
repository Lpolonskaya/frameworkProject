import supertest from 'supertest';
import urls from '../config/urls';

const KassaOrderCreate = {
  getCartAdd: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=cart.add&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getCartRemove: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=cart.remove&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },
  getOrderMake: async (auth, params) => {
    const r = await supertest(`${urls.ticketsClient}`).get(`client/?action=order.make&auth=` + auth +`&${params}`).set('Content-Type', 'application/json');
    return r;
  },  
};

export default KassaOrderCreate;
