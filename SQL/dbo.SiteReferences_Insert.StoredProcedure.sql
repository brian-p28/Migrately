USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Insert]    Script Date: 1/13/2023 10:32:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 11/16/2022
-- Description: Inserts into SiteReferences
-- Code Reviewer: Kenny Rosa

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[SiteReferences_Insert]
										@batchReferenceIds [dbo].[AddReferenceIds] READONLY
										,@UserId int


as


/*


		Declare @batchReferenceIds [dbo].[AddReferenceIds]
		Insert into @batchReferenceIds (Id)
		Values(4),(5)

		Declare @UserId int = '8'

		Execute [dbo].[SiteReferences_Insert]
											@batchReferenceIds
											,@UserId

		Select *
		From [dbo].[SiteReferences]
		Where UserId = @UserId










		Select *
		From dbo.Users

		Select *
		From dbo.ReferenceTypes


*/


BEGIN


		INSERT INTO [dbo].[SiteReferences]
				   
		Select	br.Id
				,@UserId

		From @batchReferenceIds as br


END
GO
