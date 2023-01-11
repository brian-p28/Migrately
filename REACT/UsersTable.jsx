import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import userService from "services/userService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import UsersList from "./UsersList";
import toastr from "toastr";
import Dropdown from "react-bootstrap/Dropdown";
import lookUpService from "services/lookUpService";
import "../user/userstyles.css";

function UsersTable() {
  const _logger = debug.extend("UsersAdmin");

  const [users, setUser] = useState({
    usersArray: [],
    mappedArray: [],
  });
  const [paginate, setPaginate] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    searchQuery: "",
    role: "",
    status: "",
  });
  const [newLookUp, setNewLookUp] = useState({
    sTypes: [],
    mappedSTypes: [],
    roles: [],
    mappedRoles: [],
  });

  useEffect(() => {
    if (paginate.searchQuery) {
      userService
        .search(
          paginate.pageIndex,
          paginate.pageSize,
          paginate.searchQuery,
          paginate.role,
          paginate.status
        )
        .then(onSearchSuccess)
        .catch(onSearchError);
    } else if (paginate.role) {
      userService
        .searchRoles(paginate.pageIndex, paginate.pageSize, paginate.role)
        .then(onSearchRoleSuccess)
        .catch(onSearchRoleError);
    } else if (paginate.status) {
      userService
        .searchStatus(paginate.pageIndex, paginate.pageSize, paginate.status)
        .then(onSearchStatusSuccess)
        .catch(onSearchStatusError);
    } else {
      userService
        .paginate(paginate.pageIndex, paginate.pageSize)
        .then(onPaginateSuccess)
        .catch(onPaginateError);
    }
  }, [
    paginate.searchQuery,
    paginate.pageIndex,
    paginate.role,
    paginate.status,
  ]);
  const onPaginateSuccess = (response) => {
    _logger("Successful Paginate: ", response);

    const newArray = response.item.pagedItems;

    setUser((prevState) => {
      const newUsers = { ...prevState };
      newUsers.usersArray = newArray;
      newUsers.mappedArray = newArray.map(mapUsers);

      return newUsers;
    });

    const newPageInfo = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = newPageInfo.pageIndex;
      newPaginate.pageSize = newPageInfo.pageSize;
      newPaginate.totalCount = newPageInfo.totalCount;
      newPaginate.totalPages = newPageInfo.totalPages;
      newPaginate.role = "";
      newPaginate.status = "";

      return newPaginate;
    });
  };
  const onPaginateError = (error) => {
    _logger(error);
    toastr["error"]("Unable to load users...");
  };
  const onSearchSuccess = (response) => {
    _logger("Successful Search: ", response);

    const newArray = response.item.pagedItems;

    setUser((prevState) => {
      const newUsers = { ...prevState };
      newUsers.usersArray = newArray;
      newUsers.mappedArray = newArray.map(mapUsers);

      return newUsers;
    });

    const newPageInfo = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = newPageInfo.pageIndex;
      newPaginate.pageSize = newPageInfo.pageSize;
      newPaginate.totalCount = newPageInfo.totalCount;
      newPaginate.totalPages = newPageInfo.totalPages;

      return newPaginate;
    });
  };
  const onSearchError = (error) => {
    _logger(error);
    toastr["error"]("Unable to find what you were looking for...");

    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  };
  const onSearchStatusSuccess = (response) => {
    _logger(response);
    const newArray = response.item.pagedItems;

    setUser((prevState) => {
      const newUsers = { ...prevState };
      newUsers.usersArray = newArray;
      newUsers.mappedArray = newArray.map(mapUsers);

      return newUsers;
    });

    const newPageInfo = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = newPageInfo.pageIndex;
      newPaginate.pageSize = newPageInfo.pageSize;
      newPaginate.totalCount = newPageInfo.totalCount;
      newPaginate.totalPages = newPageInfo.totalPages;

      return newPaginate;
    });
  };
  const onSearchStatusError = (error) => {
    _logger(error);
    toastr["error"]("Could Not Find Anyone With This Status");
  };
  const onSearchRoleSuccess = (response) => {
    _logger(response);
    const newArray = response.item.pagedItems;

    setUser((prevState) => {
      const newUsers = { ...prevState };
      newUsers.usersArray = newArray;
      newUsers.mappedArray = newArray.map(mapUsers);

      return newUsers;
    });

    const newPageInfo = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = newPageInfo.pageIndex;
      newPaginate.pageSize = newPageInfo.pageSize;
      newPaginate.totalCount = newPageInfo.totalCount;
      newPaginate.totalPages = newPageInfo.totalPages;

      return newPaginate;
    });
  };
  const onSearchRoleError = (error) => {
    _logger(error);
    toastr["error"]("Could Not Find Anyone With This Role");
  };

  useEffect(() => {
    lookUpService
      .LookUp(["StatusTypes"])
      .then(onSTLookUpSuccess)
      .catch(onSTLookUpError);
    lookUpService
      .LookUp(["Roles"])
      .then(onRLookUpSuccess)
      .catch(onRLookUpError);
  }, []);
  const onSTLookUpSuccess = (response) => {
    _logger("Statuses: ", response.item.statusTypes);
    const statusArray = response.item.statusTypes;

    setNewLookUp((prevState) => {
      const newStatus = { ...prevState };
      newStatus.sTypes = statusArray;
      newStatus.mappedSTypes = statusArray.map(mapStatus);

      return newStatus;
    });
  };
  const onSTLookUpError = (error) => {
    _logger(error);
    toastr["error"]("Could not find Statuses");
  };
  const onRLookUpSuccess = (response) => {
    _logger("Roles: ", response.item.roles);
    const rolesArray = response.item.roles;

    setNewLookUp((prevState) => {
      const newRoles = { ...prevState };
      newRoles.roles = rolesArray;
      newRoles.mappedRoles = rolesArray.map(mapRoles);

      return newRoles;
    });
  };
  const onRLookUpError = (error) => {
    _logger(error);
    toastr["error"]("Could not find Roles");
  };

  const mapStatus = (status) => {
    return (
      <Dropdown.Item onClick={onSearchStatus} id={status.id}>
        {status.name}
      </Dropdown.Item>
    );
  };
  const mapRoles = (role) => {
    return (
      <Dropdown.Item onClick={onSearchRole} id={role.id}>
        {role.name}
      </Dropdown.Item>
    );
  };

  const mapUsers = (aUser) => {
    return (
      <UsersList
        user={aUser}
        key={aUser.userId}
        update={onUpdateStatus}
        add={onAddRole}
      />
    );
  };

  const onUpdateStatus = (payload) => {
    _logger("Payload for API call: ", payload);

    userService
      .updateStatus(payload, payload.id)
      .then(onUpdateSuccess)
      .catch(onUpdateError);
  };
  const onUpdateSuccess = (response) => {
    _logger("Successful Update", response);
    toastr["success"]("Status Successfully Updated!");
  };
  const onUpdateError = (error) => {
    _logger(error);
    toastr["error"]("Unsuccessful, try again");
  };

  const onAddRole = (payload) => {
    _logger("Payload for API call: ", payload);

    userService.addRole(payload).then(onAddSuccess).catch(onAddError);
  };
  const onAddSuccess = (response) => {
    _logger("Successful Update", response);
    toastr["success"]("Role Successfully Updated!");
  };
  const onAddError = (error) => {
    _logger(error);
    toastr["error"]("Unsuccessful, try again");
  };

  const onSearchChange = (e) => {
    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.searchQuery = e.target.value;
      newPaginate.pageIndex = 0;

      return newPaginate;
    });
  };
  const onSearchStatus = (e) => {
    _logger("Status", e.target.id);
    const newStatus = e.target.id;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.status = newStatus;
      newPaginate.role = "";
      newPaginate.pageIndex = 0;

      return newPaginate;
    });
  };
  const onSearchRole = (e) => {
    _logger("Role", e.target.id);
    const newRole = e.target.id;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.role = newRole;
      newPaginate.status = "";
      newPaginate.pageIndex = 0;

      return newPaginate;
    });
  };
  const onReset = () => {
    userService
      .paginate(0, paginate.pageSize)
      .then(onPaginateSuccess)
      .catch(onPaginateError);
  };

  const onChange = (page) => {
    _logger(page);
    setPaginate((prevState) => {
      const newPaginate = { ...prevState };

      newPaginate.pageIndex = page - 1;

      return newPaginate;
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <h1 className="mb-1 h2 fw-bold">Users</h1>
        <tr>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Filter by Role
              </Dropdown.Toggle>
              <Dropdown.Menu>{newLookUp.mappedRoles}</Dropdown.Menu>
            </Dropdown>
          </th>
          <th>
            <Dropdown className="user-filter-button-margin">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Filter by Status
              </Dropdown.Toggle>
              <Dropdown.Menu>{newLookUp.mappedSTypes}</Dropdown.Menu>
            </Dropdown>
          </th>
          <th>
            <button
              type="button"
              className="btn btn-outline-primary user-filter-button-margin"
              onClick={onReset}
            >
              Reset Filters
            </button>
          </th>
        </tr>
      </div>
      <div className="tab-content">
        <div
          role="tabpanel"
          id="react-aria2488443972-35-tabpane-list"
          aria-labelledby="react-aria2488443972-35-tab-list"
          className="fade pb-4 tab-pane active show"
        >
          <div className="mb-5 card">
            <div className="p-0 card-body">
              <div className="overflow-hidden">
                <div className="row">
                  <div className="mb-lg-0 mb-2 px-5 py-4 col-lg-4 col-md-4 col-sm-4">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search Users"
                      onChange={onSearchChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 filtering-by-display">
                    {paginate.role
                      ? `Filtering By:  ${
                          newLookUp.roles[paginate.role - 1].name
                        }`
                      : ""}
                    {paginate.status
                      ? `Filtering By:  ${
                          newLookUp.sTypes[paginate.status - 1].name
                        }`
                      : ""}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <nav>
                      <Pagination
                        onChange={onChange}
                        current={paginate.pageIndex + 1}
                        total={paginate.totalCount}
                        pageSize={paginate.pageSize}
                        locale={locale}
                        className="pt-6"
                      />
                    </nav>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table role="table" className="text-nowrap table">
                  <thead className="table-light">
                    <tr role="row">
                      <th colSpan="1" role="columnheader">
                        NAME
                      </th>
                      <th colSpan="1" role="columnheader">
                        EMAIL
                      </th>
                      <th colSpan="1" role="columnheader">
                        ROLE
                      </th>
                      <th colSpan="1" role="columnheader">
                        STATUS
                      </th>
                      <th colSpan="3" role="columnheader"></th>
                    </tr>
                  </thead>
                  <tbody>{users.mappedArray}</tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="pb-5">
                    <nav>
                      <Pagination
                        onChange={onChange}
                        current={paginate.pageIndex + 1}
                        total={paginate.totalCount}
                        pageSize={paginate.pageSize}
                        locale={locale}
                        className="user-list-paginate-margin"
                      />
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UsersTable;
