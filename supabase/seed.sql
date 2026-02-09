-- =============================================================================
-- BR Soccer Tracker — Seed Data
-- Run via: supabase db reset (applies migrations + seed.sql automatically)
-- =============================================================================

-- ─── TEAMS (Série A) ────────────────────────────────────────────────────────

INSERT INTO teams (external_id, name, name_en, short_name, badge_url, competition, city) VALUES
  (127, 'Flamengo', 'Flamengo', 'FLA', 'https://media.api-sports.io/football/teams/127.png', 'serie_a', 'Rio de Janeiro'),
  (128, 'Santos', 'Santos', 'SAN', 'https://media.api-sports.io/football/teams/128.png', 'serie_a', 'Santos'),
  (129, 'Palmeiras', 'Palmeiras', 'PAL', 'https://media.api-sports.io/football/teams/129.png', 'serie_a', 'São Paulo'),
  (130, 'Botafogo', 'Botafogo', 'BOT', 'https://media.api-sports.io/football/teams/130.png', 'serie_a', 'Rio de Janeiro'),
  (131, 'Corinthians', 'Corinthians', 'COR', 'https://media.api-sports.io/football/teams/131.png', 'serie_a', 'São Paulo'),
  (132, 'Vasco da Gama', 'Vasco da Gama', 'VAS', 'https://media.api-sports.io/football/teams/132.png', 'serie_a', 'Rio de Janeiro'),
  (133, 'Grêmio', 'Gremio', 'GRE', 'https://media.api-sports.io/football/teams/133.png', 'serie_a', 'Porto Alegre'),
  (134, 'Internacional', 'Internacional', 'INT', 'https://media.api-sports.io/football/teams/134.png', 'serie_a', 'Porto Alegre'),
  (135, 'Cruzeiro', 'Cruzeiro', 'CRU', 'https://media.api-sports.io/football/teams/135.png', 'serie_a', 'Belo Horizonte'),
  (136, 'Atlético Mineiro', 'Atletico Mineiro', 'CAM', 'https://media.api-sports.io/football/teams/136.png', 'serie_a', 'Belo Horizonte'),
  (137, 'Bahia', 'Bahia', 'BAH', 'https://media.api-sports.io/football/teams/137.png', 'serie_a', 'Salvador'),
  (138, 'Vitória', 'Vitoria', 'VIT', 'https://media.api-sports.io/football/teams/138.png', 'serie_a', 'Salvador'),
  (140, 'Fortaleza', 'Fortaleza', 'FOR', 'https://media.api-sports.io/football/teams/140.png', 'serie_a', 'Fortaleza'),
  (142, 'Athletico Paranaense', 'Athletico Paranaense', 'CAP', 'https://media.api-sports.io/football/teams/142.png', 'serie_a', 'Curitiba'),
  (145, 'Fluminense', 'Fluminense', 'FLU', 'https://media.api-sports.io/football/teams/145.png', 'serie_a', 'Rio de Janeiro'),
  (146, 'São Paulo', 'Sao Paulo', 'SAO', 'https://media.api-sports.io/football/teams/146.png', 'serie_a', 'São Paulo'),
  (147, 'Bragantino', 'Bragantino', 'BRA', 'https://media.api-sports.io/football/teams/147.png', 'serie_a', 'Bragança Paulista'),
  (154, 'Cuiabá', 'Cuiaba', 'CUI', 'https://media.api-sports.io/football/teams/154.png', 'serie_a', 'Cuiabá'),
  (155, 'Juventude', 'Juventude', 'JUV', 'https://media.api-sports.io/football/teams/155.png', 'serie_a', 'Caxias do Sul'),
  (156, 'Mirassol', 'Mirassol', 'MIR', 'https://media.api-sports.io/football/teams/156.png', 'serie_a', 'Mirassol');

-- ─── TEAMS (Série B) ────────────────────────────────────────────────────────

INSERT INTO teams (external_id, name, name_en, short_name, badge_url, competition, city) VALUES
  (1281, 'Coritiba', 'Coritiba', 'CFC', 'https://media.api-sports.io/football/teams/1281.png', 'serie_b', 'Curitiba'),
  (1282, 'Guarani', 'Guarani', 'GUA', 'https://media.api-sports.io/football/teams/1282.png', 'serie_b', 'Campinas'),
  (1283, 'Avaí', 'Avai', 'AVA', 'https://media.api-sports.io/football/teams/1283.png', 'serie_b', 'Florianópolis'),
  (1284, 'Ponte Preta', 'Ponte Preta', 'PON', 'https://media.api-sports.io/football/teams/1284.png', 'serie_b', 'Campinas'),
  (1285, 'Vila Nova', 'Vila Nova', 'VIL', 'https://media.api-sports.io/football/teams/1285.png', 'serie_b', 'Goiânia'),
  (1286, 'Operário', 'Operario', 'OPE', 'https://media.api-sports.io/football/teams/1286.png', 'serie_b', 'Ponta Grossa'),
  (1287, 'Novorizontino', 'Novorizontino', 'NOV', 'https://media.api-sports.io/football/teams/1287.png', 'serie_b', 'Novo Horizonte'),
  (1288, 'Chapecoense', 'Chapecoense', 'CHA', 'https://media.api-sports.io/football/teams/1288.png', 'serie_b', 'Chapecó'),
  (1289, 'CRB', 'CRB', 'CRB', 'https://media.api-sports.io/football/teams/1289.png', 'serie_b', 'Maceió'),
  (1290, 'Goiás', 'Goias', 'GOI', 'https://media.api-sports.io/football/teams/1290.png', 'serie_b', 'Goiânia');

-- ─── MATCHES (Live — 2 currently in progress) ──────────────────────────────

INSERT INTO matches (external_id, competition, season, round, status, home_team_id, away_team_id, home_score, away_score, home_score_ht, away_score_ht, kickoff_at, venue, elapsed_minutes) VALUES
  (90001, 'serie_a', 2026, 'Regular Season - 6', 'live', 127, 129, 2, 1, 1, 0, NOW() - INTERVAL '55 minutes', 'Maracanã', 55),
  (90002, 'serie_a', 2026, 'Regular Season - 6', 'live', 131, 146, 0, 0, 0, 0, NOW() - INTERVAL '38 minutes', 'Neo Química Arena', 38);

-- ─── MATCHES (Finished — recent results) ────────────────────────────────────

INSERT INTO matches (external_id, competition, season, round, status, home_team_id, away_team_id, home_score, away_score, home_score_ht, away_score_ht, kickoff_at, venue, elapsed_minutes) VALUES
  (90003, 'serie_a', 2026, 'Regular Season - 5', 'finished', 129, 130, 3, 1, 2, 0, NOW() - INTERVAL '1 day 3 hours', 'Allianz Parque', 90),
  (90004, 'serie_a', 2026, 'Regular Season - 5', 'finished', 134, 133, 2, 2, 1, 1, NOW() - INTERVAL '1 day 5 hours', 'Beira-Rio', 90),
  (90005, 'serie_a', 2026, 'Regular Season - 5', 'finished', 136, 145, 1, 0, 0, 0, NOW() - INTERVAL '2 days 3 hours', 'Mineirão', 90),
  (90006, 'serie_a', 2026, 'Regular Season - 5', 'finished', 137, 140, 2, 3, 1, 2, NOW() - INTERVAL '2 days 5 hours', 'Arena Fonte Nova', 90),
  (90007, 'serie_a', 2026, 'Regular Season - 4', 'finished', 127, 131, 4, 1, 2, 0, NOW() - INTERVAL '4 days 3 hours', 'Maracanã', 90),
  (90008, 'serie_a', 2026, 'Regular Season - 4', 'finished', 146, 135, 1, 1, 0, 1, NOW() - INTERVAL '4 days 5 hours', 'MorumBIS', 90),
  (90009, 'serie_a', 2026, 'Regular Season - 4', 'finished', 130, 132, 2, 0, 1, 0, NOW() - INTERVAL '5 days 3 hours', 'Nilton Santos', 90),
  (90010, 'serie_a', 2026, 'Regular Season - 4', 'finished', 142, 147, 0, 1, 0, 0, NOW() - INTERVAL '5 days 5 hours', 'Ligga Arena', 90),
  (90011, 'serie_a', 2026, 'Regular Season - 3', 'finished', 133, 127, 1, 3, 0, 1, NOW() - INTERVAL '6 days 3 hours', 'Arena do Grêmio', 90),
  (90012, 'serie_a', 2026, 'Regular Season - 3', 'finished', 145, 129, 0, 2, 0, 1, NOW() - INTERVAL '6 days 5 hours', 'Maracanã', 90);

-- ─── MATCHES (Copa do Brasil — finished) ────────────────────────────────────

INSERT INTO matches (external_id, competition, season, round, status, home_team_id, away_team_id, home_score, away_score, home_score_ht, away_score_ht, kickoff_at, venue, elapsed_minutes) VALUES
  (90013, 'copa_do_brasil', 2026, 'Round of 16 - 1st Leg', 'finished', 127, 140, 2, 1, 1, 0, NOW() - INTERVAL '3 days 3 hours', 'Maracanã', 90),
  (90014, 'copa_do_brasil', 2026, 'Round of 16 - 1st Leg', 'finished', 129, 134, 1, 0, 0, 0, NOW() - INTERVAL '3 days 5 hours', 'Allianz Parque', 90),
  (90015, 'copa_do_brasil', 2026, 'Round of 16 - 1st Leg', 'finished', 136, 131, 3, 2, 2, 1, NOW() - INTERVAL '3 days 7 hours', 'Mineirão', 90);

-- ─── MATCHES (Scheduled — upcoming fixtures) ────────────────────────────────

INSERT INTO matches (external_id, competition, season, round, status, home_team_id, away_team_id, kickoff_at, venue) VALUES
  (90016, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 129, 127, NOW() + INTERVAL '3 days 21 hours', 'Allianz Parque'),
  (90017, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 130, 134, NOW() + INTERVAL '3 days 23 hours', 'Nilton Santos'),
  (90018, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 146, 133, NOW() + INTERVAL '4 days 21 hours', 'MorumBIS'),
  (90019, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 132, 136, NOW() + INTERVAL '4 days 23 hours', 'São Januário'),
  (90020, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 140, 142, NOW() + INTERVAL '5 days 21 hours', 'Arena Castelão'),
  (90021, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 135, 137, NOW() + INTERVAL '5 days 23 hours', 'Mineirão'),
  (90022, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 145, 131, NOW() + INTERVAL '6 days 21 hours', 'Maracanã'),
  (90023, 'serie_a', 2026, 'Regular Season - 7', 'scheduled', 147, 138, NOW() + INTERVAL '7 days 21 hours', 'Nabi Abi Chedid'),
  (90024, 'copa_do_brasil', 2026, 'Round of 16 - 2nd Leg', 'scheduled', 140, 127, NOW() + INTERVAL '8 days 21 hours', 'Arena Castelão'),
  (90025, 'copa_do_brasil', 2026, 'Round of 16 - 2nd Leg', 'scheduled', 134, 129, NOW() + INTERVAL '8 days 23 hours', 'Beira-Rio');

-- ─── STANDINGS (Série A — after 5 rounds) ───────────────────────────────────

INSERT INTO standings (competition, season, team_external_id, position, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, form) VALUES
  ('serie_a', 2026, 127,  1, 5, 4, 1, 0, 14,  4, 10, 13, 'WWWDW'),
  ('serie_a', 2026, 129,  2, 5, 4, 0, 1, 11,  4,  7, 12, 'WWWLW'),
  ('serie_a', 2026, 130,  3, 5, 3, 2, 0,  8,  3,  5, 11, 'WDWDW'),
  ('serie_a', 2026, 140,  4, 5, 3, 1, 1,  9,  5,  4, 10, 'WWDLW'),
  ('serie_a', 2026, 136,  5, 5, 3, 1, 1,  8,  5,  3, 10, 'WDWWL'),
  ('serie_a', 2026, 134,  6, 5, 2, 3, 0,  7,  4,  3,  9, 'DWDDW'),
  ('serie_a', 2026, 146,  7, 5, 2, 2, 1,  6,  4,  2,  8, 'WDWDL'),
  ('serie_a', 2026, 147,  8, 5, 2, 2, 1,  5,  4,  1,  8, 'DWWLD'),
  ('serie_a', 2026, 131,  9, 5, 2, 1, 2,  7,  7,  0,  7, 'WLWDL'),
  ('serie_a', 2026, 142, 10, 5, 2, 1, 2,  5,  5,  0,  7, 'LDWWL'),
  ('serie_a', 2026, 135, 11, 5, 2, 1, 2,  6,  7, -1,  7, 'WDLLW'),
  ('serie_a', 2026, 133, 12, 5, 1, 3, 1,  6,  6,  0,  6, 'DLWDD'),
  ('serie_a', 2026, 137, 13, 5, 1, 3, 1,  5,  5,  0,  6, 'DDDWL'),
  ('serie_a', 2026, 145, 14, 5, 1, 2, 2,  4,  6, -2,  5, 'DLLWD'),
  ('serie_a', 2026, 132, 15, 5, 1, 2, 2,  3,  5, -2,  5, 'LDWDL'),
  ('serie_a', 2026, 154, 16, 5, 1, 1, 3,  4,  8, -4,  4, 'LLWLD'),
  ('serie_a', 2026, 138, 17, 5, 1, 1, 3,  3,  7, -4,  4, 'LDLWL'),
  ('serie_a', 2026, 155, 18, 5, 0, 3, 2,  3,  7, -4,  3, 'DLDLD'),
  ('serie_a', 2026, 156, 19, 5, 0, 2, 3,  2,  8, -6,  2, 'LLDLD'),
  ('serie_a', 2026, 128, 20, 5, 0, 1, 4,  2, 10, -8,  1, 'LLLDL');

-- ─── STANDINGS (Série B — after 5 rounds) ───────────────────────────────────

INSERT INTO standings (competition, season, team_external_id, position, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, form) VALUES
  ('serie_b', 2026, 1287,  1, 5, 4, 1, 0, 10, 3,  7, 13, 'WWWDW'),
  ('serie_b', 2026, 1290,  2, 5, 3, 2, 0,  8, 4,  4, 11, 'WDWDW'),
  ('serie_b', 2026, 1281,  3, 5, 3, 1, 1,  7, 4,  3, 10, 'WWDLW'),
  ('serie_b', 2026, 1285,  4, 5, 3, 0, 2,  6, 5,  1,  9, 'LWWWL'),
  ('serie_b', 2026, 1289,  5, 5, 2, 2, 1,  7, 5,  2,  8, 'WDDWL'),
  ('serie_b', 2026, 1286,  6, 5, 2, 2, 1,  5, 4,  1,  8, 'DWDWL'),
  ('serie_b', 2026, 1284,  7, 5, 2, 1, 2,  5, 5,  0,  7, 'LDWWL'),
  ('serie_b', 2026, 1282,  8, 5, 1, 2, 2,  4, 6, -2,  5, 'DLLWD'),
  ('serie_b', 2026, 1288,  9, 5, 1, 1, 3,  3, 7, -4,  4, 'LLDWL'),
  ('serie_b', 2026, 1283, 10, 5, 0, 2, 3,  2, 8, -6,  2, 'LLDLD');

-- ─── NEWS ARTICLES ──────────────────────────────────────────────────────────

INSERT INTO news_articles (external_id, title, title_en, description, description_en, content, content_en, source_name, source_url, image_url, published_at, competition, team_tags, language, is_active) VALUES
  (
    'seed-news-001',
    'Flamengo goleia e assume a liderança do Brasileirão',
    'Flamengo thrashes opponents and takes Brasileirão lead',
    'Com gols de Arrascaeta e Pedro, o Rubro-Negro venceu por 4 a 1 no Maracanã e chegou à ponta da tabela.',
    'With goals from Arrascaeta and Pedro, the Rio club won 4-1 at Maracanã to take the top spot.',
    'O Flamengo fez a festa da torcida no Maracanã na noite desta quarta-feira. Com um futebol envolvente e eficiente, o time comandado pelo técnico goleou o adversário por 4 a 1 e assumiu a liderança isolada do Campeonato Brasileiro Série A 2026. Arrascaeta abriu o placar aos 12 minutos do primeiro tempo com um golaço de fora da área. Pedro ampliou de cabeça antes do intervalo. No segundo tempo, o Flamengo seguiu dominante e marcou mais dois gols, consolidando a vitória.',
    'Flamengo delighted their fans at Maracanã on Wednesday night. With an exciting and efficient performance, the team cruised to a 4-1 victory to take sole leadership of the 2026 Brasileirão Série A. Arrascaeta opened the scoring in the 12th minute with a stunning long-range effort. Pedro headed in the second before halftime. In the second half, Flamengo continued to dominate and scored two more goals to seal the win.',
    'GloboEsporte',
    'https://ge.globo.com/futebol/times/flamengo/',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    NOW() - INTERVAL '6 hours',
    'serie_a',
    '{127, 131}',
    'pt',
    true
  ),
  (
    'seed-news-002',
    'Palmeiras vence clássico contra o Botafogo e se mantém na briga pelo título',
    'Palmeiras wins derby against Botafogo and stays in title race',
    'Vitória por 3 a 1 no Allianz Parque mantém o Verdão na cola do líder Flamengo.',
    'A 3-1 win at Allianz Parque keeps Palmeiras close behind leaders Flamengo.',
    'O Palmeiras mostrou sua força em casa e derrotou o Botafogo por 3 a 1 no Allianz Parque, em jogo válido pela 5ª rodada do Brasileirão. A vitória mantém o Verdão na segunda colocação, a apenas um ponto do líder Flamengo. O primeiro gol saiu logo aos 8 minutos, com um chute cruzado de fora da área. O Botafogo ainda descontou no segundo tempo, mas o Palmeiras respondeu rapidamente com mais dois gols e garantiu os três pontos.',
    'Palmeiras showed their home strength by defeating Botafogo 3-1 at Allianz Parque in a round 5 Brasileirão clash. The win keeps them in second place, just one point behind leaders Flamengo. The first goal came in the 8th minute with a curling shot from outside the box. Botafogo pulled one back in the second half, but Palmeiras quickly responded with two more goals to secure all three points.',
    'ESPN Brasil',
    'https://www.espn.com.br/futebol/palmeiras/',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    NOW() - INTERVAL '28 hours',
    'serie_a',
    '{129, 130}',
    'pt',
    true
  ),
  (
    'seed-news-003',
    'Grenal termina empatado em jogo eletrizante no Beira-Rio',
    'Grenal derby ends in a draw in electrifying match at Beira-Rio',
    'Internacional e Grêmio empataram em 2 a 2 em partida com muita emoção e dois gols nos acréscimos.',
    'Internacional and Grêmio drew 2-2 in a match full of drama and two goals in stoppage time.',
    'O clássico Grenal, um dos maiores do futebol brasileiro, não decepcionou. Internacional e Grêmio empataram em 2 a 2 no Beira-Rio, em partida marcada por muita intensidade e dois gols nos minutos finais. O Internacional abriu o placar no primeiro tempo e o Grêmio empatou no início do segundo. Um gol do Inter aos 87 minutos parecia selar a vitória, mas o Grêmio arrancou o empate nos acréscimos, provocando uma explosão de emoções nas arquibancadas.',
    'The Grenal derby, one of the biggest rivalries in Brazilian football, did not disappoint. Internacional and Grêmio drew 2-2 at Beira-Rio in a match marked by intensity and two goals in the final minutes. Internacional took the lead in the first half and Grêmio equalized early in the second. A goal from Inter in the 87th minute seemed to seal the victory, but Grêmio snatched a draw in stoppage time, causing an explosion of emotions in the stands.',
    'UOL Esporte',
    'https://www.uol.com.br/esporte/futebol/',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop',
    NOW() - INTERVAL '30 hours',
    'serie_a',
    '{134, 133}',
    'pt',
    true
  ),
  (
    'seed-news-004',
    'Copa do Brasil: Flamengo e Palmeiras avançam nas oitavas de final',
    'Copa do Brasil: Flamengo and Palmeiras advance in round of 16',
    'Os dois gigantes venceram os jogos de ida e largam na frente para as partidas de volta.',
    'Both giants won their first leg matches and have the advantage going into the second legs.',
    'Flamengo e Palmeiras fizeram valer o mando de campo e venceram seus jogos de ida nas oitavas de final da Copa do Brasil 2026. O Flamengo derrotou o Fortaleza por 2 a 1 no Maracanã, enquanto o Palmeiras bateu o Internacional por 1 a 0 no Allianz Parque. Os jogos de volta acontecem na próxima semana. Ambos os times demonstraram controle tático e eficiência ofensiva, características que os colocam como favoritos ao título.',
    'Flamengo and Palmeiras made the most of home advantage and won their first leg matches in the 2026 Copa do Brasil round of 16. Flamengo beat Fortaleza 2-1 at Maracanã, while Palmeiras defeated Internacional 1-0 at Allianz Parque. The second legs take place next week. Both teams showed tactical control and offensive efficiency, qualities that make them favorites for the title.',
    'GloboEsporte',
    'https://ge.globo.com/futebol/copa-do-brasil/',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop',
    NOW() - INTERVAL '3 days 2 hours',
    'copa_do_brasil',
    '{127, 129, 140, 134}',
    'pt',
    true
  ),
  (
    'seed-news-005',
    'Mercado da bola: São Paulo negocia reforço para o meio-campo',
    'Transfer market: São Paulo negotiates midfield reinforcement',
    'Tricolor busca contratação de meia argentino para fortalecer o elenco no segundo semestre.',
    'The club seeks to sign an Argentine midfielder to strengthen the squad for the second half of the season.',
    'O São Paulo está em negociações avançadas para contratar um meia argentino que atua no futebol europeu. Segundo fontes próximas à diretoria, o jogador de 26 anos tem contrato até 2027 com seu clube atual e o Tricolor oferece um vínculo de três temporadas. A contratação faz parte do plano de reforços do técnico para a segunda metade do Brasileirão e a disputa da Copa do Brasil.',
    'São Paulo is in advanced negotiations to sign an Argentine midfielder currently playing in European football. According to sources close to the board, the 26-year-old player has a contract until 2027 with his current club and São Paulo is offering a three-season deal. The signing is part of the manager''s reinforcement plan for the second half of the Brasileirão and the Copa do Brasil campaign.',
    'ESPN Brasil',
    'https://www.espn.com.br/futebol/sao-paulo/',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=450&fit=crop',
    NOW() - INTERVAL '2 days 4 hours',
    NULL,
    '{146}',
    'pt',
    true
  ),
  (
    'seed-news-006',
    'Análise: as revelações do Brasileirão 2026 até aqui',
    'Analysis: the breakout stars of 2026 Brasileirão so far',
    'Jovens talentos se destacam nas primeiras rodadas e chamam atenção de clubes europeus.',
    'Young talents shine in the opening rounds and attract attention from European clubs.',
    'As primeiras rodadas do Brasileirão 2026 revelaram jovens promessas que vêm se destacando em seus clubes. Atacantes sub-23 de Fortaleza e Botafogo lideram a artilharia da competição, enquanto um volante de 19 anos do Athletico Paranaense impressiona pela maturidade tática. Olheiros de clubes europeus já marcam presença nos estádios brasileiros, de olho nas próximas janelas de transferência.',
    'The opening rounds of the 2026 Brasileirão have revealed promising young players who are standing out at their clubs. Under-23 strikers from Fortaleza and Botafogo lead the competition''s scoring charts, while a 19-year-old defensive midfielder from Athletico Paranaense impresses with his tactical maturity. Scouts from European clubs are already present at Brazilian stadiums, keeping an eye on the next transfer windows.',
    'ge.globo.com',
    'https://ge.globo.com/futebol/brasileirao-serie-a/',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop',
    NOW() - INTERVAL '1 day 8 hours',
    'serie_a',
    '{140, 130, 142}',
    'pt',
    true
  ),
  (
    'seed-news-007',
    'Atlético Mineiro vence o Fluminense e entra no G-5',
    'Atletico Mineiro beats Fluminense and enters top 5',
    'Gol solitário de atacante no segundo tempo garante vitória importante no Mineirão.',
    'Lone striker goal in the second half secures important win at Mineirão.',
    'O Atlético Mineiro conquistou uma vitória importante ao derrotar o Fluminense por 1 a 0 no Mineirão, pela 5ª rodada do Brasileirão. O único gol da partida saiu no segundo tempo, após jogada trabalhada pelo lado esquerdo. Com o resultado, o Galo subiu para a 5ª posição na tabela e se aproxima da zona de classificação para a Libertadores.',
    'Atlético Mineiro secured an important victory by defeating Fluminense 1-0 at Mineirão in round 5 of the Brasileirão. The only goal came in the second half, after a well-worked move down the left side. With the result, Galo moved up to 5th place in the table and is closing in on the Libertadores qualification zone.',
    'UOL Esporte',
    'https://www.uol.com.br/esporte/futebol/atletico-mg/',
    'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=450&fit=crop',
    NOW() - INTERVAL '2 days 1 hour',
    'serie_a',
    '{136, 145}',
    'pt',
    true
  ),
  (
    'seed-news-008',
    'CBF divulga tabela detalhada das próximas rodadas do Brasileirão',
    'CBF releases detailed schedule for upcoming Brasileirão rounds',
    'Rodadas 7 e 8 terão jogos em horários variados para atender à grade de TV.',
    'Rounds 7 and 8 will have matches at varied times to fit the TV schedule.',
    'A Confederação Brasileira de Futebol (CBF) divulgou a tabela detalhada das rodadas 7 e 8 do Campeonato Brasileiro Série A 2026. Os jogos serão distribuídos entre quarta-feira e domingo, com horários variando das 18h30 às 21h30 (horário de Brasília). Destaque para o clássico Palmeiras x Flamengo, marcado para sábado às 21h no Allianz Parque, jogo que promete ser o principal duelo da rodada.',
    'The Brazilian Football Confederation (CBF) has released the detailed schedule for rounds 7 and 8 of the 2026 Brasileirão Série A. Matches will be spread across Wednesday to Sunday, with kickoff times ranging from 6:30 PM to 9:30 PM (Brasília time). The highlight is the Palmeiras vs Flamengo clash, scheduled for Saturday at 9 PM at Allianz Parque, which promises to be the marquee matchup of the round.',
    'GloboEsporte',
    'https://ge.globo.com/futebol/brasileirao-serie-a/',
    'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=450&fit=crop',
    NOW() - INTERVAL '4 hours',
    'serie_a',
    '{129, 127}',
    'pt',
    true
  );
