# Copilot Instructions for Portfolio Website

## Project Overview
This is a React portfolio website built with Vite, TypeScript, and shadcn/ui components. The project features terminal-themed UI, typing animations, and a custom cursor system.

## Core Architecture

### Key Technologies
- **Vite + React 18** with SWC for fast builds
- **TypeScript** throughout the codebase
- **Tailwind CSS** with shadcn/ui component system
- **Framer Motion** for animations
- **React Router** for client-side routing
- **React Query** for state management

### Directory Structure
```
src/
├── components/        # Feature components (Hero, Projects, etc.)
├── components/ui/     # shadcn/ui base components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utilities and data
└── pages/            # Route components
```

## Essential Development Commands

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development build for debugging
- `npm run lint` - ESLint checking

## Critical Project Patterns

### Data-Driven Content
All portfolio content comes from `src/lib/data.json`:
```json
{
  "name": "Valentin Anicza",
  "projects": [...],
  "experience": [...],
  "skills": [...]
}
```
**Never hardcode content** - always reference this file for portfolio data.

### Custom Cursor System
The project uses a custom cursor context (`CursorContext`) with two states:
- `default` - Normal cursor
- `link` - Hover state for interactive elements

Always wrap interactive elements with cursor state changes:
```tsx
<div 
  onMouseEnter={() => setCursorType('link')}
  onMouseLeave={() => setCursorType('default')}
>
```

### Terminal Theme UI
The interface mimics terminal commands:
- Use `$` prompt indicators: `<span className="text-primary">$</span>`
- File listing format: `ls -l ./projects`
- Monospace font for terminal elements

### Animation Patterns
- **TypingAnimation**: Character-by-character text reveal
- **WordTypingAnimation**: Word-by-word cycling animation
- **Framer Motion**: Use consistent easing `[0.25, 1, 0.5, 1]`
- Stagger animations with 0.2s delay increments

### shadcn/ui Components
All UI components are in `src/components/ui/` and follow shadcn patterns:
- Use `cn()` utility for className merging
- Implement `asChild` prop for composition
- Follow variant-based styling with `class-variance-authority`

### Import Alias
Always use `@/` alias for src imports:
```tsx
import { Button } from "@/components/ui/button";
import data from "@/lib/data.json";
```

### Route Structure
- `/` - Main portfolio page (Index.tsx)
- `/projects/:slug` - Individual project pages
- `/experience/:slug` - Individual experience pages
- `*` - 404 page (NotFound.tsx)

## Key Files to Understand

- `src/lib/data.json` - All portfolio content
- `src/context/CursorContext.tsx` - Custom cursor implementation
- `vite.config.ts` - Build configuration with lovable-tagger for development
- `tailwind.config.ts` - Theme configuration with CSS variables

## Development Notes

- The project uses `lovable-tagger` plugin in development mode for component identification
- Custom CSS variables defined in `src/index.css` for theming
- All components should be responsive with mobile-first approach
- Use Lucide React icons consistently throughout the project