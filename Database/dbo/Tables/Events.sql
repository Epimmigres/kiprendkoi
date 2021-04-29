CREATE TABLE [dbo].[Events] (
    [id]          BIGINT        IDENTITY (1, 1) NOT NULL,
    [name]        VARCHAR (50)  NOT NULL,
    [description] VARCHAR (MAX) NULL,
    [email]       VARCHAR (MAX) NOT NULL,
    [date]        DATETIME      NULL,
    [location]    VARCHAR (MAX) NULL,
    [eventHash]   VARCHAR (15)  NOT NULL,
    CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED ([id] ASC)
);

