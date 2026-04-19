---
title: "Cosmos"
summary: "A CSS-only interactive solar system — no JavaScript, just checkboxes and sibling selectors."
icon: "image.svg"
link: "https://planets.rkvempati.com"
date: "2026-04-18"
---

## Overview

I built this as a challenge to myself: make something with zero JavaScript. So here it is a simplified solar system, toggle planets on and off, watch them orbit — all of it running on pure CSS and HTML.

Check it out [here](https://planets.rkvempati.com).

## How CSS Pulls This Off

### Logic

CSS isn't usually thought of as a logic layer, but it kind of is. Each planet has a hidden `<input type="checkbox">` in the markup. A `<label>` in the control panel triggers it. When checked, the `:checked` pseudo-class combined with the sibling combinator `~` lets CSS react:

```css
#earth:checked ~ .scene .earth-orbit {
  display: block;
  animation: orbit 10s linear infinite;
}
```

No event listener needed or any state variable. The browser just handles it as part of the styling. Though it does lag sometime depending on the web browser you are using.

### Animation

All the motion comes from `@keyframes`. The orbit trick is a double rotation — rotate the wrapper around the sun, then counter-rotate the planet so it stays upright:

```css
@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(120px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(120px) rotate(-360deg);
  }
}
```

Each planet gets a different `animation-duration` and that alone gives them distinct speeds.

### Visual Details

The star field is a big layered `box-shadow` on a single element. The sun pulses with a `@keyframes` scale. Saturn's rings and Earth's cloud layer are `::before` and `::after` pseudo-elements. `radial-gradient` does most of the coloring. It's a lot of CSS doing things CSS isn't really supposed to do — which is kind of the point.
