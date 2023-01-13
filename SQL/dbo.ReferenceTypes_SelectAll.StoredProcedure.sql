USE [Migrately]
GO
/****** Object:  StoredProcedure [dbo].[ReferenceTypes_SelectAll]    Script Date: 1/13/2023 10:32:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Pereyda, Brian
-- Create date: 11/16/2022
-- Description: Selects All of the Reference Types
-- Code Reviewer: Kenny Rosa

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER proc [dbo].[ReferenceTypes_SelectAll]


as


/*

		Execute [dbo].[ReferenceTypes_SelectAll]

*/


BEGIN


		SELECT	[Id]
				,[Name]
		FROM	[dbo].[ReferenceTypes]


END
GO
