-- Teams: public read
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are publicly readable" ON teams FOR SELECT USING (true);

-- News articles: public read (active only)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active news articles are publicly readable" ON news_articles FOR SELECT USING (is_active = true);

-- Matches: public read
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Matches are publicly readable" ON matches FOR SELECT USING (true);

-- Standings: public read
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Standings are publicly readable" ON standings FOR SELECT USING (true);

-- User preferences: users can only access their own
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);
