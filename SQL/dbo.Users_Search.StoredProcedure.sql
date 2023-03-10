USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[Users_Search]    Script Date: 1/13/2023 10:32:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 12/01/2022
-- Description: 
-- Code Reviewer: Josh Kohls

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[Users_Search]
							@PageIndex int
							,@PageSize int
							,@Query nvarchar(250) = NULL
							,@RoleId int = NULL
							,@StatusId int = NULL


as


/*

	Select *
	From dbo.Users

	Declare @PageIndex int = 0
			,@PageSize int = 100
			,@Query nvarchar(250) = null --'Jo'
			,@RoleId int = null
			,@StatusId int = 2

	Execute dbo.Users_Search
							@PageIndex
							,@PageSize
							,@Query
							,@RoleId
							,@StatusId

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

		WHERE	(
					(
					@Query IS NULL
					OR FirstName LIKE '%' + @Query + '%'
					OR LastName LIKE '%' + @Query + '%'
					OR Email LIKE '%' + @Query + '%'
					)
				AND 
					(
					@RoleId IS NULL
					OR
					EXISTS 
						(
						SELECT 1
						FROM dbo.UserRoles AS ur
						WHERE u.Id = ur.UserId AND ur.RoleId = @RoleId
						)
					)
				AND
					(
					@StatusId IS NULL
					OR
					EXISTS
						(
						SELECT 1
						FROM dbo.StatusTypes as st
						WHERE u.StatusId = st.Id AND st.Id = @StatusId
						)
					)
				)

		ORDER BY u.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY


END
GO
