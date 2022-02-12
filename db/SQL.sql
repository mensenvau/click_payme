USE [db_name]
GO

/****** Object:  Table [dbo].[click_order]    Script Date: 10.02.2022 10:25:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[click_order](
	[id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[service_id] [numeric](18, 0) NOT NULL,
	[click_paydoc_id] [numeric](18, 0) NOT NULL,
	[order_id] [numeric](18, 0) NOT NULL,
	[action] [numeric](18, 0) NOT NULL,
	[sign_time] [varchar](200) NOT NULL,
	[error] [varchar](250) NOT NULL,
	[error_note] [varchar](250) NOT NULL,
	[sign_string] [varchar](250) NOT NULL,
	[click_trans_id] [varchar](250) NOT NULL
) ON [PRIMARY]
GO


USE [db_name]
GO

/****** Object:  Table [dbo].[transactions]    Script Date: 10.02.2022 10:25:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[transactions](
	[id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[create_time] [varchar](250) NOT NULL,
	[perform_time] [varchar](250) NULL,
	[cancel_time] [varchar](250) NULL,
	[state] [int] NOT NULL,
	[reason] [int] NULL,
	[receivers] [varchar](500) NULL,
	[order_id] [numeric](18, 0) NOT NULL,
	[time] [varchar](130) NOT NULL,
	[transaction_id] [varchar](130) NOT NULL,
 CONSTRAINT [PK_transactions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[transactions] ADD  DEFAULT (NULL) FOR [perform_time]
GO

ALTER TABLE [dbo].[transactions] ADD  DEFAULT (NULL) FOR [reason]
GO

ALTER TABLE [dbo].[transactions] ADD  DEFAULT (NULL) FOR [receivers]
GO


USE [new_test]
GO

/****** Object:  Table [dbo].[orders]    Script Date: 10.02.2022 10:26:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[orders](
	[id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[product_ids] [varchar](255) NULL,
	[amount] [numeric](18, 2) NOT NULL,
	[state] [int] NULL,
	[phone] [varchar](19) NOT NULL,
	[user_id] [numeric](18, 0) NULL,
	[vaqt] [datetime] NULL,
	[naqd] [int] NULL,
	[click_state] [int] NULL,
 CONSTRAINT [PK_orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[orders] ADD  CONSTRAINT [DF_orders_vaqt]  DEFAULT (getdate()) FOR [vaqt]
GO

ALTER TABLE [dbo].[orders] ADD  CONSTRAINT [DF_orders_naqd]  DEFAULT ((0)) FOR [naqd]
GO


