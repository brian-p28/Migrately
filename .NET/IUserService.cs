using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        Paged<User> Pagination(int pageIndex, int pageSize);

#nullable enable
        Paged<User> SearchPagination(int pageIndex, int pageSize, string? query, int? role, int? status);
#nullable disable

        Paged<User> SearchStatus(int pageIndex, int pageSize, string query);

        Paged<User> SearchRole(int pageIndex, int pageSize, string query);

        void Update(UsersStatusUpdateRequest model);

        int AddRoles(UserRolesAddRequest model);
    }
}