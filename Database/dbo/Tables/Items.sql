CREATE TABLE [dbo].[Items] (
    [id]         BIGINT     IDENTITY (1, 1) NOT NULL,
    [who]        NCHAR (50) NOT NULL,
    [what]       NCHAR (50) NOT NULL,
    [quantity]   INT        NOT NULL,
    [categoryId] BIGINT     NOT NULL,
    CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Items_Categories] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Categories] ([id])
);

