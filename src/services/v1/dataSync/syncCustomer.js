import { logic } from "@goodtechsoft/micro-service";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ERRORS } from "../../../constants";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().guid("uuid").required()
});

const exclude = ["created_by", "created_at", "updated_by", "updated_at", "note", "status"];
export default logic(schema, async (data, session) => {
  const { id } = data;

  let form = await db.find(db.Datasource, {
    where     : { id },
    attributes: { exclude },
    include   : [{
      model     : db.DatasourceField,
      as        : "datasource_fields",
      attributes: ["sort"],
      include   : [{
        model     : db.Field,
        as        : "fields",
        attributes: { exclude },
        include   : [{
          model     : db.Value,
          as        : "values",
          where     : { is_active: true },
          attributes: [ "name" ],
        }]
      }]
    }]
  }, session);
  if (!form) throw new NotfoundError(ERRORS.FORM_NOTFOUND);

  let FIELDS = form.datasource_fields.map(item => {
    return {
      sort: item.dataValues.sort,
      ...item.dataValues.fields.dataValues
    };
  });

  let datas = {
    object_id  : form.id,
    object_name: form.name,
    objects    : FIELDS
  };

  return datas;
});
