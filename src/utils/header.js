import mongoose from "mongoose";
import _ from "lodash";

const ignores = ["_id", "__v"];

export default async function header(model) {
  const modelName = _.upperFirst(model);

  const Model = mongoose.model(modelName);
  const schema = Model.schema;
  const paths = schema.paths;
  const headerSchema = await buildHeader(paths);
  return headerSchema;
}

async function buildHeader(paths) {
  // console.log('buildHeader called')
  let headers = [];

  Object.keys(paths).forEach((key) => {
    if (ignores.indexOf(key) === -1) {
      let path = paths[key];
      let options = path.options;
      if (Array.isArray(options.type)) {
        options = options.type[0];
      }
      if (options.headerOption) {
        const header = {
          ...Object.assign({}, options.headerOption),
          ref       : options.ref,
          formOption: Object.assign({}, options.formOption)
        };
        if (header.ref) {
          header.accessor += ".name";
        }
        header.title = header.Header;
        header.dataIndex = header.accessor;
        header.key = header.accessor;
        header.width = 170;
        header.sorter = true;
        headers.push(header);
      }
    }
  });

  headers = headers
    .map(header => {
      const { formOption, ...rest } = header;
      return rest;
    })
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

  return headers;
}
