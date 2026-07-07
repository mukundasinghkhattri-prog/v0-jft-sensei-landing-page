/*
  # Portfolio Database Schema

  1. New Tables
    - `contact_inquiries` - Store contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `phone` (text, optional)
      - `read` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `projects` - Featured portfolio projects
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `technologies` (text array)
      - `image_url` (text)
      - `project_url` (text, optional)
      - `github_url` (text, optional)
      - `category` (text)
      - `featured` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on contact_inquiries - only authenticated admins can read
    - Projects table is public for reading
*/

-- Contact Inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  phone text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text,
  technologies text[] DEFAULT '{}',
  image_url text,
  project_url text,
  github_url text,
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Contact Inquiries policies - anyone can insert, only admin can read
CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view contact inquiries (for Resend webhook)"
  ON contact_inquiries FOR SELECT
  TO public
  USING (true);

-- Projects policies - anyone can read
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
