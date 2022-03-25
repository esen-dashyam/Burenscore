export default async ({ data, where }) => {
  console.log(data);
  let mortgages = [];
  if (Array.isArray(data)){
    data.forEach(item => {
      mortgages.push({
        o_c_mrtno                       : item?.o_c_mrtno,
        o_c_mrtno_internal              : item?.o_c_mrtno_internal,
        o_c_mrtcode                     : item?.o_c_mrtcode,
        o_c_mrtdescription              : item?.o_c_mrtdescription,
        o_c_is_real_estate              : item?.o_c_is_real_estate,
        o_c_dateofvaluation             : item?.o_c_dateofvaluation,
        o_c_mrtvalue                    : item?.o_c_mrtvalue,
        o_c_mrtmaxlimit                 : item?.o_c_mrtmaxlimit,
        o_c_customer_firstname          : item?.o_c_customer?.o_c_customer_firstname,
        o_c_customer_lastname           : item?.o_c_customer?.o_c_customer_lastname,
        o_c_customer_isforeign          : item?.o_c_customer?.o_c_customer_isforeign,
        o_c_customer_registerno         : item?.o_c_customer?.o_c_customer_registerno,
        o_c_organization_orgname        : item?.o_c_organization?.o_c_organization_orgname,
        o_c_organization_localregistered: item?.o_c_organization?.o_c_organization_localregistered,
        o_c_organization_orgregisterno  : item?.o_c_organization?.o_c_organization_orgregisterno,
        o_c_organization_stateregisterno: item?.o_c_organization?.o_c_organization_stateregisterno,
        o_c_registeredtoauthority       : item?.o_c_registeredtoauthority?.o_c_registeredtoauthority,
        o_c_mrtstateregisterno          : item?.o_c_registeredtoauthority?.o_c_mrtstateregisterno,
        o_c_mrtcertificateno            : item?.o_c_registeredtoauthority?.o_c_mrtcertificateno,
        o_c_mrtconfirmeddate            : item?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate,
        o_c_mrtorgname                  : item?.o_c_authorityofimmovable?.o_c_mrtorgname,
        o_c_mrtregistereddatefim        : item?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim,
        o_c_mrtregisterno               : item?.o_c_authorityofimmovable?.o_c_mrtregisterno,
        o_c_mrtcertificatenofim         : item?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
        ...where,
      });
    });
  } else {
    mortgages.push({
      o_c_mrtno                       : data?.o_c_mrtno,
      o_c_mrtno_internal              : data?.o_c_mrtno_internal,
      o_c_mrtcode                     : data?.o_c_mrtcode,
      o_c_mrtdescription              : data?.o_c_mrtdescription,
      o_c_is_real_estate              : data?.o_c_is_real_estate,
      o_c_dateofvaluation             : data?.o_c_dateofvaluation,
      o_c_mrtvalue                    : data?.o_c_mrtvalue,
      o_c_mrtmaxlimit                 : data?.o_c_mrtmaxlimit,
      o_c_customer_firstname          : data?.o_c_customer?.o_c_customer_firstname,
      o_c_customer_lastname           : data?.o_c_customer?.o_c_customer_lastname,
      o_c_customer_isforeign          : data?.o_c_customer?.o_c_customer_isforeign,
      o_c_customer_registerno         : data?.o_c_customer?.o_c_customer_registerno,
      o_c_organization_orgname        : data?.o_c_organization?.o_c_organization_orgname,
      o_c_organization_localregistered: data?.o_c_organization?.o_c_organization_localregistered,
      o_c_organization_orgregisterno  : data?.o_c_organization?.o_c_organization_orgregisterno,
      o_c_organization_stateregisterno: data?.o_c_organization?.o_c_organization_stateregisterno,
      o_c_registeredtoauthority       : data?.o_c_registeredtoauthority?.o_c_registeredtoauthority,
      o_c_mrtstateregisterno          : data?.o_c_registeredtoauthority?.o_c_mrtstateregisterno,
      o_c_mrtcertificateno            : data?.o_c_registeredtoauthority?.o_c_mrtcertificateno,
      o_c_mrtconfirmeddate            : data?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate,
      o_c_mrtorgname                  : data?.o_c_authorityofimmovable?.o_c_mrtorgname,
      o_c_mrtregistereddatefim        : data?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim,
      o_c_mrtregisterno               : data?.o_c_authorityofimmovable?.o_c_mrtregisterno,
      o_c_mrtcertificatenofim         : data?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
      ...where,
    });
  }
  return mortgages;
};