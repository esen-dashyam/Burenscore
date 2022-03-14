import asyncPool from "tiny-async-pool";

export default async (length, array, callback) => {

  await asyncPool(length, array, async (item) => {
    try {
      await callback(item);
    } catch (err) {
      console.log(err);
    }
  });
};