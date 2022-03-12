import { v4 as uuidV4 } from "uuid";

class Docs {
  data = {};

  value = null;

  constructor(data) {
    if (data && Array.isArray(data) && data.length > 0) {
      this.data = data.reduce((accumulator, iterator) => {
        this.value = {
          id: uuidV4(),
          ...iterator,
        };

        return {
          ...accumulator,
          [this.value.id]: this.value,
        };
      }, {});
    }
  }

  create(value) {
    this.value = {
      ...value,
      id: uuidV4(),
    };

    this.data[this.value.id] = this.value;

    return this.value;
  }

  update(value) {
    console.log(value);
    if (value != null && value.id != null && this.data[value.id]) {
      this.data[value.id] = value;
      this.value = value;
      return true;
    }
    return false;
  }

  get(id) {
    return this.data[id];
  }

  list() {
    return Object.keys(this.data).map((id) => {
      return this.data[id];
    });
  }

  last() {
    return this.value;
  }

  remove(id) {
    delete this.data[id];
  }
}

export default Docs;
