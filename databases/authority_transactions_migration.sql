-- Migration script to add transactions column to authority table
USE masterdb;

-- Add transactions column to authority table
ALTER TABLE authority 
ADD COLUMN transactions JSON;

COMMIT;