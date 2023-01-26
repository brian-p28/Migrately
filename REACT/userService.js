import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { userUrl: `${API_HOST_PREFIX}/api/users` };

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/current`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const paginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const search = (pageIndex, pageSize, query, role, status) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&role=${role}&status=${status}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchRoles = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/searchrole/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchStatus = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/searchstatus/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateStatus = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.userUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addRole = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.userUrl}/addrole`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const userService = {
  getCurrentUser,
  paginate,
  search,
  updateStatus,
  addRole,
  searchRoles,
  searchStatus,
};

export default userService;
