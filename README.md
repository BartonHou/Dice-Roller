# 🎲 Dice & Card Roller (React + Lottie + Bootstrap)

An interactive mini‑app that rolls a die and draws playing cards with smooth Lottie animations. It showcases clean React component patterns, lightweight state management, and a modular UI built with `react-bootstrap`.

---

## ✨ Features

- **Dice roller** with animation and running history gallery.
- **Card drawer** with a full 54‑card deck (includes **Black Joker** and **Red Joker**), click the card name to toggle between **symbol view** (e.g., `Ace♥`) and **text view** (e.g., `Ace of hearts`).
- **Reusable UI components**: Lottie animation wrapper, button bar, and image gallery.
- **Tiny, readable utilities** for randomness and asset importing.
- **Bootstrap‑powered layout** with responsive containers.

---

## 🧱 Tech stack

- **React** (functional components + hooks)
- **lottie-react** for animations
- **react-bootstrap** for UI
- **PNG assets** for dice faces and cards
- **(Webpack)** `require.context` for importing asset folders (see Vite note below)

---

## 📦 Project structure (key parts)

```
src/
  components/
    ButtonBar.js          # Reusable action bar with “Roll/Draw”, Delete, Delete All
    Gallery.js            # Image strip to show history of results
    LottieAnimation.js    # Thin wrapper around lottie-react for animations
    RollADice.js          # Dice roller page: animation + state + gallery
    DrawACard.js          # Card drawer page: animation + name toggle + gallery
    Home.js               # Simple landing component
    Car.js                # Example/demo component
  util/
    dice_util.js          # rollDice() and dice asset importer
    card_util.js          # Joker-aware deck importer + determineCard() + drawCard()
  resource/
    dice/                 # dice face PNGs: 1.png ... 6.png
    cards/                # card PNGs named as 1H, 2H ... 13H, ... plus JkrBlk.png, JkrRed.png
    lottie/               # e.g., dice6.json, card_deck.json
```

> **Asset naming**
>
> - Dice: `resource/dice/1.png` … `6.png`
> - Cards: `resource/cards/<rank><Suit>.png` where rank ∈ `1..13`, Suit ∈ `{H, D, S, C}` (e.g., `1H.png`), **plus** `JkrBlk.png` and `JkrRed.png`.
>
> Card order is computed programmatically; Jokers are appended to make a 54‑card deck.

---

## 🚀 Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add Bootstrap CSS** (in your app entry, typically `src/main.jsx` or `src/index.js`):
   ```js
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

3. **Run the app**
   ```bash
   # If using Vite:
   npm run dev
   # If using Create React App:
   npm start
   ```

> If your toolchain is **Vite**, replace usages of `require.context` with `import.meta.glob`.
> See the note in **Vite users** below.

---

## 🕹️ How it works (quick tour)

### Roll a die
- `RollADice` keeps a small state: whether we’ve rolled, the current number, and the history list.
- On **Roll**, it plays the Lottie dice animation, generates a number `1..6`, pushes it to history, and updates the display.
- The **Gallery** renders the corresponding PNGs so the user sees the full roll history.

### Draw a card
- `DrawACard` stores whether we’ve drawn, the current card index, and the history list.
- On **Draw**, it plays a deck‑shuffle animation, generates an integer in `1..54`, and updates state.
- Click the **card name** to toggle between a symbol label (e.g., `Queen♣`) and a full text label (e.g., `Queen of clubs`).

### Utilities
- `dice_util`: `rollDice()` returns an integer `1..6`; `importAll()` loads dice face images.
- `card_util`: builds a 54‑card deck that includes **Black Joker** and **Red Joker**; `determineCard()` supports `useSymbols` and `returnStructured` for flexible labeling; `drawCard()` returns `1..54`.

---

## 🧩 Component APIs (props)

### `<ButtonBar />`
```ts
handleAction: () => void        // primary action (Roll/Draw)
handleDelete: () => void        // remove last history entry
handleDeleteAll: () => void     // clear history
move: string                    // button label ("Roll a Dice" | "Draw a Card")
```

### `<Gallery />`
```ts
gallery: string[]               // list of image URLs/modules to render
width?: number                  // each image width (px)
height?: number                 // each image height (px)
```

### `<LottieAnimation />`
```ts
lottieRef: React.Ref            // forwarded ref to control the animation
handleLoaded: () => void        // called when the DOM is ready; can seek to last frame
handleAction: object            // Lottie JSON data
width?: number
height?: number
```

---

## 🧪 Example usage

```jsx
// Roll a die
import RollADice from './components/RollADice';
// Draw a card
import DrawACard from './components/DrawACard';
```

Routes, nav, and layout are up to you—`Home` and `Car` are minimal examples you can delete or expand.

---

## 🛠️ Notes & tips

- The deck includes **Jokers** by design; if you need a strict 52‑card deck, filter out results where `index >= 52`.
- `determineCard(n, { useSymbols: true|false, returnStructured: true|false })` lets you format how card names appear.
- The history galleries are intentionally simple; for large histories consider virtualization or pagination.
- Lottie animation is initialized to the **last frame** so the page doesn’t auto‑animate on load.

---

## 🧭 For Vite users (replace `require.context`)

If your bundler is Vite, rewrite the image importers with `import.meta.glob`:

```js
// dice_util.js
const modules = import.meta.glob('../resource/dice/*.png', { eager: true });
export const importAll = () => Object.values(modules).map((m) => m.default);
```

For cards, you may also build a sorted list from `import.meta.glob('../resource/cards/*.png', { eager: true })`
and append the Joker images at the end.

---

## 🗺️ Roadmap ideas

- Seedable RNG for reproducible rolls/draws
- Probabilities & statistics panel (mean, variance, streaks)
- Keyboard shortcuts (e.g., Space to roll/draw, Backspace to delete last)
- Animated transitions for gallery updates
- Theme switch (dark/light)
- Sound effects timed to animation keyframes

---

## 📄 License

MIT (or your choice).

---

## 🙌 Credits

- Dice and card PNGs belong to their respective creators (add attribution if required).
- Animations powered by **Lottie**.
- UI powered by **react-bootstrap**.
