-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

-- Create policies for tools
CREATE POLICY "Enable read access for all users" ON tools
  FOR SELECT USING (true);

-- Create policies for reviews
CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for review owners" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for review owners" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for tool_submissions
CREATE POLICY "Enable read access for all users" ON tool_submissions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON tool_submissions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for admins only" ON tool_submissions
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Create policies for admin_users
CREATE POLICY "Enable read access for all users" ON admin_users
  FOR SELECT USING (true); 