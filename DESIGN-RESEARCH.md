# Crewzy design refinement — source review

Reviewed 24 September 2026. Keep the earlier centred hero and established light
design. Improve contrast and motion without another layout replacement.

## References actually inspected

### Cruip Simple and its public landing-page source

[Simple product page](https://cruip.com/simple/) and
[public source](https://github.com/cruip/tailwind-landing-page-template), revision
`909e38e3249ac575017864a202188b48ef016c9c`:

- [Hero component](https://github.com/cruip/tailwind-landing-page-template/blob/909e38e3249ac575017864a202188b48ef016c9c/components/hero-home.tsx): centred headline, constrained description, dark body text and a clear primary action.
- [Layout](https://github.com/cruip/tailwind-landing-page-template/blob/909e38e3249ac575017864a202188b48ef016c9c/app/%28default%29/layout.tsx): AOS configured for one-time reveals, disabled on phones, with 700ms ease-out-cubic animation.
- [Animation styles](https://github.com/cruip/tailwind-landing-page-template/blob/909e38e3249ac575017864a202188b48ef016c9c/app/css/additional-styles/theme.css): restrained 10px entrance offsets.

The paid Simple source was not accessed. No Cruip code or assets were copied.
Crewzy keeps GSAP instead of adding another animation library.

### Tailwind Radiant

Read the [official implementation article and its published code excerpts](https://tailwindcss.com/blog/2024-09-12-radiant-a-beautiful-new-marketing-site-template),
published in 2024, and the [public demo](https://radiant.tailwindui.com/).
The article favours keeping information available rather than making readers
wait for a reveal. Its examples coordinate decorative movement through parent
hover variants and paused CSS timelines. These are useful interaction
principles, not a reason to replace Crewzy's framework. The complete paid
template source was not accessed.

### Other visual references

The [Salient public demo](https://salient.tailwindui.com/) provides another
centred SaaS composition and product-led feature presentation; only the public
page was inspected, not its paid source. Newer Cruip
[Relay](https://cruip.com/relay/) and [Cadence](https://cruip.com/cadence/) product
pages were reviewed, but their dark direction does not fit the requested light
Crewzy design.

## Applied to Crewzy

- Restore “A clearer way to run your people and work.” in its earlier centred
  composition, including the original benefit highlights.
- Darken muted copy, coloured module labels, captions and secondary links while
  retaining pale surfaces and colourful icons. Use the
  [W3C contrast criteria](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
  for measured text pairs, not as a claim of a complete accessibility audit.
- Keep entrance text fully opaque. Use 10px movement, 600ms easing and one-time
  section reveals. Scrolling upward no longer fades entire content sections.
- Preserve reversible sticky card stacks and native-size foreground product
  text. Reduce their catch-up from 0.55s to 0.3s; GSAP documents numeric scrub as
  a [catch-up duration](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- Keep one scroll clock. Follow the
  [official Lenis/GSAP integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger)
  by disabling ticker lag smoothing; reduce Lenis duration from 1.05s to 0.85s.
  These changes reduce intentional delay, not a measured claim about frame rate.
- Preserve native touch scrolling, reduced-motion mode, manual mobile tabs,
  keyboard controls and the existing anchor offset.

No framework migration, paid-template purchase, deployment or new image
generation was needed for this refinement.
