import api from '../framework/services';
import constants from '../framework/config/constants';
import { BuilderCancel, BuilderCart, BuilderHash, BuilderOrder, BuilderReturn, BuilderSold, BuilderTickets, BuilderUid } from '../framework/fixtures/builder/builderTickets';
const { faker } = require('@faker-js/faker');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const environment = {};

describe('API тесты клиентского приложения', () => {
  beforeAll( () => {
    environment.auth = BuilderHash();
    return  environment.auth;
  });
  test('Авторизация пользователя. get api/client/?action=login 200', async () => {
    const auth = environment.auth;
    const response = await api().TicketClient().get_login(auth);  
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual("0"); 
    expect(jsonData.result.roles.seller).toEqual(1); 
    expect(jsonData.result.roles.returner).toEqual(1);     
   
  });
  test('Получение списка городов get api/client/?action=city.list 200', async () => {
    const auth = environment.auth;
    const response = await api().TicketClient().get_cities(auth);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    jsonData.result.cities.forEach(element => {
      if (element.id === constants.cityId) {
        expect(element.name).toContain(constants.cityName);      
      }
    });    
   
  });
  test('Получений списка событий get /api/client/?action=event.list 200', async () => {
    const params = new URLSearchParams(
        {
          auth: environment.auth,
          city: constants.cityId,
        },
      );
    const response = await api().TicketClient().get_events(params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    jsonData.result.events.forEach(element => {
      if (element.id === constants.event) {
        expect(element.name).toEqual(constants.eventName); 
        expect(element.date).toEqual(constants.eventDate);
      }
    });    
  });
  test('Получение детальной информации о событии get /api/client/?action=event.info 200', async () => {
    const params = new URLSearchParams(
        {
          auth: environment.auth,
          city: constants.cityId,
          id: constants.event,
        },
      );
    const response = await api().TicketClient().get_event_info(params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual('0');
    expect(jsonData.result.id).toEqual(constants.event);
    expect(jsonData.result.name).toEqual(constants.eventName);
    expect(jsonData.result.version_id).toEqual(constants.versionId);   
  });
  test('Получение билетов на событие /api/client/?action=sector.places 200', async () => {
    const auth = environment.auth;
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          event_id: constants.event,
        },
      );
    const response = await api().TicketClient().get_places(auth,params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    const ArrayPlaces = jsonData.result.places;
    expect(ArrayPlaces.length).toBeGreaterThan(0);    
  });
  test('Добавление билетов в корзину. Бронирование /api/client/?action=cart.add 200', async () => {
    const auth = environment.auth;
    const uid = BuilderUid();
    const ticketId = await BuilderTickets(auth);
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          id: ticketId,
          uid: uid
        },
      );
    let response = await api().TicketClient().get_cart_add(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual("0"); 
    response = await api().TicketClient().get_cart_remove(auth, params);
  });
  
  test('Оформление заказа /api/client/?action=order.make 200', async () => {
    const auth = environment.auth;
    const uid = BuilderUid();
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
    let response = await api().TicketClient().get_order_make(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual("0");
    expect(jsonData.result.id).toBeDefined;
    expect(jsonData.result.id).toBeGreaterThan(0);
    const orderId = jsonData.result.id;
    await BuilderCancel(auth, orderId);
   });

  test('Продажа заказа /api/client/?action=order.sold 200', async () => {
    const auth = environment.auth;
    const uid = BuilderUid();
    const ArrayVariables = await BuilderOrder(auth, uid);
    const ticketId = ArrayVariables[0];
    const orderId = ArrayVariables[1];
    const params = new URLSearchParams(
      { city: constants.cityId,
        uid: uid,
        id: orderId,
        payment_id: 168,
        delivery_id: 0,
        payment_method: 0
      }
    );
    const response = await api().TicketClient().get_order_sold(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual("0");  
    await BuilderReturn(auth, orderId, ticketId);
  });
});
