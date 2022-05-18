export default {
  // CUSTOMER
  o_c_customercode: {
    "any.required": "ME2011",
    "any.empty"   : "ME2011",
    "string.max"  : "ME2012"
  },
  o_c_loandescription: {
    "string.max": "ME2013",
  },
  o_c_bankCode: {
    "any.required": "ME2014",
    "any.empty"   : "ME2014",
    "string.max"  : "ME2015",
  },
  o_c_branchcode: {
    "any.empty"   : "ME2016",
    "any.required": "ME2016",
    "string.max"  : "ME2017",
  },
  o_c_isorganization: {
    "any.empty"   : "ME2018",
    "any.required": "ME2018",
    "string.base" : "ME2019",
  },
  o_c_customername: {
    "any.empty"   : "ME2020",
    "any.required": "ME2020",
    "string.max"  : "ME2021",
  },
  c_lastname: {
    "any.empty"   : "ME2022",
    "any.required": "ME2022",
    "string.max"  : "ME2022",
  },
  o_c_isforeign: {
    "any.empty"   : "ME2023",
    "any.required": "ME2023",
    "number.max"  : "ME2024",
    "number.base" : "ME2025",
  },
  o_c_birthdate: {
    "string.regex.base": "ME2025",
  },
  o_c_zipcode: {
    "any.empty"   : "ME2026",
    "any.required": "ME2026",
    "number.base" : "ME2027",
  },
  o_c_address: {
    "any.empty"   : "ME2028",
    "any.required": "ME2028",
    "string.max"  : "ME2029",
  },
  o_c_registerno: {
    "any.empty"        : "ME2030",
    "any.required"     : "ME2030",
    "string.regex.base": "ME2031",
  },
  o_c_stateregister_passportorno: {
    "any.empty"   : "ME2031",
    "any.required": "ME2031",
    "string.max"  : "ME2032",
  },
  c_familynumofmembers: {
    "any.empty"     : "ME2034",
    "any.required"  : "ME2034",
    "number.base"   : "ME2035",
    "number.integer": "ME2035",
  },
  c_occupation: {
    "any.empty"   : "ME2039",
    "any.required": "ME2039",
    "any.valid"   : "ME2041",
  },
  o_fitchrating: {
    "any.valid" : "ME2042",
    "string.max": "ME2043",
  },
  o_sandp_rating: {
    "any.valid" : "ME2045",
    "string.max": "ME2044",
  },
  o_moodysrating: {
    "any.valid" : "ME2046",
    "string.max": "ME2045",
  },
  o_companytypecode: {
    "any.valid" : "ME2047",
    "string.max": "ME2046",
  },
  o_c_president_family_firstname: {
    "any.empty"   : "ME2051",
    "any.required": "ME2051",
    "string.max"  : "ME2052",
  },
  o_c_president_family_lastname: {
    "any.empty"   : "ME2053",
    "any.required": "ME2053",
    "string.max"  : "ME2054",
  },
  o_c_president_family_isforeign: {
    "any.required": "ME2055",
    "any.empty"   : "ME2055",
    "number.max"  : "ME2056",
  },
  o_c_president_family_registerno: {
    "any.empty"        : "ME2058",
    "any.required"     : "ME2058",
    "string.regex.base": "ME2059"
  },
  o_noofshareholders: {
    "number.integer": "ME2060",
  },
  c_familynumofunemployed: {
    "number.integer": "ME2036",
    "number.base"   : "ME2035",
  },
  c_job: {
    "string.max": "ME2039",
  },
  // ACCREDIT --------------------------------------------------------------------------
  o_c_accredit_advamount: {
    "any.required": "ME7002",
    "any.empty"   : "ME7002",
    "number.max"  : "ME7003",
    "number.base" : "ME7004",
  },
  o_c_accredit_starteddate: {
    "any.required"     : "ME7006",
    "any.empty"        : "ME7006",
    "string.regex.base": "ME7007",
  },
  o_c_accredit_expdate: {
    "any.required"     : "ME7008",
    "any.empty"        : "ME7008",
    "string.regex.base": "ME7009",
  },
  o_c_accredit_currencycode: {
    "any.required": "ME7010",
    "any.empty"   : "ME7010",
    "any.only"    : "ME7012",
  },
  o_c_accredit_type: {
    "any.required": "ME7013",
    "any.empty"   : "ME7013",
    "any.only"    : "ME7015",
  },
  o_c_accredit_interestinperc: {
    "any.required": "ME7016",
    "any.empty"   : "ME7016",
    "number.base" : "ME7018",
    "number.max"  : "ME7017",
  },
  o_c_accredit_commissionperc: {
    "any.required": "ME7020",
    "any.empty"   : "ME7020",
    "number.base" : "ME7019",
    "number.max"  : "ME7023",
  },
  o_c_accredit_fee: {
    "any.required": "ME7024",
    "any.empty"   : "ME7024",
    "number.base" : "ME7026",
    "number.max"  : "ME7025",
  },
  o_c_accredit_updatedexpdate: {
    "string.regex.base": "ME7027",
  },
  o_c_accredit_extcount: {
    "any.required"   : "ME7029",
    "any.empty"      : "ME7029",
    "number.base"    : "ME7030",
    "number.positive": "ME7030"
  },
  o_c_accredit_balance: {
    "any.required": "ME2084",
    "any.empty"   : "ME2084",
    "number.max"  : "ME2085",
    "number.base" : "ME2086",
  },
  // BOND -----------------------------------------------------------------------
  o_bond_advamount: {
    "any.required": "ME2062",
    "any.empty"   : "ME2063",
    "number.max"  : "ME2064",
    "number.base" : "ME2065",
  },
  o_bond_starteddate: {
    "any.required"     : "ME2067",
    "any.empty"        : "ME2067",
    "string.regex.base": "ME2068",
  },
  o_bond_expdate: {
    "any.required"     : "ME2069",
    "any.empty"        : "ME2069",
    "string.regex.base": "ME2070",
  },
  o_bond_currencycode: {
    "any.required": "ME2071",
    "any.empty"   : "ME2073",
    "any.only"    : "ME2072",
  },
  o_bond_type: {
    "any.required": "ME2074",
    "any.empty"   : "ME2074",
    "any.only"    : "ME2076",
  },
  o_bond_bondmarket: {
    "any.required": "ME2074",
    "any.empty"   : "ME2074",
    "string.max"  : "ME2077",
  },
  o_bond_numberofbonds: {
    "any.required": "ME2078",
    "any.empty"   : "ME2078",
    "number.base" : "ME2079",
  },
  o_bond_bondunitprice: {
    "any.required": "ME2080",
    "any.empty"   : "ME2080",
    "number.base" : "ME2083",
    "number.max"  : "ME2081",
  },
  o_bond_interestinperc: {
    "any.required": "ME2084",
    "any.empty"   : "ME2084",
    "number.base" : "ME2086",
    "number.max"  : "ME2085",
  },
  o_bond_balance: {
    "any.required": "ME3669",
    "any.empty"   : "ME3669",
    "number.base" : "ME3671",
    "number.max"  : "ME3670",
  },
  o_bond_isapproved: {
    "any.required": "Таг байхгүй байна",
    "any.empty"   : "Таг байхгүй байна",
    "number.base" : "Тоо биш байна",
    "number.max"  : "Заасаан хэмжээнээс хэтэрсэн байна",
  },
  // GUARANTEE ----------------------------------------------------------------------
  o_c_guarantee_advamount: {
    "any.required": "ME2252",
    "any.empty"   : "ME2252",
    "number.base" : "ME2255",
    "number.max"  : "ME2253",
  },
  o_c_guarantee_starteddate: {
    "any.required"     : "ME2256",
    "any.empty"        : "ME2256",
    "string.regex.base": "ME2257",
  },
  o_c_guarantee_expdate: {
    "any.required"     : "ME2258",
    "any.empty"        : "ME2258",
    "string.regex.base": "ME2259",
  },
  o_c_guarantee_currencycode: {
    "any.required"     : "ME2260",
    "any.empty"        : "ME2260",
    "string.regex.base": "ME2261",
    "any.only"         : "",
  },
  o_c_guarantee_type: {
    "any.required": "ME2263",
    "any.empty"   : "ME2264",
    "any.only"    : "ME2265",
  },
  o_c_guarantee_sectorcode: {
    "any.required": "ME3040",
    "any.empty"   : "ME3040",
    "any.only"    : "ME3041",
  },
  o_c_guarantee_interestinperc: {
    "any.required": "ME2266",
    "any.empty"   : "ME2266",
    "number.base" : "ME2269",
    "number.max"  : "ME2267",
  },
  o_c_guarantee_commissionperc: {
    "any.required": "ME2270",
    "any.empty"   : "ME2270",
    "number.base" : "ME2273",
    "number.max"  : "ME2271",
  },
  o_c_guarantee_fee: {
    "any.required": "ME2274",
    "any.empty"   : "ME2274",
    "number.base" : "ME2276",
    "number.max"  : "ME2275",
  },
  o_c_guarantee_updatedexpdate: {
    "string.regex.base": "ME2278",
  },
  o_c_guarantee_extcount: {
    "any.required": "ME2279",
    "any.empty"   : "ME2279",
    "number.base" : "ME2280",
    "number.max"  : "ME2281",
  },
  o_c_guarantee_balance: {
    "any.required": "ME3669",
    "any.empty"   : "ME3669",
    "number.base" : "ME3671",
    "number.max"  : "ME3670",
  },
  o_c_guarantee_loanclasscode: {
    "any.required": "O_C_GUARANTEE_LOANCLASSCODE",
    "any.empty"   : "O_C_GUARANTEE_LOANCLASSCODE",
    "any.valid"   : "O_C_GUARANTEE_LOANCLASSCODE_INVALID",
  },
  // LEASING ------------------------------------------------------------
  o_c_leasing_advamount: {
    "any.required": "ME2302",
    "any.empty"   : "ME2302",
    "number.base" : "ME2304",
    "number.max"  : "ME2303",
  },
  o_c_leasing_balance: {
    "any.required": "ME3645",
    "any.empty"   : "ME3645",
    "number.base" : "ME3647",
    "number.max"  : "ME3646",
  },
  o_c_leasing_starteddate: {
    "any.required"     : "ME2306",
    "any.empty"        : "ME2306",
    "string.regex.base": "ME2307",
  },
  o_c_leasing_expdate: {
    "any.required"     : "ME2308",
    "any.empty"        : "ME2308",
    "string.regex.base": "ME2309",
  },
  o_c_leasing_currencycode: {
    "any.required": "ME2312",
    "any.empty"   : "ME2310",
    "any.only"    : "ME2311",
  },
  o_c_leasing_sectorcode: {
    "any.required": "ME4012",
  },
  o_c_leasing_interestinperc: {
    "any.required": "ME2313",
    "any.empty"   : "ME2313",
    "number.base" : "ME2316",
    "number.max"  : "ME2314",
  },
  o_c_leasing_commissionperc: {
    "any.required": "ME2317",
    "any.empty"   : "ME2317",
    "number.base" : "ME2319",
    "number.max"  : "ME2318",
  },
  o_c_leasing_fee: {
    "any.required": "ME2321",
    "any.empty"   : "ME2321",
    "number.base" : "ME2324",
    "number.max"  : "ME2322",
  },
  o_c_leasing_updatedexpdate: {
    "string.regex.base": "ME2325",
  },
  o_c_leasing_loanclasscode: {
    "any.required": "ME2326",
    "any.valid"   : "ME2328",
  },
  o_c_leasing_loancharttype: {
    "any.required": "ME4013",
    "any.empty"   : "ME4015",
    "number.max"  : "ME4014",
  },
  o_c_leasing_interestcharttype: {
    "any.required": " ",
    "any.empty"   : " ",
    "number.max"  : " ",
  },
  // LOAN -------------------------------------------------------------
  o_c_loan_provideLoanSize: {
    "any.required": "ME2352",
    "any.empty"   : "ME2352",
    "number.base" : "ME2354",
    "number.max"  : "ME2353",
  },
  o_c_loan_balance: {
    "any.required": "ME3645",
    "any.empty"   : "ME3645",
    "number.base" : "ME3647",
    "number.max"  : "ME3646",
  },
  o_c_loan_loanProvenance: {
    "any.required": "ME2356",
    "any.empty"   : "ME2356",
    "any.valid"   : "ME2358",
  },
  o_c_loan_starteddate: {
    "any.required"     : "ME2359",
    "any.empty"        : "ME2359",
    "string.regex.base": "ME2360",
  },
  o_c_loan_expdate: {
    "any.required"     : "ME2361",
    "any.empty"        : "ME2361",
    "string.regex.base": "ME2362",
  },
  o_c_loan_currencycode: {
    "any.required"     : "ME2363",
    "any.empty"        : "ME2365",
    "string.regex.base": "ME2364",
  },
  o_c_loan_sectorcode: {
    "any.required": "ME3040",
    "any.valid"   : "ME3043",
  },
  o_c_loan_interestinperc: {
    "any.required": "ME2366",
    "any.empty"   : "ME2366",
    "number.base" : "ME2368",
    "number.max"  : "ME2367",
  },
  o_c_loan_commissionperc: {
    "any.required": "ME2370",
    "any.empty"   : "ME2370",
    "number.base" : "ME2372",
    "number.max"  : "ME2371",
  },
  o_c_loan_fee: {
    "any.required": "ME2374",
    "any.empty"   : "ME2374",
    "number.base" : "ME2376",
    "number.max"  : "ME2375",
  },
  o_c_loan_loanclasscode: {
    "any.required": "ME2380",
    "any.empty"   : "ME2382",
    "any.valid"   : "ME2382",
    "string.max"  : "ME2381",
  },
  o_c_loan_loanintype: {
    "any.required": " ",
    "any.empty"   : " ",
    "string.max"  : " ",
  },
  o_c_loan_loancharttype: {
    "any.required": "ME4007",
    "any.empty"   : "ME4008",
    "string.max"  : "ME4009",
  },


  // LOANLINE ------------------------------------------------------
  o_c_loanline_type: {
    "any.required": "ME2402",
    "any.empty"   : "ME2404",
    "string.max"  : "ME2403",
  },
  o_c_loanline_advamount: {
    "any.required": "ME2406",
    "any.empty"   : "ME2406",
    "number.base" : "ME2409",
    "number.max"  : "ME2407",
  },
  o_c_loanline_cardno: {
    "number.max": "ME2405",
  },
  o_c_loanline_starteddate: {
    "any.required"     : "ME2410",
    "any.empty"        : "ME2410",
    "string.regex.base": "ME2411",
  },
  o_c_loanline_expdate: {
    "any.required"     : "ME2412",
    "any.empty"        : "ME2412",
    "string.regex.base": "ME2413",
  },
  o_c_loanline_currencycode: {
    "any.required": "ME2414",
    "any.empty"   : "ME2416",
    "string.max"  : "ME2415",
  },
  o_c_loanline_sectorcode: {
    "any.required": "ME3040",
    "any.empty"   : "ME3040",
    "string.max"  : "ME3041",
  },
  o_c_loanline_loaninterest: {
    "any.required": "ME2417",
    "any.empty"   : "ME2417",
    "number.max"  : "ME2418",
    "number.base" : "ME2419",
  },
  o_c_loanline_timestoloan: {
    "any.required"  : "ME2421",
    "any.empty"     : "ME2421",
    "number.integer": "ME2422",
  },
  o_c_loanline_extdate: {
    "string.regex.base": "ME2413",
  },
  o_c_loanline_interestinperc: {
    "any.required": "ME2424",
    "any.empty"   : "ME2424",
    "number.max"  : "ME2425",
    "number.base" : "ME2426",
  },
  o_c_loanline_commissionperc: {
    "any.required": "ME2428",
    "any.empty"   : "ME2428",
    "number.max"  : "ME2429",
    "number.base" : "ME2430",
  },
  o_c_loanline_fee: {
    "any.required": "ME2432",
    "any.empty"   : "ME2432",
    "number.max"  : "ME2433",
    "number.base" : "ME2434",
  },
  o_c_loanline_balance: {
    "any.required": "ME3653",
    "any.empty"   : "ME3653",
    "number.max"  : "ME3654",
    "number.base" : "ME3655",
  },

  // MORTGAGE ------------------------------------------------------
  o_c_mrtno: {
    "any.required": "ME2452",
    "any.empty"   : "ME2452",
    "number.max"  : "ME2453",
  },
  o_c_mrtno_internal: {
    "any.required": " ",
    "any.empty"   : " ",
    "number.max"  : " ",
  },
  o_c_mrtcode: {
    "any.required": "ME2454",
    "any.empty"   : "ME2456 ",
    "number.max"  : "ME2455",
  },
  o_c_mrtdescription: {
    "any.required": "ME2460",
    "any.empty"   : "ME2460 ",
    "string.max"  : "ME2461",
  },
  o_c_is_real_estate: {
    "any.required": "ME4022",
    "any.empty"   : "ME4022 ",
    "number.base" : "ME4023",
  },
  o_c_dateofvaluation: {
    "any.required": "ME2479",
    "any.empty"   : "ME2479 ",
    "number.base" : "ME2480",
  },
  o_c_mrtvalue: {
    "any.required": "ME2481",
    "any.empty"   : "ME2481 ",
    "number.max"  : "ME2482 ",
    "number.base" : "ME2483",
  },
  o_c_mrtmaxlimit: {
    "any.required": "ME2485",
    "any.empty"   : "ME2485 ",
    "number.max"  : "ME2486",
    "number.base" : "ME2487",
  },
  o_c_customer_firstname: {
    "any.required": "ME2489",
    "any.empty"   : "ME2489 ",
    "string.max"  : "ME2490",
  },
  o_c_customer_lastname: {
    "string.max": "ME2491",
  },
  o_c_customer_isforeign: {
    "any.required": "ME2492",
    "any.empty"   : "ME2492 ",
    "number.base" : "ME2493",
  },
  o_c_customer_registerno: {
    "any.required"     : "ME2494",
    "any.empty"        : "ME2494 ",
    "string.regex.base": "ME2495",
  },
  o_c_organization_orgname: {
    "any.required": "ME2496",
    "any.empty"   : "ME2496 ",
    "string.max"  : "ME2497",
  },
  o_c_organization_localregistered: {
    "any.required": "ME2498",
    "any.empty"   : "ME2498 ",
    "number.base" : "ME2499",
  },
  o_c_organization_orgregisterno: {
    "any.required": "ME2500",
    "any.empty"   : "ME2500 ",
    "number.base" : "ME2501",
  },
  o_c_organization_stateregisterno: {
    "any.required": "ME2502",
    "any.empty"   : "ME2502 ",
    "number.base" : "ME2503",
  },
  o_c_mrtstateregisterno: {
    "any.required": "ME2464",
    "any.empty"   : "ME2464 ",
    "string.max"  : "ME2465",
  },
  o_c_mrtcertificateno: {
    "any.required": "ME2466",
    "any.empty"   : "ME2466 ",
    "string.max"  : "ME2467",
  },
  o_c_mrtconfirmeddate: {
    "any.required"     : "ME2468",
    "any.empty"        : "ME2468 ",
    "string.regex.base": "ME2469",
  },
  o_c_mrtorgname: {
    "any.required": "ME2470",
    "any.empty"   : "ME2472 ",
    "string.max"  : "ME2471",
  },
  o_c_mrtregistereddatefim: {
    "any.required"      : "ME2473",
    "any.empty"         : "ME2473 ",
    "sstring.regex.base": "ME2474",
  },
  o_c_mrtregisterno: {
    "any.required": "ME2475",
    "any.empty"   : "ME2475 ",
    "sstring.max" : "ME2476",
  },
  o_c_mrtcertificatenofim: {
    "any.required": "ME2477",
    "any.empty"   : "ME2477 ",
    "sstring.max" : "ME2478",
  },
  o_c_causetoshiftto: {
    "any.required": "ME2510",
    "any.empty"   : "ME2510 ",
    "sstring.max" : "ME2509",
  },
  o_c_courtorderdate: {
    "string.regex.base": "ME2511",
  },
  o_c_courtorderno: {
    "string.max": "ME2512",
  },
  // ONUS ----------------------------------------------------------
  o_c_onus_advamount: {
    "any.required": "ME3452",
    "any.empty"   : "ME3452",
    "number.base" : "ME3454",
    "number.max"  : "ME3453",
  },
  o_c_onus_balance: {
    "any.required": "ME3665",
    "any.empty"   : "ME3669",
    "number.base" : "ME3667",
    "number.max"  : "ME3666",
  },
  o_c_onus_rightopeneddate: {
    "any.required"     : "ME3456",
    "any.empty"        : "ME3456",
    "string.regex.base": "ME3457",
  },
  o_c_onus_starteddate: {
    "any.required"     : "ME3458",
    "any.empty"        : "ME3458",
    "string.regex.base": "ME3459",
  },
  o_c_onus_paymentfinaldate: {
    "any.required"     : "ME3460",
    "any.empty"        : "ME3460",
    "string.regex.base": "ME3461",
  },
  o_c_onus_expdate: {
    "any.required"     : "ME3462",
    "any.empty"        : "ME3462",
    "string.regex.base": "ME3463",
  },
  o_c_onus_interestinperc: {
    "any.required": "ME3464",
    "any.empty"   : "ME3464",
    "number.max"  : "ME3465",
    "number.base" : "ME3466",
  },
  o_c_onus_commissionperc: {
    "any.required": "ME3468",
    "any.empty"   : "ME3468",
    "number.max"  : "ME3469",
    "number.base" : "ME3470",
  },
  o_c_onus_fee: {
    "any.required": "ME3472",
    "any.empty"   : "ME3472",
    "number.max"  : "ME3473",
    "number.base" : "ME3474",
  },
  o_c_onus_loanclasscode: {
    "any.required": "ME3476",
    "any.empty"   : "ME3478",
    "string.max"  : "ME3477",
  },
  // RECEIVABLE ---------------------------------------------------
  o_c_receivable_balance: {
    "any.required": "ME3661",
    "any.empty"   : "ME3661",
    "number.base" : "ME3664",
    "number.max"  : "ME3662",
  },
  o_c_receivable_advamount: {
    "any.required": "ME3402",
    "any.empty"   : "ME3402",
    "number.base" : "ME3405",
    "number.max"  : "ME3403",
  },
  o_c_receivable_starteddate: {
    "any.required"     : "ME3406",
    "any.empty"        : "ME3406",
    "string.regex.base": "ME3407",
  },
  o_c_receivable_expdate: {
    "any.required"     : "ME3408",
    "any.empty"        : "ME3408",
    "string.regex.base": "ME3409",
  },
  o_c_receivable_currencycode: {
    "any.required": "ME3410",
    "any.empty"   : "ME3410",
    "string.max"  : "ME3411",
    "string.base" : "ME3412",
  },
  o_c_receivable_type: {
    "any.required": "ME3413",
    "any.empty"   : "ME3413",
    "string.max"  : "ME3414",
  },
  o_c_receivable_loanclasscode: {
    "any.required": "ME3416",
    "any.empty"   : "ME3416",
    "string.max"  : "ME3417",
  },
  o_c_receivable_extdate: {
    "any.required"     : "ME3418",
    "any.empty"        : "ME3418",
    "string.regex.base": "ME3419",
  },
  o_c_receivable_loancharttype: {
    "any.required": "ME3000",
    "any.empty"   : "ME3002",
    "string.base" : "ME3001",
  },
  // RELATION ------------------------------------------------------------
  o_c_relationcustomer_firstName: {
    "any.required": "ME3382",
    "any.empty"   : "ME3382",
    "string.max"  : "ME3419",
  },
  o_c_relationcustomer_lastName: {
    "string.max": "ME3384",
  },
  o_c_relationcustomer_isforeign: {
    "any.required": "ME3385",
    "any.empty"   : "ME3385",
    "number.base" : "ME3386",
  },
  o_c_relationcustomer_registerno: {
    "any.required"     : "ME3387",
    "any.empty"        : "ME3387",
    "string.regex.base": "ME3388",
  },
  o_c_relationcustomer_citizenrelation: {
    "any.required": "ME3389",
    "any.empty"   : "ME3391",
    "string.max"  : "ME3390",
  },
  o_c_relationcustomer_isfinancialonus: {
    "any.required": "ME3392",
    "any.empty"   : "ME3392",
    "number.base" : "ME3393",
  },
  o_c_relationcustomer_relno: {
    "any.required": "ME4057",
    "any.empty"   : "ME4057",
  },
  o_c_relationorg_orgname: {
    "any.required": "ME3362",
    "any.empty"   : "ME3362",
    "string.max"  : "ME3363",
  },
  o_c_relationorg_isforeign: {
    "any.required": "ME3364",
    "any.empty"   : "ME3364",
    "number.base" : "ME3365",
  },
  o_c_relationorg_stateregisterno: {
    "string.regex.base": "ME3368",
  },
  o_c_relationorg_registerno: {
    "any.required"     : "ME3366",
    "any.empty"        : "ME3366",
    "string.regex.base": "ME3367",
  },
  o_c_relationorg_orgrelation: {
    "any.required": "ME3369",
    "any.empty"   : "ME3371",
    "string.max"  : "ME3370",
  },
  o_c_relationorg_isfinancialonus: {
    "any.required": "ME3372",
    "any.empty"   : "ME3372",
    "number.base" : "ME3373",
  },
  o_c_relationorg_relno: {
    "any.required": "ME4057",
    "any.empty"   : "ME4057",
  },
  // SHAREHOLDER -----------------------------------------------------------------
  o_shareholder_firstname: {
    "any.required": "ME3032",
    "any.empty"   : "ME3032",
    "string.max"  : "ME3033",
  },
  o_shareholder_lastname: {
    "string.max": "ME3034",
  },
  o_shareholdercus_isforeign: {
    "any.required": "ME3035",
    "any.empty"   : "ME3035",
    "number.base" : "ME3036",
  },
  o_shareholdercus_registerno: {
    "any.required": "ME3038",
    "any.empty"   : "ME3039",
  },
  o_shareholder_orgname: {
    "any.required": "ME3022",
    "any.empty"   : "ME3022",
    "string.max"  : "ME3023",
  },
  o_shareholderorg_isforeign: {
    "any.required": "ME3024",
    "any.empty"   : "ME3024",
    "number.base" : "ME3025",
  },
  o_shareholderorg_registerno: {
    "any.required"     : "ME3027",
    "any.empty"        : "ME3027",
    "string.max"       : "ME3028",
    "string.regex.base": "ME3029",
  },
  o_shareholder_stateregisterno: {
    "any.required"     : " ",
    "any.empty"        : " ",
    "string.max"       : " ",
    "string.regex.base": " ",
  },
  // FINANCIALINFO
  c_b_totalsale: {
    "number.unsafe"  : "ME2102",
    "number.positive": "ME2103"
  },
  c_b_totalcost: {
    "number.unsafe"  : "ME2105",
    "number.positive": "ME2106",
  },
  c_b_totalprofit: {
    "number.unsafe"  : "ME2108",
    "number.positive": "ME2109",
  },
  c_b_operatingexpense: {
    "number.unsafe"  : "ME2111",
    "number.positive": "ME2112",
  },
  c_b_operatingincome: {
    "number.unsafe"  : "ME2114",
    "number.positive": "ME2115",
  },
  c_b_otherincome: {
    "number.unsafe"  : "ME2117",
    "number.positive": "ME2118",
  },
  c_b_otherexpense: {
    "number.unsafe"  : "ME2120",
    "number.positive": "ME2121",
  },
  c_b_profitbeforetax: {
    "number.unsafe"  : "ME2123",
    "number.positive": "ME2124",
  },
  c_b_tax: {
    "number.unsafe"  : "ME2126",
    "number.positive": "ME2127",
  },
  c_b_netprofit: {
    "number.unsafe"  : "ME2129",
    "number.positive": "ME2130",
  },
  // CAPITAL
  c_p_totalasset: {
    "number.unsafe"  : "ME2152",
    "number.positive": "ME2153",
  },
  c_p_assettype: {
    "number.unsafe": "ME2155",
  },
  c_p_assetcost: {
    "number.unsafe"  : "ME2156",
    "number.positive": "ME2157",
  },
  c_p_assetdepreciation: {
    "number.unsafe"  : "ME2159",
    "number.positive": "ME2160",
  },
  c_p_assetownership: {
    "number.unsafe": "ME2162",
  },
  // FAMILY
  c_g_salary: {
    "number.unsafe"  : "ME2182",
    "number.positive": "ME2183",
  },
  c_g_otherincome: {
    "number.unsafe"  : "ME2185",
    "number.positive": "ME2186",
  },
  c_g_totalincome: {
    "number.unsafe"  : "ME2188",
    "number.positive": "ME2189",
  },
  c_g_foodexpense: {
    "number.unsafe"  : "ME2191",
    "number.positive": "ME2192",
  },
  c_g_expensetolease: {
    "number.unsafe"  : "ME2194",
    "number.positive": "ME2195",
  },
  c_g_commexpense: {
    "number.unsafe"  : "ME2197",
    "number.positive": "ME2198",
  },
  c_g_otherexpense: {
    "number.unsafe"  : "ME2200",
    "number.positive": "ME2201",
  },
  c_g_totalexpense: {
    "number.unsafe"  : "ME2203",
    "number.positive": "ME2204",
  },
  c_g_netincome: {
    "number.unsafe"  : "ME2206",
    "number.positive": "ME2207",
  },
  c_g_saving: {
    "number.unsafe"  : "ME2209",
    "number.positive": "ME2210",
  },
  c_g_totalsaving: {
    "number.unsafe"  : "ME2212",
    "number.positive": "ME2213",
  },
  c_g_savinghistory: {
    "number.unsafe": "ME2215",
  },
  // o_t_Report
  o_t_circulatoryasset: {
    "number.unsafe"  : "ME3052",
    "number.positive": "ME3053",
  },
  o_te_cash: {
    "number.unsafe"  : "ME3055",
    "number.positive": "ME3056",
  },
  o_te_receivable: {
    "number.unsafe"  : "ME3058",
    "number.positive": "ME3059",
  },
  o_te_material: {
    "number.unsafe"  : "ME3061",
    "number.positive": "ME3062",
  },
  o_te_shortitmeinvest: {
    "number.unsafe"  : "ME3064",
    "number.positive": "ME3065",
  },
  o_te_otherasset: {
    "number.unsafe"  : "ME3067",
    "number.positive": "ME3068",
  },
  o_t_noncirculatoryasset: {
    "number.unsafe"  : "ME3070",
    "number.positive": "ME3071",
  },
  o_tu_building: {
    "number.unsafe"  : "ME3073",
    "number.positive": "ME3074",
  },
  o_tu_equipment: {
    "number.unsafe"  : "ME3076",
    "number.positive": "ME3077",
  },
  o_tu_furniture: {
    "number.unsafe"  : "ME3079",
    "number.positive": "ME3080",
  },
  o_tu_othertangible: {
    "number.unsafe"  : "ME3082",
    "number.positive": "ME3083",
  },
  o_tu_accumdeppression: {
    "number.unsafe"  : "ME3085",
    "number.positive": "ME3086",
  },
  o_t_totalasset: {
    "number.unsafe"  : "ME3088",
    "number.positive": "ME3089",
  },
  o_t_shorttimeloan: {
    "number.unsafe"  : "ME3091",
    "number.positive": "ME3092",
  },
  o_tb_loanonaccount: {
    "number.unsafe"  : "ME3094",
    "number.positive": "ME3095",
  },
  o_tb_bankloan: {
    "number.unsafe"  : "ME3097",
    "number.positive": "ME3098",
  },
  o_tb_othershorttime: {
    "number.unsafe"  : "ME3100",
    "number.positive": "ME3101",
  },
  o_t_longtimeloan: {
    "number.unsafe"  : "ME3103",
    "number.positive": "ME3104",
  },
  o_t_ownerproperty: {
    "number.unsafe"  : "ME3106",
    "number.positive": "ME3107",
  },
  o_tz_companyfund: {
    "number.unsafe"  : "ME3109",
    "number.positive": "ME3110",
  },
  o_tz_other: {
    "number.unsafe"  : "ME3112",
    "number.positive": "ME3113",
  },
  o_tz_accumprofit: {
    "number.unsafe"  : "ME3115",
    "number.positive": "ME3116",
  },
  o_t_debtownerproperty: {
    "number.unsafe"  : "ME3118",
    "number.positive": "ME3119",
  },
  o_m_Report: {
    "any.empty": "ME3151"
  },
  o_m_operatingmoneyflow: {
    "number.unsafe"  : "ME3153",
    "number.positive": "ME3154",
  },
  o_mu_profitbeforetaxinterest: {
    "number.unsafe"  : "ME3155",
    "number.positive": "ME3156",
  },
  o_mu_deppressionexpense: {
    "number.unsafe"  : "ME3158",
    "number.positive": "ME3159",
  },
  o_mu_tax: {
    "number.unsafe"  : "ME3161",
    "number.positive": "ME3162",
  },
  o_mu_materialprocurement: {
    "number.unsafe"  : "ME3164",
    "number.positive": "ME3165",
  },
  o_m_financemoneyflow: {
    "number.unsafe"  : "ME3167",
    "number.positive": "ME3168",
  },
  o_ms_receivablechange: {
    "number.unsafe"  : "ME3170",
    "number.positive": "ME3171",
  },
  o_ms_shorttimeinvestchange: {
    "number.unsafe"  : "ME3173",
    "number.positive": "ME3174",
  },
  o_ms_loanonaccountchange: {
    "number.unsafe"  : "ME3176",
    "number.positive": "ME3177",
  },
  o_ms_bankloanchange: {
    "number.unsafe"  : "ME3179",
    "number.positive": "ME3180",
  },
  o_ms_longtermsource: {
    "number.unsafe"  : "ME3182",
    "number.positive": "ME3183",
  },
  o_ms_interestexpense: {
    "number.unsafe"  : "ME3185",
    "number.positive": "ME3186",
  },
  o_ms_ownerproperty: {
    "number.unsafe"  : "ME3188",
    "number.positive": "ME3189",
  },
  o_ms_earningforshare: {
    " number.unsafe" : "ME3191",
    "number.positive": "ME3192",
  },
  o_m_investmoneyflow: {
    "number.unsafe"  : " ",
    "number.positive": " ",
  },
  o_mh_building: {
    "number.unsafe"  : "ME3194",
    "number.positive": "ME3195",
  },
  o_mh_equipment: {
    "number.unsafe"  : "ME3200",
    "number.positive": "ME3201",
  },
  o_mh_furniture: {
    "number.unsafe"  : "ME3203",
    "number.positive": "ME3204",
  },
  o_mh_othertangible: {
    "number.unsafe"  : "ME3206",
    "number.positive": "ME3207",
  },
  o_mh_otherintangible: {
    "number.unsafe"  : "ME3209",
    "number.positive": "ME3210",
  },
  o_mh_accumdepression: {
    "number.unsafe"  : "ME3212",
    "number.positive": "ME3213",
  },
  // o_Report
  o_m_totalmoneyflow: {
    "number.unsafe"  : "ME3215",
    "number.positive": "ME3216",
  },
  o_m_cashbalance: {
    "number.unsafe"  : "ME3218",
    "number.positive": "ME3219",
  },
  o_sale: {
    "number.unsafe"  : "ME3252",
    "number.positive": "ME3253",
  },
  o_saleproductcost: {
    "number.unsafe"  : "ME3255",
    "number.positive": "ME3256",
  },
  o_totalincome: {
    "number.unsafe"  : "ME3258",
    "number.positive": "ME3259",
  },
  o_operatingexpense: {
    "number.unsafe"  : "ME3261",
    "number.positive": "ME3262",
  },
  ou_salary: {
    "number.unsafe"  : "ME3264",
    "number.positive": "ME3265",
  },
  ou_leaseexploitexpense: {
    "number.unsafe"  : "ME3267",
    "number.positive": "ME3268",
  },
  ou_advertiseexpense: {
    "number.unsafe"  : "ME3270",
    "number.positive": "ME3271",
  },
  ou_insuranceexpense: {
    "number.unsafe"  : "ME3273",
    "number.positive": "ME3274",
  },
  ou_depreciationexpense: {
    "number.unsafe"  : "ME3276",
    "number.positive": "ME3277",
  },
  ou_otherexpense: {
    "number.unsafe"  : "ME3279",
    "number.positive": "ME3281",
  },
  o_minoroperincomeexpense: {
    "number.unsafe"  : "ME3282",
    "number.positive": "ME3284",
  },
  o_minoroperincome: {
    "number.unsafe"  : "ME3285",
    "number.positive": "ME3287",
  },
  o_minoroperexpense: {
    "number.unsafe"  : "ME3288",
    "number.positive": "ME3290",
  },
  o_profitbeforetaxinterest: {
    "number.unsafe"  : "ME3291",
    "number.positive": "ME3293",
  },
  oh_interestexpense: {
    "number.unsafe"  : "ME3294",
    "number.positive": "ME3295",
  },
  oh_tax: {
    "number.unsafe"  : "ME3297",
    "number.positive": "ME3299",
  },
  o_netprofit: {
    "number.unsafe"  : "ME3300",
    "number.positive": "ME3302",
  },
};