-- Big Bean Café — Offers table migration
-- Run this if the offers table is missing or uses the old schema.
-- Safe to run multiple times (DROP IF EXISTS + CREATE).

DROP TABLE IF EXISTS offers;

CREATE TABLE offers (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255)  NOT NULL,
  description  TEXT          NULL,
  discount_text VARCHAR(100) NULL,
  offer_code   VARCHAR(100)  NULL,
  start_date   DATE          NULL,
  end_date     DATE          NULL,
  image        VARCHAR(500)  NULL,
  button_text  VARCHAR(100)  NOT NULL DEFAULT 'Order Now',
  button_url   VARCHAR(500)  NOT NULL DEFAULT 'https://bigbeancafe.store',
  status       ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order   INT           NOT NULL DEFAULT 0,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
