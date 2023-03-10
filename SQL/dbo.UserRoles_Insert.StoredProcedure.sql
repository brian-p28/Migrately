USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[UserRoles_Insert]    Script Date: 1/13/2023 10:32:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 12/16/2022
-- Description: Adds Roles to User
-- Code Reviewer: Juan Pereida

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[UserRoles_Insert]
									@batchRoleIds [dbo].[UserRoles_BatchInsert] READONLY
									,@UserId int


as


/*

		Declare @batchRoleIds [dbo].[UserRoles_BatchInsert]
		Insert into @batchRoleIds (Id)
		Values(2),(3)

		Declare @UserId int = '1'

		Execute [dbo].[UserRoles_Insert]
											@batchRoleIds
											,@UserId

		Select *
		From [dbo].[UserRoles]
		Where UserId = @UserId






		Select *
		From dbo.Users

		Select *
		From dbo.Roles

*/


BEGIN


		INSERT INTO [dbo].[UserRoles]
				   
		Select	@UserId
				,br.Id

		From @batchRoleIds as br



END
GO
