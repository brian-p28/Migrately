using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Enums;
using Sabio.Models.Requests.Email;
using Sabio.Models.Requests.SiteReferences;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Services.SendGridEmail;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using SendGrid;
using System;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserAuthApiController : BaseApiController
    {
        private IUserService _service = null;
        private IEmailService _emailService = null;
        private IAuthenticationService<int> _authService;
        private ISiteReferenceService _siteReferenceService = null;

        public UserAuthApiController(IUserService service
            , IEmailService emailService
            , ILogger<UserAuthApiController> logger
            , IAuthenticationService<int> authService
            , ISiteReferenceService siteReferenceService): base(logger)
        {
            _service = service;
            _emailService = emailService;
            _authService = authService;
            _siteReferenceService = siteReferenceService;
        }
        

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<User>>> GetPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.Pagination(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

#nullable enable
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<User>>> SearchPaginate(int pageIndex, int pageSize, string? query, int? role, int? status)
#nullable disable
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.SearchPagination(pageIndex, pageSize, query, role, status);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }

        [HttpGet("searchstatus")]
        public ActionResult<ItemResponse<Paged<User>>> SearchStatus(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.SearchStatus(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }

        [HttpGet("searchrole")]
        public ActionResult<ItemResponse<Paged<User>>> SearchRole(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.SearchRole(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UsersStatusUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
             
        [HttpPost("addrole")]
        public ActionResult<ItemResponse<int>> AddRoles(UserRolesAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.AddRoles(model);

                ItemResponse<int> response = new ItemResponse<int>();

                result = Created201(response);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

    }
}
