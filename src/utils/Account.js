import sha1 from "crypto-js/sha1";


export const passEncrypt = (username, password) => {

  if (!username) throw new Error("user is undefined or null");
  if (!password) throw new Error("password is undefined or null");

  return sha1(JSON.stringify({ login: username.toLowerCase(), password: password })).toString();
};