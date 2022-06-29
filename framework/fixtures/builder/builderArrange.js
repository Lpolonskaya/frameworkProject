import api from "../../services";
import constants from "../../config/constants";
import { BuilderUser } from "./builderData";


export const BuilderTickets = async(auth) => {
    const params = new URLSearchParams(
        {
            city: constants.cityId,
            event_id: constants.event,
        },
    );
    const r = await api().KassaInform().getPlaces(auth, params);
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
    const r = await api().KassaOrderCreate().getCartAdd(auth, params);
    return  ticketId;
};
export const BuilderOrder = async(auth, uid) => {
    const ticketId = await BuilderCart(auth, uid);
    const params = new URLSearchParams(BuilderUser(uid));
    const response = await api().KassaOrderCreate().getOrderMake(auth, params);
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
    const r = await api().KassaOrderEdit().getOrderReturn(auth, params, ticketId);
    return r;
};

export const BuilderCancel = async(auth, orderId) => {
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          id: orderId,
        },
      );
    const r = await api().KassaOrderEdit().getOrderCancel(auth, params);
    return r;
};
