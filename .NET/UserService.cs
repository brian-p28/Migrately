using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using Sabio.Models.Requests.Messages;
using Sabio.Data;
using System.Collections.Generic;
using Sabio.Models.Requests.Users;
using Sabio.Models.Domain.Users;
using System;
using Sabio.Models.Enums;
using Stripe;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public void Update(UsersStatusUpdateRequest model)
        {
            string procName = "[dbo].[Users_UpdateStatus]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);

                    col.AddWithValue("@StatusId", model.StatusId);
                },
                returnParameters: null);
        }

        public Paged<User> Pagination(int pageIndex, int pageSize)
        {
            Paged<User> pagedResult = null;

            List<User> result = null;

            string procName = "[dbo].[Users_SelectAllV2]";

            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User users = SingleUserMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<User>();
                    }

                    result.Add(users);
                });

            if (result != null)
            {
                pagedResult = new Paged<User>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

#nullable enable
        public Paged<User> SearchPagination(int pageIndex, int pageSize, string? query, int? role, int? status)
#nullable disable
        {
            Paged<User> pagedResult = null;

            List<User> result = null;

            string procName = "[dbo].[Users_Search]";

            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                    parameterCollection.AddWithValue("@RoleId", role);
                    parameterCollection.AddWithValue("@StatusId", status);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User users = SingleUserMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<User>();
                    }

                    result.Add(users);
                });

            if (result != null)
            {
                pagedResult = new Paged<User>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
#nullable disable

        public Paged<User> SearchStatus(int pageIndex, int pageSize, string query)
        {
            Paged<User> pagedResult = null;

            List<User> result = null;

            string procName = "[dbo].[Users_SearchStatus]";

            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User users = SingleUserMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<User>();
                    }

                    result.Add(users);
                });

            if (result != null)
            {
                pagedResult = new Paged<User>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<User> SearchRole(int pageIndex, int pageSize, string query)
        {
            Paged<User> pagedResult = null;

            List<User> result = null;

            string procName = "[dbo].[Users_SearchRoles]";

            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User users = SingleUserMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<User>();
                    }

                    result.Add(users);
                });

            if (result != null)
            {
                pagedResult = new Paged<User>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public int AddRoles(UserRolesAddRequest model)
        {
            int id = 0;

            DataTable dataTable = null;

            if(model.RoleId != null)
            {
                dataTable = MapModelsToTable(model.RoleId);
            }

            string procName = "[dbo].[UserRoles_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@batchRoleIds", dataTable);
                    col.AddWithValue("@UserId", model.UserId);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@UserId"].Value;

                    int.TryParse(oId.ToString(), out id);
                });
                return id;
        }

        private DataTable MapModelsToTable(List<int> RoleId)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Id", typeof(int));

            foreach (int Id in RoleId)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, Id);

                dt.Rows.Add(dr);
            }

            return dt;
        }

    }
}