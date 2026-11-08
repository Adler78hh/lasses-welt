// Sokoban-Löser: Breitensuche über Schritte (kürzeste Lösung in Schritten), mit toten Feldern und 2x2-Blockaden.
// Eingabe (stdin): Zeilen eines Levels, Ende mit Leerzeile. Ausgabe: "ok <schritte> <schübe> <LURD>" oder "fail <grund>".
#include <bits/stdc++.h>
using namespace std;
int W, H, N; vector<char> wall, goal, live;
int main(int argc, char** argv) {
  double limit = argc > 1 ? atof(argv[1]) : 20; size_t maxStates = argc > 2 ? atol(argv[2]) : 12000000;
  vector<string> rows; string line; while (getline(cin, line)) { if (line.empty()) break; rows.push_back(line); }
  H = rows.size(); W = 0; for (auto& r : rows) W = max(W, (int)r.size()); N = W * H;
  wall.assign(N, 0); goal.assign(N, 0); live.assign(N, 0); int player = -1; vector<int> boxes;
  for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) { char c = x < (int)rows[y].size() ? rows[y][x] : ' '; int i = y * W + x;
    if (c == '#') wall[i] = 1; if (c == '.' || c == '*' || c == '+') goal[i] = 1; if (c == '$' || c == '*') boxes.push_back(i); if (c == '@' || c == '+') player = i; }
  // Außenbereich als Wand behandeln: nur vom Spieler erreichbare Felder zählen
  vector<char> reach(N, 0); { deque<int> q{player}; reach[player] = 1; while (!q.empty()) { int p = q.front(); q.pop_front();
    int x = p % W, y = p / W; int nb[4] = { y > 0 ? p - W : -1, y < H - 1 ? p + W : -1, x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1 };
    for (int k = 0; k < 4; k++) { int q2 = nb[k]; if (q2 < 0 || wall[q2] || reach[q2]) continue; reach[q2] = 1; q.push_back(q2); } } }
  for (int i = 0; i < N; i++) if (!reach[i]) wall[i] = 1;
  int D[4] = { -W, W, -1, 1 }; const char MV[4] = { 'u', 'd', 'l', 'r' };
  { deque<int> q; for (int i = 0; i < N; i++) if (goal[i] && !wall[i]) { live[i] = 1; q.push_back(i); }
    while (!q.empty()) { int b = q.front(); q.pop_front(); for (int k = 0; k < 4; k++) { int nb = b + D[k], pl = b + 2 * D[k];
      if (nb < 0 || pl < 0 || nb >= N || pl >= N || wall[nb] || wall[pl] || live[nb]) continue; live[nb] = 1; q.push_back(nb); } } }
  sort(boxes.begin(), boxes.end()); int B = boxes.size();
  struct St { uint32_t parent; uint8_t mv; };
  vector<St> st; vector<uint16_t> data; // je Zustand: Spieler + B Kisten
  auto keyOf = [&](const uint16_t* s) { return string((const char*)s, (B + 1) * 2); };
  unordered_set<string> seen; seen.reserve(1 << 20);
  vector<uint16_t> s0(B + 1); s0[0] = player; for (int i = 0; i < B; i++) s0[i + 1] = boxes[i];
  data.insert(data.end(), s0.begin(), s0.end()); st.push_back({ UINT32_MAX, 0 }); seen.insert(keyOf(s0.data()));
  auto isGoalState = [&](const uint16_t* s) { for (int i = 1; i <= B; i++) if (!goal[s[i]]) return false; return true; };
  auto t0 = chrono::steady_clock::now();
  size_t head = 0; vector<char> boxAt(N, 0); vector<uint16_t> ns(B + 1);
  auto frozen = [&](int b) { // 2x2-Block aus Wänden/Kisten mit mindestens einer Kiste nicht im Ziel
    int x = b % W, y = b / W;
    for (int dx = -1; dx <= 0; dx++) for (int dy = -1; dy <= 0; dy++) { bool all = true, off = false;
      for (int a = 0; a < 2 && all; a++) for (int c = 0; c < 2; c++) { int xx = x + dx + a, yy = y + dy + c; if (xx < 0 || yy < 0 || xx >= W || yy >= H) { continue; }
        int i = yy * W + xx; if (wall[i]) continue; if (boxAt[i]) { if (!goal[i]) off = true; continue; } all = false; break; }
      if (all && off) return true; }
    return false; };
  while (head < st.size()) {
    const uint16_t* s = &data[head * (B + 1)];
    if (isGoalState(s)) { string path; size_t i = head; int pushes = 0; while (st[i].parent != UINT32_MAX) { char m = st[i].mv; path += m; if (isupper(m)) pushes++; i = st[i].parent; }
      reverse(path.begin(), path.end()); printf("ok %zu %d %s\n", path.size(), pushes, path.c_str()); return 0; }
    if ((head & 4095) == 0) { double el = chrono::duration<double>(chrono::steady_clock::now() - t0).count(); if (el > limit) { printf("fail zeit %zu\n", st.size()); return 0; } if (st.size() > maxStates) { printf("fail speicher %zu\n", st.size()); return 0; } }
    for (int i = 1; i <= B; i++) boxAt[s[i]] = 1;
    int p = s[0];
    for (int k = 0; k < 4; k++) { int np = p + D[k]; if (wall[np]) continue; bool push = boxAt[np];
      memcpy(ns.data(), s, (B + 1) * 2); ns[0] = np;
      if (push) { int t = np + D[k]; if (wall[t] || boxAt[t] || !live[t]) continue;
        for (int i = 1; i <= B; i++) if (ns[i] == np) ns[i] = t; sort(ns.begin() + 1, ns.end());
        boxAt[np] = 0; boxAt[t] = 1; bool fz = frozen(t); boxAt[t] = 0; boxAt[np] = 1; if (fz) continue; }
      string kk = keyOf(ns.data()); if (!seen.insert(kk).second) continue;
      data.insert(data.end(), ns.begin(), ns.end()); st.push_back({ (uint32_t)head, (uint8_t)(push ? toupper(MV[k]) : MV[k]) });
      s = &data[head * (B + 1)]; }
    for (int i = 1; i <= B; i++) boxAt[s[i]] = 0;
    head++; }
  printf("fail unloesbar\n"); return 0; }
