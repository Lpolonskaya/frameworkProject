import KassaInform from './kassaInform.service';
import KassaOrderCreate from './kassOrderCreate.service';
import KassaOrderEdit from './kassaOrderEdit.service';


const api = () => ({
  KassaInform: () => ({...KassaInform }),
  KassaOrderCreate: () => ({...KassaOrderCreate}),
  KassaOrderEdit: () => ({...KassaOrderEdit})
});
export default api;


