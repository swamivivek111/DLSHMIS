-- Migration script to update cash_counters table counter_type from ENUM to VARCHAR
USE masterdb;

-- Update the counter_type column to VARCHAR to support multiple comma-separated values
ALTER TABLE cash_counters MODIFY COLUMN counter_type VARCHAR(255) NOT NULL;