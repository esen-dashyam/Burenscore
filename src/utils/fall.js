export default promises => {
  return promises.reduce((accumilator, promise) => {
    return accumilator.then(res => {
      return promise().then(r => {
        return [...res, r];
      });
    });
  }, Promise.resolve([]));
};