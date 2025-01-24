-- Create enum for pricing types
CREATE TYPE pricing_type AS ENUM ('free', 'freemium', 'paid');

-- Create categories table
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tools table
CREATE TABLE tools (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  pricing pricing_type NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  website_url text NOT NULL,
  logo_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  pricing_details text,
  demo_url text,
  github_url text,
  documentation_url text,
  twitter_handle text,
  launch_date timestamp with time zone
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tool_submissions table
CREATE TABLE tool_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  pricing pricing_type NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  website_url text NOT NULL,
  logo_url text NOT NULL,
  pricing_details text,
  demo_url text,
  github_url text,
  documentation_url text,
  twitter_handle text,
  launch_date timestamp with time zone,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
); 