export default async ({ data, where, type }) => {
  let shareholder = [];
  console.log(data);
  if (type === "CUSTOMER"){
    if (Array.isArray(data)){
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_shareholder_firstname    : item?.o_shareholder_firstname,
          o_shareholder_lastname     : item?.o_shareholder_lastname,
          o_shareholdercus_isforeign : item?.o_shareholdercus_isforeign,
          o_shareholdercus_registerno: item?.o_shareholdercus_registerno,
        });
      });
    } else {
      shareholder.push({
        ...where,
        o_shareholder_firstname    : data?.o_shareholder_firstname,
        o_shareholder_lastname     : data?.o_shareholder_lastname,
        o_shareholdercus_isforeign : data?.o_shareholdercus_isforeign,
        o_shareholdercus_registerno: data?.o_shareholdercus_registerno,
      });
    }
  }
  if (type === "ORG"){
    if (Array.isArray(data)){
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_shareholder_orgname        : item?.o_shareholder_orgname,
          o_shareholderorg_isforeign   : item?.o_shareholderorg_isforeign,
          o_shareholderorg_registerno  : item?.o_shareholderorg_registerno,
          o_shareholder_stateregisterno: item?.o_shareholder_stateregisterno,
        });
      });
    } else {
      shareholder.push({
        ...where,
        o_shareholder_orgname        : data?.o_shareholder_orgname,
        o_shareholderorg_isforeign   : data?.o_shareholderorg_isforeign,
        o_shareholderorg_registerno  : data?.o_shareholderorg_registerno,
        o_shareholder_stateregisterno: data?.o_shareholder_stateregisterno,
      });
    }
  }

  return shareholder;
};