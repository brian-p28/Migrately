using Sabio.Models;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReferences;

namespace Sabio.Services.Interfaces
{
    public interface ISiteReferenceService
    {
        Paged<SiteReference> Pagination(int pageIndex, int pageSize);
        int Add(SiteReferenceAddRequest model, int userId);
    }
}