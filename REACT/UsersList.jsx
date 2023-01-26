import React, { useState, useEffect } from "react";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import toastr from "toastr";
import { Dropdown } from "react-bootstrap";
import { Edit, MoreVertical, FilePlus } from "react-feather";
import { Link } from "react-router-dom";

function UsersList(props) {
  const aUser = props.user;
  const _logger = debug.extend("UsersList");

  const [status, setStatus] = useState({
    statusTypes: [],
    mappedStatus: [],
  });
  const [payload, setPayload] = useState({
    id: 0,
    statusId: 0,
  });
  const [userRoles, setUserRoles] = useState({
    currentRoles: [],
  });
  const [addRole, setAddRole] = useState({
    userId: 0,
    roleId: [],
  });
  const [role, setRole] = useState({
    roles: [],
    mappedRoles: [],
  });

  const mapRoleOptions = (roles) => {
    return (
      <option value={roles.id} key={roles.id}>
        {roles.name}
      </option>
    );
  };

  useEffect(() => {
    lookUpService
      .LookUp(["StatusTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);

    lookUpService
      .LookUp(["Roles"])
      .then(onRoleLookUpSuccess)
      .catch(onRoleLookUpError);

    setUserRoles((prevState) => {
      const newRole = { ...prevState };
      newRole.currentRoles = aUser.role?.map(mapRole).join(", ");

      return newRole;
    });
  }, [userRoles.currentRoles]);
  const onLookUpSuccess = (response) => {
    const statusTypes = response.item.statusTypes;

    setStatus((prevState) => {
      const newStatus = { ...prevState };
      newStatus.statusTypes = statusTypes;
      newStatus.mappedStatus = statusTypes.map(mapStatus);

      return newStatus;
    });
  };
  const onLookUpError = (error) => {
    _logger(error);
    toastr["error"]("Unable To Load Statuses");
  };
  const onRoleLookUpSuccess = (response) => {
    const roleArray = response.item.roles;

    setRole((prevState) => {
      const newRole = { ...prevState };
      newRole.roles = roleArray;
      newRole.mappedRoles = roleArray.map(mapRoleOptions);

      return newRole;
    });
  };
  const onRoleLookUpError = (error) => {
    _logger(error);
  };

  const mapStatus = (status) => {
    return (
      <option value={status.id} key={status.id}>
        {status.name}
      </option>
    );
  };

  const mapRole = (role) => {
    return role?.name;
  };

  const statusUpdate = (e) => {
    const newId = e.target.id;
    const newValue = e.target.value;

    setPayload((prevState) => {
      const newPayload = { ...prevState };
      newPayload.id = newId;
      newPayload.statusId = newValue;

      return newPayload;
    });
  };

  const onUpdateClicked = () => {
    _logger(payload);
    props.update(payload);
  };
  const onAddClicked = () => {
    _logger(addRole);
    if (addRole.userId > 0) {
      props.add(addRole);
    } else {
      toastr["error"]("Unsuccessful, try again");
    }
  };

  const roleAdd = (e) => {
    const newId = e.target.id;
    const newValue = e.target.value;

    setAddRole((prevState) => {
      const newPayload = { ...prevState };
      newPayload.userId = newId;
      newPayload.roleId = [newValue];

      return newPayload;
    });
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  return (
    <React.Fragment>
      <tr role="row">
        <td row="cell">
          <div className="d-flex align-items-center">
            <img
              src={aUser.avatarUrl}
              alt=""
              className="rounded-circle avatar-md me-2"
            />
            <h5 className="mb-0">
              {aUser.firstName} {aUser.middleInitial} {aUser.lastName}
            </h5>
          </div>
        </td>
        <td row="cell">{aUser.email}</td>
        <td row="cell">
          <select
            className="form-control"
            id={aUser.userId}
            name="Role"
            onChange={roleAdd}
          >
            <option>{userRoles.currentRoles}</option>
            {role.mappedRoles}
          </select>
        </td>
        <td row="cell">
          <select
            className="form-control"
            id={aUser.userId}
            name="Status"
            onChange={statusUpdate}
          >
            <option>{aUser.status.name}</option>
            {status.mappedStatus}
          </select>
        </td>
        <td row="cell">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <MoreVertical size="15px" className="text-secondary" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Header>ACTION</Dropdown.Header>
              <Dropdown.Item
                eventKey="update"
                id="update"
                onClick={onUpdateClicked}
              >
                {" "}
                <Edit
                  size="18px"
                  color="green"
                  className="dropdown-item-icon"
                />{" "}
                Update Status
              </Dropdown.Item>
              <Dropdown.Item eventKey="add" id="add" onClick={onAddClicked}>
                {" "}
                <FilePlus
                  size="18px"
                  color="blue"
                  className="dropdown-item-icon"
                />{" "}
                Add Role
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </React.Fragment>
  );
}

UsersList.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    middleInitial: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    role: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    avatarUrl: PropTypes.string.isRequired,
  }),
  update: PropTypes.func,
  add: PropTypes.func,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default UsersList;
