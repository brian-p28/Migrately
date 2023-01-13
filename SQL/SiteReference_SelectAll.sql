USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_SelectAll]    Script Date: 1/10/2023 9:15:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 11/16/2022
-- Description: Selects All from SiteReference table
--				(Paginated)(joins ReferenceTypes table)
-- Code Reviewer: Kenny Rosa

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[SiteReferences_SelectAll]
											@PageIndex int 
											,@PageSize int


as


/*

	Declare @PageIndex int = 0
			,@PageSize int = 6

	Execute [dbo].[SiteReferences_SelectAll]
											@PageIndex
											,@PageSize





	Select *
	From dbo.Users



*/


BEGIN


		Declare @offset int = @PageIndex * @PageSize

		SELECT	u.Id
				,u.FirstName
				,u.LastName
				,u.Email
				,Reference = (
								Select	rt.Id as Id
										,rt.Name as Name
								From dbo.ReferenceTypes as rt inner join dbo.SiteReferences as sr
										on rt.Id = sr.ReferenceTypeId
								Where u.Id = sr.UserId
								For JSON AUTO
				)				
				,TotalCount = COUNT(1) OVER()
		  FROM	[dbo].[SiteReferences] as sr inner join [dbo].[Users] as u
					on sr.UserId = u.Id

		Group by Id, u.FirstName, u.LastName, u.Email
		ORDER BY Id
		

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

		


END
