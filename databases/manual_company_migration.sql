-- Manual SQL script to change company_type from ENUM to VARCHAR
-- Run these commands one by one in MySQL

-- 1. Connect to the database
USE masterdb;

-- 2. Check current table structure
DESCRIBE companies;

-- 3. Add temporary column
ALTER TABLE companies ADD COLUMN company_type_temp VARCHAR(100);

-- 4. Copy existing ENUM values to new column
UPDATE companies SET company_type_temp = CAST(company_type AS CHAR);

-- 5. Drop the old ENUM column
ALTER TABLE companies DROP COLUMN company_type;

-- 6. Rename the temporary column to original name
ALTER TABLE companies CHANGE COLUMN company_type_temp company_type VARCHAR(100);

-- 7. Verify the change
DESCRIBE companies;

-- 8. Check existing data
SELECT company_id, company_name, company_type FROM companies;

-- 9. Optional: Update existing data to match patient categories
-- UPDATE companies SET company_type = 'General' WHERE company_type = 'Corporate';
-- UPDATE companies SET company_type = 'Insurance' WHERE company_type = 'Insurance';
-- UPDATE companies SET company_type = 'TPA' WHERE company_type = 'TPA';