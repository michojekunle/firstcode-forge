-- Social Challenge System Migration
-- 4 new tables for likes and comments on challenges and submissions

-- Challenge likes (one per user per challenge)
CREATE TABLE IF NOT EXISTS challenge_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Challenge comments (threaded via parent_id)
CREATE TABLE IF NOT EXISTS challenge_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES challenge_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Submission likes (one per user per submission)
CREATE TABLE IF NOT EXISTS submission_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(submission_id, user_id)
);

-- Submission comments (threaded via parent_id)
CREATE TABLE IF NOT EXISTS submission_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES submission_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add social fields to challenges table
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS user_avatar TEXT;
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS estimated_time TEXT;
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS project_type TEXT;

-- Add social fields to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS user_avatar TEXT;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_challenge_likes_challenge ON challenge_likes(challenge_id);
CREATE INDEX IF NOT EXISTS idx_challenge_likes_user ON challenge_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_comments_challenge ON challenge_comments(challenge_id);
CREATE INDEX IF NOT EXISTS idx_submission_likes_submission ON submission_likes(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_comments_submission ON submission_comments(submission_id);
CREATE INDEX IF NOT EXISTS idx_challenges_public ON challenges(is_public) WHERE is_public = true;
