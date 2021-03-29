import axios from "./axios";
import _forEach from "lodash/forEach";
import _isUndefined from "lodash/isUndefined";

function getList({ resource, page, perPage, filters, search, sort }) {
  const queryParams = (() => {
    let query = "";
    if (_isUndefined(page) && _isUndefined(perPage) && _isUndefined(filters))
      return query;
    else query = "?";
    let addedFilters = false;
    if (filters) {
      _forEach(filters, (value, key) => {
        if (value) {
          addedFilters = true;
          query += `${key}=${value}`;
        }
      });
    }
    if (search) {
      if (addedFilters) query += "&";
      query += `${search.key}_like=${search.value}`;
    }
    if (sort) {
      if (search || addedFilters) query += "&";
      query += `_sort=${sort.key}&_order=${sort.order}`;
    }
    if (!_isUndefined(page) && !_isUndefined(perPage)) {
      const start = page * perPage;
      const limit = perPage;
      if (sort || search || addedFilters) query += "&";
      query += `_start=${start}&_limit=${limit}`;
    }
    return query;
  })();
  return axios
    .get(`/${resource}${queryParams}`)
    .then((res) => ({ data: res.data, total: res.headers["x-total-count"] }));
}

function add(resource, data) {
  return axios.post(`${resource}`, data).then((res) => res.data);
}

function edit(resource, id, data) {
  return axios.put(`${resource}/${id}`, data).then((res) => res.data);
}

function getOne(resource, id) {
  return axios.get(`${resource}/${id}`).then((res) => res.data);
}

export { getList, add, getOne, edit };
