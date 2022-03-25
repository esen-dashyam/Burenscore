export default async ({ data, where, type }) => {
  let shareholder = [];
  console.log(data);
  if (type === "CUSTOMER"){
    console.log("data_IS_ARRAY", Array.isArray(data));
    if (Array.isArray(data)){
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_c_relationcustomer_firstName      : item?.o_c_relationcustomer_firstName,
          o_c_relationcustomer_lastName       : item?.o_c_relationcustomer_lastName,
          o_c_relationcustomer_isforeign      : item?.o_c_relationcustomer_isforeign,
          o_c_relationcustomer_registerno     : item?.o_c_relationcustomer_registerno,
          o_c_relationcustomer_citizenrelation: item?.o_c_relationcustomer_citizenrelation,
          o_c_relationcustomer_isfinancialonus: item?.o_c_relationcustomer_isfinancialonus,
          o_c_relationcustomer_relno          : item?.o_c_relationcustomer_relno
        });
      });
    } else {
      shareholder.push({
        ...where,
        o_c_relationcustomer_firstName      : data?.o_c_relationcustomer_firstName,
        o_c_relationcustomer_lastName       : data?.o_c_relationcustomer_firstName,
        o_c_relationcustomer_isforeign      : data?.o_c_relationcustomer_isforeign,
        o_c_relationcustomer_registerno     : data?.o_c_relationcustomer_registerno,
        o_c_relationcustomer_citizenrelation: data?.o_c_relationcustomer_citizenrelation,
        o_c_relationcustomer_isfinancialonus: data?.o_c_relationcustomer_isfinancialonus,
        o_c_relationcustomer_relno          : data?.o_c_relationcustomer_relno
      });
    }
  }
  if (type === "ORG"){
    console.log("data_IS_ARRAY", Array.isArray(data));
    if (Array.isArray(data)){
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_c_relationorg_orgname        : item?.o_c_relationorg_orgname,
          o_c_relationorg_isforeign      : item?.o_c_relationorg_isforeign,
          o_c_relationorg_registerno     : item?.o_c_relationorg_registerno,
          o_c_relationorg_stateregisterno: item?.o_c_relationorg_stateregisterno,
          o_c_relationorg_orgrelation    : item?.o_c_relationorg_orgrelation,
          o_c_relationorg_isfinancialonus: item?.o_c_relationorg_isfinancialonus,
          o_c_relationorg_relno          : item?.o_c_relationorg_relno
        });
      });
    } else {
      shareholder.push({
        ...where,
        o_c_relationorg_orgname        : data?.o_c_relationorg_orgname,
        o_c_relationorg_isforeign      : data?.o_c_relationorg_isforeign,
        o_c_relationorg_registerno     : data?.o_c_relationorg_registerno,
        o_c_relationorg_stateregisterno: data?.o_c_relationorg_stateregisterno,
        o_c_relationorg_orgrelation    : data?.o_c_relationorg_orgrelation,
        o_c_relationorg_isfinancialonus: data?.o_c_relationorg_isfinancialonus,
        o_c_relationorg_relno          : data?.o_c_relationorg_relno
      });
    }
  }

  return shareholder;
};