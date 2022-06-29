import constants from "../../config/constants";
const CryptoJS = require("crypto-js");
const { faker } = require('@faker-js/faker');

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
export const BuilderUser = (uid) => {
    const params = {
          city: constants.cityId,
          uid: uid,
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber('8###-###-####'),
          email: faker.internet.email()
        }     
    
    return params;
};
