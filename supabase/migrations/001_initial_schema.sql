-- Teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_en TEXT,
  short_name TEXT NOT NULL,
  badge_url TEXT,
  competition TEXT NOT NULL,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_teams_external_id ON teams(external_id);
CREATE INDEX idx_teams_competition ON teams(competition);

-- News articles
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  content TEXT,
  content_en TEXT,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  competition TEXT,
  team_tags INTEGER[] DEFAULT '{}',
  language TEXT DEFAULT 'pt',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_competition ON news_articles(competition);
CREATE INDEX idx_news_team_tags ON news_articles USING GIN(team_tags);
CREATE INDEX idx_news_active ON news_articles(is_active) WHERE is_active = TRUE;

-- Matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id INTEGER NOT NULL UNIQUE,
  competition TEXT NOT NULL,
  season INTEGER NOT NULL,
  round TEXT,
  status TEXT NOT NULL,
  home_team_id INTEGER NOT NULL,
  away_team_id INTEGER NOT NULL,
  home_score INTEGER,
  away_score INTEGER,
  home_score_ht INTEGER,
  away_score_ht INTEGER,
  kickoff_at TIMESTAMPTZ NOT NULL,
  venue TEXT,
  referee TEXT,
  elapsed_minutes INTEGER,
  raw_data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_matches_competition ON matches(competition);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_kickoff ON matches(kickoff_at DESC);
CREATE INDEX idx_matches_teams ON matches(home_team_id, away_team_id);
CREATE INDEX idx_matches_season ON matches(season);

-- Standings
CREATE TABLE standings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition TEXT NOT NULL,
  season INTEGER NOT NULL,
  team_external_id INTEGER NOT NULL,
  position INTEGER NOT NULL,
  played INTEGER DEFAULT 0,
  won INTEGER DEFAULT 0,
  drawn INTEGER DEFAULT 0,
  lost INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  goal_difference INTEGER DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  form TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(competition, season, team_external_id)
);

CREATE INDEX idx_standings_competition_season ON standings(competition, season);
CREATE INDEX idx_standings_position ON standings(position);

-- User preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT DEFAULT 'pt-BR',
  favorite_team_ids INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE INDEX idx_user_prefs_user ON user_preferences(user_id);
