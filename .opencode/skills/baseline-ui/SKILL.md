---
name: baseline-ui
description: Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues.
---

# Baseline UI

Enforces an opinionated UI baseline to prevent AI-generated interface slop.

## Stack
- MUST use Tailwind CSS defaults unless custom values already exist
- MUST use `motion/react` when JavaScript animation is required
- MUST use `cn` utility (`clsx` + `tailwind-merge`) for class logic

## Components
- MUST use accessible component primitives for keyboard/focus behavior
- MUST add `aria-label` to icon-only buttons

## Interaction
- MUST use `AlertDialog` for destructive actions
- MUST show errors next to where the action happens
- NEVER block paste in `input` or `textarea`

## Animation
- NEVER add animation unless explicitly requested
- MUST animate only compositor props (`transform`, `opacity`)
- NEVER exceed `200ms` for interaction feedback
- SHOULD respect `prefers-reduced-motion`

## Typography
- MUST use `text-balance` for headings
- MUST use `tabular-nums` for data
