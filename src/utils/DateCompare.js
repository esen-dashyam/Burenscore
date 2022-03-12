/**
 * [">", "<", "===", "!",">=","=<"]
 */
export default (startDate, endDate, date) => {
  var dateFrom = startDate;
  var dateTo = endDate;
  var dateCheck = date;

  var d1 = dateFrom.split("-");
  var d2 = dateTo.split("-");
  var c = dateCheck.split("-");

  // 2020-10-15

  var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11
  var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
  var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

  return check >= from && check <= to;
};
