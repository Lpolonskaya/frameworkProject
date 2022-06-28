import constants from "../../config/constants";
const CryptoJS = require("crypto-js");
const { faker } = require('@faker-js/faker');
import api from "../../services";

export const BuilderHash = () => {
    let password = constants.username;
    let moment = Number(new Date()/1000).toFixed(0).toString();
    let hashtimestamp = moment;
    let hash_md5 = CryptoJS.MD5(password).toString();
    let StringToHash = hash_md5 + moment;
    let hash_sha = CryptoJS.SHA1(StringToHash).toString();
    let hash = hash_sha;
    hashtimestamp = constants.username + ':' + hash +':'+ hashtimestamp;
    return  hashtimestamp;
};
export const BuilderTickets = async(auth) => {
    const params = new URLSearchParams(
        {
            city: constants.cityId,
            event_id: constants.event,
        },
    );
    const r = await api().TicketClient().get_places(auth, params);
    const jsonData = r.body;
    let x = 0;
    let ticketId = 0;
    jsonData.result.places.forEach(element => {
        if (x === 0) {
            if (element.ticket_id > 0){
                ticketId = element.ticket_id;
                x = 1;
            } 
        }
    });    
    return  ticketId;
};
export const BuilderCart = async(auth, uid) => {
    const ticketId = await BuilderTickets(auth);
    const params = new URLSearchParams(
        {
            city: constants.cityId,
            id: ticketId,
            uid: uid
        },
    );
    const r = await api().TicketClient().get_cart_add(auth, params);
    return  ticketId;
};
export const BuilderOrder = async(auth, uid) => {
    const ticketId = await BuilderCart(auth, uid);
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          uid: uid,
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber('8###-###-####'),
          email: faker.internet.email()
        },
      );      
    const response = await api().TicketClient().get_order_make(auth, params);
    const jsonData = response.body;
    const orderId = jsonData.result.id;
    return [ticketId, orderId];
};

export const BuilderReturn = async(auth, orderId, ticketId) => {
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          id: orderId,
        },
      );
    const r = await api().TicketClient().get_order_return(auth, params, ticketId);
    return r;
};
export const BuilderCurrentDate = () => {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();
    if (month < 10){
      month = '0' + month;
    }
    if (date < 10){
      date = '0' + date;
    }
    const dateTest = year + '-' + month + '-' + date;
    return dateTest;
};

export const BuilderUid = () => {
    const uid = Math.floor(1000000 + Math.random() * 90000000000000000000);
    return uid;
};
export const BuilderCancel = async(auth, orderId) => {
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          id: orderId,
        },
      );
    const r = await api().TicketClient().get_order_cancel(auth, params);
    return r;
};



























