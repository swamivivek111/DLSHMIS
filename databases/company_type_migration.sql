-- Migration to change company_type from ENUM to VARCHAR to support patient categories
USE masterdb;

-- Step 1: Add new column
ALTER TABLE companies ADD COLUMN company_type_new VARCHAR(100);

-- Step 2: Copy existing data
UPDATE companies SET company_type_new = company_type;

-- Step 3: Drop old column
ALTER TABLE companies DROP COLUMN company_type;

-- Step 4: Rename new column
ALTER TABLE companies CHANGE COLUMN company_type_new company_type VARCHAR(100);

-- Step 5: Update existing data to use patient category names (optional - can be done via application)
-- UPDATE companies SET company_type = 'General' WHERE company_type = 'Corporate';
-- UPDATE companies SET company_type = 'Insurance' WHERE company_type = 'Insurance';
-- UPDATE companies SET company_type = 'TPA' WHERE company_type = 'TPA';