using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReferences;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SiteReferenceService : ISiteReferenceService
    {
        IDataProvider _data = null;

        public SiteReferenceService(IDataProvider data)
        {
            _data = data;
        }


        public Paged<SiteReference> Pagination(int pageIndex, int pageSize)
        {
            Paged<SiteReference> pagedResult = null;

            List<SiteReference> result = null;

            string procName = "[dbo].[SiteReferences_SelectAll]";

            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    SiteReference siteReference = MapSingleSiteReference(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }

                    if (result == null)
                    {
                        result = new List<SiteReference>();
                    }

                    result.Add(siteReference);
                });

            if (result != null)
            {
                pagedResult = new Paged<SiteReference>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        private static SiteReference MapSingleSiteReference(IDataReader reader, ref int startingIndex)
        {
            SiteReference siteReference = new SiteReference();

            siteReference.UserId = reader.GetSafeInt32(startingIndex++);
            siteReference.FirstName = reader.GetSafeString(startingIndex++);
            siteReference.LastName = reader.GetSafeString(startingIndex++);
            siteReference.Email = reader.GetSafeString(startingIndex++);
            siteReference.Reference = reader.DeserializeObject<List<LookUp>>(startingIndex++);

            return siteReference;
        }           
 


        public int Add(SiteReferenceAddRequest model, int userId)
        {
            int id = 0;

            DataTable dateTable = null;

            if(model.ReferenceIds != null)
            {
                dateTable = MapModelsToTable(model.ReferenceIds);
            }

            string procName = "[dbo].[SiteReferences_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@batchReferenceIds", dateTable);

                    col.AddWithValue("@UserId", userId);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@UserId"].Value;

                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        private DataTable MapModelsToTable(List<int> ReferenceIds)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Id", typeof(int));

            foreach(int Id in ReferenceIds)
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
