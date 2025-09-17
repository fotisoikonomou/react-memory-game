# 🧠 Memory Match (React + TypeScript)

A small but well-structured **Memory** game built with **React 18 + TypeScript + Vite**.  
It demonstrates clean state management, a custom timer hook, simple game logic, and a layout that’s easy to extend (levels, sounds, leaderboard, PWA, etc.).

---

## ✨ Features

- 4×4 grid with emoji pairs
- Move counter & timer
- **Best score** stored in `localStorage`
- Simple flip animations
- Clean architecture: `components / hooks / game / types / styles`

---

## 🧩 How to Play

Find all matching pairs in as few moves as possible.  
Each turn (flipping 2 cards) counts as **1 move**.  
The timer runs while you play and stops when you win.

---

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Plain CSS (no UI framework)

---

## 📁 Project Structure

src/
App.tsx
main.tsx
styles/
App.css
types/
index.ts
hooks/
useTimer.ts
game/
constants.ts
deck.ts
components/
GameCard.tsx

- `components/GameCard.tsx`: Single card component (flip/matched state, ARIA).
- `hooks/useTimer.ts`: Simple timer hook with start/stop/reset.
- `game/constants.ts`: Emojis, total pairs, storage keys.
- `game/deck.ts`: `makeDeck()` and `shuffle()` helpers.
- `types/index.ts`: TypeScript types (e.g., `Card`).
- `styles/App.css`: Styling & animations.

---

## 🚀 Getting Started

**Prerequisite:** Node.js 18+

```bash
# install dependencies
npm i

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
Open http://localhost:5173
