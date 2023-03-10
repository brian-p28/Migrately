USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[Users_SearchRoles]    Script Date: 1/13/2023 10:32:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 12/10/2022
-- Description: 
-- Code Reviewer: Josh Kohls

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[Users_SearchRoles]
								@PageIndex int
								,@PageSize int
								,@Query nvarchar(250)


as


/*


	Select *
	From dbo.Users

	Declare @PageIndex int = 0
			,@PageSize int = 100
			,@Query nvarchar(250) = '8'

	Execute dbo.Users_SearchRoles
							@PageIndex
							,@PageSize
							,@Query


*/


BEGIN


		Declare @offset int = @PageIndex * @PageSize

		SELECT u.[Id] as UserId
			,[FirstName]
			,[Mi]
			,[LastName]			
			,[AvatarUrl]
			,[Email]
			,st.Id
			,st.[Name] as Status
			,Role = (
						Select	r.Id
								,r.Name
						From dbo.Roles as r inner join dbo.UserRoles as ur
								on r.Id = ur.RoleId
						Where u.Id = ur.UserId
						For JSON AUTO
			)
			,TotalCount = COUNT(1) OVER()
		FROM [dbo].[Users] as u inner join dbo.StatusTypes as st
							on u.StatusId = st.Id
							inner join dbo.UserRoles as ur
							on ur.UserId = u.Id
							inner join dbo.Roles as r
							on r.Id = ur.RoleId

		WHERE	(r.Id = @Query)

		Group By u.Id, FirstName, Mi, LastName, AvatarUrl, Email, st.Id, st.Name
		ORDER BY u.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY


END
GO
