import api from '../framework/services';
import constants from '../framework/config/constants';
import { BuilderCancel, BuilderCart, BuilderOrder, BuilderReturn, BuilderTickets } from '../framework/fixtures/builder/builderArrange';
import { BuilderHash, BuilderUid, BuilderUser } from '../framework/fixtures/builder/builderData';
import chai from 'chai';
const assert = chai.assert;
const environment = {};

describe('API тесты клиентского приложения', () => {
  beforeAll( () => {
    environment.auth = BuilderHash();
    return  environment.auth;
  });
  test('Авторизация пользователя. get client/?action=login 200', async () => {
    const auth = environment.auth;
    const response = await api().KassaInform().getLogin(auth);  
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    assert.equal(jsonData.status, '0', 'Запрос выполнен успешно. Нет errors');
    expect(jsonData.result.roles.seller).toEqual(1); 
    expect(jsonData.result.roles.returner).toEqual(1);     
   
  });
  test('Получение списка городов get client/?action=city.list 200', async () => {
    const auth = environment.auth;
    const response = await api().KassaInform().getCities(auth);
    const jsonData = response.body;
    assert.equal(jsonData.status, '0', 'Запрос выполнен успешно. Нет errors');
    let cityName = '';
    jsonData.result.cities.forEach(element => {
      if (element.id === constants.cityId) {
        cityName = element.name;
      }
    }); 
    assert.include(cityName, constants.cityName, 'В ответе есть г. Пермь');   
   
  });
  
  test('Получение детальной информации о событии get client/?action=event.info 200', async () => {
    const params = new URLSearchParams(
        {
          auth: environment.auth,
          city: constants.cityId,
          id: constants.event,
        },
      );
    const response = await api().KassaInform().getEventInfo(params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    assert.equal(jsonData.status, '0', 'Запрос выполнен успешно. Нет errors');
    expect(jsonData.result.id).toEqual(constants.event);
    expect(jsonData.result.name).toEqual(constants.eventName);
    expect(jsonData.result.version_id).toEqual(constants.versionId);   
  });
  test('Получение билетов на событие client/?action=sector.places 200', async () => {
    const auth = environment.auth;
    const params = new URLSearchParams(
        {
          city: constants.cityId,
          event_id: constants.event,
        },
      );
    const response = await api().KassaInform().getPlaces(auth,params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    const ArrayPlaces = jsonData.result.places;
    expect(ArrayPlaces.length).toBeGreaterThan(0);    
  });
  test('Добавление билетов в корзину. Бронирование client/?action=cart.add 200', async () => {
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
    let response = await api().KassaOrderCreate().getCartAdd(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    assert.equal(jsonData.status, '0', 'Запрос выполнен успешно. Нет errors');
    response = await api().KassaOrderCreate().getCartRemove(auth, params); //Возврат билета. Чистка данных
  });
  
  test('Оформление заказа client/?action=order.make 200', async () => {
    const auth = environment.auth;
    const uid = BuilderUid();
    const ticketId = await BuilderCart(auth, uid);
    const params = new URLSearchParams(BuilderUser(uid));
    let response = await api().KassaOrderCreate().getOrderMake(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.status).toEqual("0");
    expect(jsonData.result.id).toBeGreaterThan(0);
    const orderId = jsonData.result.id;
    await BuilderCancel(auth, orderId); //Возврат заказа. Чистка данных
   });

  test('Продажа заказа client/?action=order.sold 200', async () => {
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
    const response = await api().KassaOrderEdit().getOrderSold(auth, params);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    assert.equal(jsonData.status, '0', 'Запрос выполнен успешно. Нет errors');
    await BuilderReturn(auth, orderId, ticketId); //Возврат заказа. Чистка данных
  });
});
