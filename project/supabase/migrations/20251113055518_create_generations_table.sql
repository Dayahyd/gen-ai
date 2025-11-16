/*
  # Create generations table

  1. New Tables
    - `generations`
      - `id` (uuid, primary key) - unique identifier for each generation
      - `prompt` (text) - the user's input prompt
      - `response` (text) - the AI-generated response
      - `created_at` (timestamptz) - timestamp of when the generation was created
  
  2. Security
    - Enable RLS on `generations` table
    - Add policy for anyone to insert new generations
    - Add policy for anyone to read all generations
*/

CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert generations"
  ON generations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read generations"
  ON generations
  FOR SELECT
  TO anon
  USING (true);
