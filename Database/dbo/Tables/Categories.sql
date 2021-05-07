CREATE TABLE [dbo].[Categories] (
    [id]      BIGINT       IDENTITY (1, 1) NOT NULL,
    [name]    VARCHAR (50) NOT NULL,
    [eventId] BIGINT       NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Categories_Events] FOREIGN KEY ([eventId]) REFERENCES [dbo].[Events] ([id]) ON DELETE CASCADE
);

