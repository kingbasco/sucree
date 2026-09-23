# Sucree Design Language

## Brief

**Subject:** a one-year anniversary memory experience for two people.

**Single job:** make one person feel that she is stepping back into the story of the two of them, then invite her to keep choosing it.

**Platform:** mobile-first web experience, responsive on desktop.

**Register:** intimate, cinematic, editorial, tactile. Never a generic Valentine template.

## Creative direction

Sucree should feel like opening a private memory box rather than browsing a website.

The visual world combines:
- dark film-room atmosphere
- warm paper and photograph tones
- restrained plum as the emotional accent
- oversized editorial typography
- physical-photo details without fake skeuomorphism
- movement that behaves like a camera, not a notification system

### Signature

**The yes becomes a doorway.**

The opening question has two yes buttons. Choosing either one should trigger the same cinematic transition. The selected button grows beyond its frame, the interface darkens, and the first memory appears through the transition.

## Palette

| Token | Value | Role |
|---|---|---|
| `--ink` | `#15130F` | primary background |
| `--paper` | `#F1E9DD` | primary warm surface |
| `--paper-soft` | `#D9CCBC` | secondary surface |
| `--plum` | `#6B3E55` | emotional accent |
| `--plum-deep` | `#38202D` | deep accent |
| `--mist` | `#AFA69A` | quiet text |
| `--white` | `#FFFDF8` | high contrast text |

This is deliberately not pink, candy, or neon.

## Typography

- Display: `Cormorant Garamond`, fallback Georgia
- UI/body: `DM Sans`, fallback system sans-serif
- Utility: `DM Mono`, fallback monospace

Display type is used for the emotional sentence. Body type stays quiet and functional.

## Type scale

- Hero: clamp(3.2rem, 10vw, 8.5rem)
- Chapter title: clamp(2.5rem, 7vw, 6rem)
- Body: 1rem to 1.125rem
- Utility: 0.68rem to 0.75rem

Avoid long display lines. Headlines should feel like a thought, not a paragraph.

## Layout

- 8px spacing base.
- Large negative space.
- `min-height: 100dvh`, never fixed viewport height for the main experience.
- Mobile gutters: 20px.
- Desktop gutters: 40px to 64px.
- Photo surfaces use restrained radius and thin borders, not floating card grids.

## Motion language

Motion intensity: **7/10**.

Motion has four jobs:
1. **Arrival:** establish the emotional atmosphere.
2. **Focus:** guide the eye to the current memory.
3. **Transition:** make chapter changes feel like turning a page or moving a camera.
4. **Feedback:** make touch actions feel physical.

Preferred timing:
- micro feedback: 160 to 240ms
- UI transitions: 500 to 800ms
- cinematic transitions: 900 to 1400ms
- ambient movement: slow and barely noticeable

Use spring or eased movement where the object should feel physical. Do not animate everything.

## Interaction rules

- Touch first. No important interaction depends on hover.
- Buttons have a minimum 44px touch target.
- Every animated surface has a reduced-motion fallback.
- Focus states remain visible.
- Do not use fake scroll instructions.
- Do not use decorative hearts as a default visual language.
- Do not use progress bars as decoration.
- Chapter numbers only appear when they communicate actual story order.
- Photos should eventually be real relationship photos. Until then, explicit image slots are acceptable in the foundation.

## Phase 0 acceptance criteria

- The project builds as a clean React/Vite app.
- Visual tokens live in one place.
- The opening interaction is usable on touch and keyboard.
- Motion is purposeful and reduced-motion aware.
- The experience has a clear identity before any real photos are added.
- The next chapter can be added without rewriting the shell.