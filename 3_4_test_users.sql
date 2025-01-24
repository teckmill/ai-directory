-- Create test users in auth.users
INSERT INTO auth.users (id, email) VALUES
  ('00000000-0000-0000-0000-000000000001', 'test1@example.com'),
  ('00000000-0000-0000-0000-000000000002', 'test2@example.com'),
  ('00000000-0000-0000-0000-000000000003', 'test3@example.com');

-- Make one user an admin
INSERT INTO admin_users (user_id) VALUES
  ('00000000-0000-0000-0000-000000000001'); 