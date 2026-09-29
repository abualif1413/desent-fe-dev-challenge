# Drag & Drop Workspace

A fully drag and drop web app that lets you freely customize your workspace and instantly see the result.

Move, resize, and arrange elements on a canvas, with every change reflected in real time.

## Features

- **Free-form workspace**: place elements anywhere on the canvas
- **Drag and drop**: move elements around with the mouse or touch
- **Resize**: adjust element size with built-in transform handles
- **Instant feedback**: changes are visible immediately, no save or refresh needed
- **Shared state**: element positions live in a global store, so any component can read or update them

## Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) | UI framework |
| [React Konva](https://konvajs.org/docs/react/) | Canvas rendering, drag and drop, and resizing |
| [Konva](https://konvajs.org/) | 2D canvas framework that React Konva is built on |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Tailwind CSS](https://tailwindcss.com/) | Styling library |

## Why These Choices?

### React Konva

React Konva is built on top of the HTML Canvas and already ships with **drag and drop** and **resize** support out of the box. This removes the need to implement pointer tracking, hit detection, and transform logic by hand, so we can focus on the workspace experience itself.

### Zustand

Element positions are handled in a Zustand store so they can be **accessed from any component**, such as the canvas, a sidebar, or a properties panel.

Zustand was chosen because it is:

- **Simple**: a small API that is easy to learn and read
- **Provider-free**: no wrapper component is needed around the app
- **Minimal setup**: a store is just a single function call

## How It Works

Each element on the canvas stores its position (and size) in the Zustand store. When a user drags or resizes an element, the store is updated, and every component subscribed to that state re-renders with the new values.

```
User drags/resizes element
        │
        ▼
 React Konva event (onDragEnd / onTransformEnd)
        │
        ▼
   Zustand store updated
        │
        ▼
 Canvas and other components re-render
```

### Example store

```js
import { create } from "zustand";

export const useWorkspaceStore = create((set) => ({
  elements: [
    { id: "1", x: 50, y: 50, width: 120, height: 80 },
  ],
  updateElement: (id, attrs) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...attrs } : el
      ),
    })),
}));
```

### Example usage in a component

```jsx
import { Stage, Layer, Rect } from "react-konva";
import { useWorkspaceStore } from "./store/useWorkspaceStore";

export default function Workspace() {
  const elements = useWorkspaceStore((s) => s.elements);
  const updateElement = useWorkspaceStore((s) => s.updateElement);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {elements.map((el) => (
          <Rect
            key={el.id}
            {...el}
            fill="skyblue"
            draggable
            onDragEnd={(e) =>
              updateElement(el.id, { x: e.target.x(), y: e.target.y() })
            }
          />
        ))}
      </Layer>
    </Stage>
  );
}
```

Any other component can read the same positions without a provider:

```jsx
const elements = useWorkspaceStore((s) => s.elements);
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

# Install dependencies
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:3000`).

### Build for production

```bash
npm run build
```

## License

This project is licensed under the GPL-3.0 License.