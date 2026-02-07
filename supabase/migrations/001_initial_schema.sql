-- FirstCode Forge Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  total_lessons INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial courses
INSERT INTO courses (id, title, description, icon, total_lessons) VALUES
('flutter-fundamentals', 'Flutter Fundamentals', 'Master Flutter by understanding WHY things work, not just how.', '💙', 6),
('flutter-advanced', 'Flutter Advanced', 'Go beyond the basics. Master rendering, custom painters, and production architecture.', '🚀', 6),
('systems-design', 'Systems Design', 'Design scalable systems from first principles.', '🏗️', 6),
('dsa-fundamentals', 'DSA Fundamentals', 'Learn Big O, data structures, and algorithms from first principles.', '🧠', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons;

-- ============================================
-- COURSE STATS TABLE (for performance)
-- ============================================
CREATE TABLE IF NOT EXISTS course_stats (
  course_id TEXT PRIMARY KEY REFERENCES courses(id) ON DELETE CASCADE,
  avg_rating DECIMAL(2,1) DEFAULT 0,
  total_ratings INT DEFAULT 0,
  total_enrollments INT DEFAULT 0,
  avg_completion_hours DECIMAL(4,1) DEFAULT 0
);

-- Initialize stats for each course
INSERT INTO course_stats (course_id, avg_rating, total_enrollments) VALUES
('flutter-fundamentals', 4.9, 2400),
('flutter-advanced', 4.8, 1200),
('systems-design', 4.9, 3100),
('dsa-fundamentals', 4.9, 2150)
ON CONFLICT (course_id) DO NOTHING;

-- ============================================
-- USER ENROLLMENTS & PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  progress INT DEFAULT 0,
  completed_lessons INT[] DEFAULT '{}',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (user_id, course_id)
);

-- Enable RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Users can view/update their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments" ON enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- COURSE RATINGS
-- ============================================
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can read ratings (for displaying)
CREATE POLICY "Anyone can view ratings" ON ratings
  FOR SELECT USING (true);

-- Users can insert/update their own ratings
CREATE POLICY "Users can insert own ratings" ON ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- AI-GENERATED CHALLENGES
-- ============================================
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id TEXT REFERENCES courses(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  skills TEXT[],
  steps TEXT[],
  language TEXT DEFAULT 'JavaScript',
  estimated_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Public challenges are visible to all
CREATE POLICY "Anyone can view challenges" ON challenges
  FOR SELECT USING (true);

-- Users can insert their own challenges
CREATE POLICY "Users can insert own challenges" ON challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- USER SUBMISSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT,
  story TEXT,
  github_link TEXT,
  is_public BOOLEAN DEFAULT false,
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public submissions visible to all, private only to owner
CREATE POLICY "View public or own submissions" ON submissions
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

-- Users can insert their own submissions
CREATE POLICY "Users can insert own submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own submissions
CREATE POLICY "Users can update own submissions" ON submissions
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update course stats when a rating is added
CREATE OR REPLACE FUNCTION update_course_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_stats
  SET 
    avg_rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM ratings
      WHERE course_id = NEW.course_id
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM ratings
      WHERE course_id = NEW.course_id
    )
  WHERE course_id = NEW.course_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rating updates
DROP TRIGGER IF EXISTS on_rating_change ON ratings;
CREATE TRIGGER on_rating_change
  AFTER INSERT OR UPDATE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_course_rating_stats();

-- Function to update enrollment count
CREATE OR REPLACE FUNCTION update_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_stats
  SET total_enrollments = (
    SELECT COUNT(*)
    FROM enrollments
    WHERE course_id = NEW.course_id
  )
  WHERE course_id = NEW.course_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for enrollment updates
DROP TRIGGER IF EXISTS on_enrollment_change ON enrollments;
CREATE TRIGGER on_enrollment_change
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_enrollment_count();

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT SELECT ON courses TO anon, authenticated;
GRANT SELECT ON course_stats TO anon, authenticated;
GRANT ALL ON enrollments TO authenticated;
GRANT ALL ON ratings TO authenticated;
GRANT ALL ON challenges TO authenticated;
GRANT ALL ON submissions TO authenticated;
