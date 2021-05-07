CREATE TABLE [dbo].[Items] (
    [id]         BIGINT     IDENTITY (1, 1) NOT NULL,
    [who]        NVARCHAR(50) NOT NULL,
    [what]       NVARCHAR(50) NOT NULL,
    [quantity]   INT        NOT NULL,
    [categoryId] BIGINT     NOT NULL,
    CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Items_Categories] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Categories] ([id]) ON DELETE CASCADE
);

