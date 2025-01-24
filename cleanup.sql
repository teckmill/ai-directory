-- Drop policies
DROP POLICY IF EXISTS "Enable read access for all users" ON categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON tools;
DROP POLICY IF EXISTS "Enable read access for all users" ON reviews;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON reviews;
DROP POLICY IF EXISTS "Enable update for review owners" ON reviews;
DROP POLICY IF EXISTS "Enable delete for review owners" ON reviews;
DROP POLICY IF EXISTS "Enable read access for all users" ON tool_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON tool_submissions;
DROP POLICY IF EXISTS "Enable delete for admins only" ON tool_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON admin_users;

-- Drop tables (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS tool_submissions;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS tools;
DROP TABLE IF EXISTS categories;

-- Drop enum type
DROP TYPE IF EXISTS pricing_type; 