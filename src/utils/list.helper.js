import mongoose from "mongoose";

function isTrue(val) {
  return val === true || val === "true";
}

const userPageSizeMax = 50;
const referenceFields = [
  "category",
  "cats",
  "parent",
  "position.company",
  "position.section",
  "position.profession",
  "award"
];

const sanitizePageSize = _size => {
  let size = parseInt(_size, 10) || 10;
  if (size > userPageSizeMax) {
    size = userPageSizeMax;
  }
  return size;
};

const sanitizeSort = (_sort = { _id: -1 }) => {
  let sort = _sort;

  return sort;
};

const formatSort = (sorted = [{ id: "_id", desc: true }]) => {
  const sort = sorted[0];
  const id = sort.id || "_id";

  return {
    [id]: isTrue(sort.desc) ? -1 : 1
  };
};

const formatFilter = (filtered = {}) => {
  const filters = Object.keys(filtered).reduce((filters, key) => {
    if (referenceFields.indexOf(key) === -1) {
      filters[key] = new RegExp(filtered[key], "i");
    } else {
      filters[key] = filtered[key];
    }
    return filters;
  }, {});

  return filters;
};

const formatFilter1 = (filtered = {}) => {
  const filters = Object.keys(filtered).reduce((filters, key) => {
    if (referenceFields.indexOf(key) === -1) {
      filters[key] = new RegExp(filtered[key], "i");
    } else {
      filters[key + "._id"] = mongoose.Types.ObjectId(filtered[key]);
    }
    return filters;
  }, {});

  return filters;
};

const generateAggregateArray = ({
  model,
  collections = [],
  sorted = [{ id: "_id", desc: true }],
  skip = 0,
  limit = 10,
  filtered = {}
}) => {
  let Model = mongoose.model(model);
  const paths = Model.schema.paths;

  let returnArray = [];

  collections.forEach(entry => {
    let entryModel,
      entryLocal = entry;

    if (typeof entry === "string") {
      entryModel = paths[entry].options.ref;
    } else {
      entryModel = entry.model;
      entryLocal = entry.local;
    }

    let lookupObject = {
      $lookup: {
        from        : mongoose.model(entryModel).collection.name,
        localField  : entryLocal,
        foreignField: "_id",
        as          : entryLocal
      }
    };
    returnArray.push(lookupObject);

    let unwindObject = {
      $unwind: {
        path                      : `$${entryLocal}`,
        preserveNullAndEmptyArrays: true
      }
    };
    returnArray.push(unwindObject);
  });

  let sortedObject = {
    $sort: { [sorted[0].id || "_id"]: isTrue(sorted[0].desc) ? -1 : 1 }
  };
  returnArray.push(sortedObject);

  let matchObject = {
    $match: formatFilter1(filtered)
  };
  returnArray.push(matchObject);

  let skipObject = {
    $skip: skip
  };
  returnArray.push(skipObject);

  let limitObject = {
    $limit: limit
  };
  returnArray.push(limitObject);

  return returnArray;
};

export {
  formatFilter,
  generateAggregateArray,
  sanitizePageSize,
  formatSort,
  sanitizeSort
};
