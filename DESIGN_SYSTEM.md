# B2B Reviews - Design System

## Overview
A modern, energetic, and premium design system built with orange (#ff7a00) and black (#000000) as primary colors, enhanced with Framer Motion animations and smooth micro-interactions.

## Color Palette

### Primary Colors
- **Orange Primary**: `#ff7a00` (hsl(25 95% 53%))
- **Orange Light**: `#ff8a1a` (hsl(25 95% 60%))
- **Orange Dark**: `#e66a00` (hsl(25 95% 45%))
- **Orange Glow**: `rgba(255, 122, 0, 0.3)` - For glow effects

### Neutral Colors
- **Black**: `#000000` (hsl(0 0% 0%))
- **Dark Gray**: `#262626` (hsl(0 0% 15%))
- **Medium Gray**: `#404040` (hsl(0 0% 25%))
- **Light Gray**: `#f5f5f5` (hsl(0 0% 96%))
- **White**: `#ffffff` (hsl(0 0% 100%))

### Status Colors
- **Success**: `#10b981` (Green-600)
- **Warning**: `#f59e0b` (Amber-500)
- **Error**: `#ef4444` (Red-500)
- **Info**: `#3b82f6` (Blue-600)

## Typography

### Font Families
- **Display**: Poppins (Headings, logos, emphasis)
- **Body**: Inter (Body text, UI elements)
- **Fallback**: system-ui, sans-serif

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800
- **Black**: 900

### Typography Scale
- **H1**: 2.25rem (36px) - Hero headings
- **H2**: 1.875rem (30px) - Section headings
- **H3**: 1.5rem (24px) - Subsection headings
- **H4**: 1.25rem (20px) - Card titles
- **H5**: 1.125rem (18px) - Small headings
- **H6**: 1rem (16px) - Labels
- **Body**: 1rem (16px) - Default text
- **Small**: 0.875rem (14px) - Secondary text
- **Caption**: 0.75rem (12px) - Captions

## Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Border Radius
- **sm**: 6px
- **md**: 10px
- **lg**: 14px
- **xl**: 20px
- **2xl**: 24px
- **full**: 9999px

## Shadows
- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- **xl**: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
- **glow**: `0 0 20px rgba(255, 122, 0, 0.3)`

## Animation System

### Duration
- **Fast**: 150ms - Hover states, quick feedback
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Page transitions, complex animations

### Easing
- **Ease Out**: `cubic-bezier(0.16, 1, 0.3, 1)` - Default
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)` - Entrances
- **Spring**: `spring(400, 17)` - Bouncy interactions

### Key Animations
- **Fade In**: Opacity 0 → 1
- **Slide Up**: TranslateY(20px) → 0
- **Scale In**: Scale(0.95) → 1
- **Glow Pulse**: Box-shadow intensity animation
- **Float**: Subtle vertical movement
- **Bounce In**: Scale with spring physics

## Component Library

### Buttons
- **Primary**: Orange gradient with glow effect
- **Secondary**: Light gray with hover effects
- **Outline**: Transparent with orange border
- **Ghost**: Transparent with hover background
- **Glow**: Animated pulsing glow effect

### Cards
- **Default**: White background with subtle shadow
- **Hover**: Elevated shadow with orange accent
- **Interactive**: Scale and glow on hover

### Input Fields
- **Default**: Light background with focus ring
- **Focus**: Orange border with glow effect
- **Error**: Red border with error styling

### Navigation
- **Header**: Sticky with backdrop blur
- **Logo**: Animated icon with gradient text
- **Menu**: Smooth slide animations

## Dark Mode
- **Background**: Pure black (#000000)
- **Cards**: Very dark gray (#0a0a0a)
- **Text**: White with opacity variations
- **Borders**: Dark gray with orange accents
- **Primary**: Maintains orange color for consistency

## Responsive Design
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

## Accessibility
- **WCAG 2.1 AA** compliant
- **Focus indicators**: Orange ring with offset
- **Color contrast**: 4.5:1 minimum ratio
- **Motion**: Respects `prefers-reduced-motion`
- **Keyboard navigation**: Full support

## Usage Guidelines

### Do's
- Use orange for primary actions and highlights
- Maintain consistent spacing using the scale
- Apply animations purposefully for feedback
- Use Poppins for headings and emphasis
- Leverage gradients for visual interest

### Don'ts
- Don't use orange for error states
- Don't overuse animations (motion sickness)
- Don't mix font families inconsistently
- Don't use pure black text on pure black backgrounds
- Don't ignore accessibility requirements

## Implementation
This design system is implemented using:
- **Tailwind CSS** for utility classes
- **Framer Motion** for animations
- **CSS Custom Properties** for theming
- **React Components** for reusability
- **TypeScript** for type safety

## Future Enhancements
- Component variants for different contexts
- Advanced animation presets
- Design tokens for spacing and typography
- Automated accessibility testing
- Performance optimization guidelines
