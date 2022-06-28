import constants from "../../config/constants";
import api from "../../services";


export const BuilderReg = async () => {
  const credentials = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  const r = await api().VikunjaRegister().post_register(credentials);
  return r;
};

export const BuilderRegLogin = async () => {
   
  await BuilderReg();
  const cred = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  const response = await api().VikunjaLogin().post_login(cred);
  const jsonData = response.body;
  const token = jsonData.token;
  return token;    
};

export const BuilderNamespace = async () => {
  const token = await BuilderRegLogin();
  const response = await api().VikunjaNamespaces().get_namespaces(token);
  const jsonData = response.body;
  const namespaceID = jsonData[0].id;
  return [token, namespaceID];    
};

export const BuilderList = async () => {
  const ArrayList = await BuilderNamespace(); 
  const token = ArrayList[0]; 
  const namespaceID = ArrayList[1];
  const list = constants.list;
  list.namespace_id = namespaceID;
  const response = await api().VikunjaNamespaces().put_createList(namespaceID,token,list);
  const jsonData = response.body;
  const listID = jsonData.id;
  return [token, namespaceID, listID];   
};








