import { db } from "@goodtechsoft/mongodb";

export default async (session) => {
  let user = new db.User({
    firstName: "Amartuvshin",
    lastName : "Enkhbayar",
    phone    : "949450976",
    email    : "amartuvshin.enkhbayar@gmail.com",
    username : "BS-ZMS-ADMIN"
  });

  user.set({
    password: user.sha1("123456")
  });

  let staff = new db.Staff({
    active: true,
    role  : "super",
    user  : user
  });

  await db.save(user, session);
  await db.save(staff, session);
};