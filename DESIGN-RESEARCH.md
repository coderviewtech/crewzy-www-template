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


## Visual refinement — 17 November 2026

Approved direction: keep the centred Crewzy composition, original headline and
supporting copy, cobalt `#2854d6`, navy `#14243c`, white canvas and pale module
surfaces. Help visitors see the product sooner and make interactive details feel
more deliberate on desktop and mobile.

References revisited for this direction: the public
[Magic UI Animated Beam documentation](https://magicui.design/docs/components/animated-beam)
for making a relationship visible through a connector, and
[GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
for preserving the existing single-clock scroll choreography. The saved
professional-web-craft collection also supplied Navbar Gallery, Scrolltide and
Evil Buttons as interaction references. No reference source was copied or paid
template purchased; no new animation package was needed.

- Wire the previously unattached CSS-module hero overrides, tighten spacing,
  and use bounded responsive type. Three compact mobile benefit cards replace
  the tall stack. On the 1280px review viewport, the dashboard starts at about
  562px; on 390px phones, about 585px.
- Keep the existing connected diagram geometry and scroll reveal; hover/focus
  adds a finite stroke emphasis to the relevant connector. Node links still
  navigate immediately on touch. CSS owns stroke emphasis; GSAP owns the draw
  progress, so they do not compete for the same property.
- Use the same Lucide icon family with 2px strokes and subtle icon-tile edges.
  All keyboard focus outlines now use the brand cobalt. Navigation descriptions
  use the stronger brand copy colour.
- Stagger the fully opaque hero entrance by 75ms, with 10px travel over 650ms.
  Menu entry travels 6px without fading text; the chat enters by 12px over
  240ms, answers by 5px over 200ms, and the meetup overview by 12px over 600ms.
  Hover/press feedback changes borders, surfaces and shadows. No endless motion.
- Preserve the existing reversible product stacks and native-size product text.
  Native touch scrolling, keyboard tabs, public FAQ access, the lead gate,
  reduced-motion fallback and the QR quiet zone are retained.

This is a local visual candidate. The separate published SEO/analytics changes
must be reconciled before any future release; this worktree must not replace
that newer production release wholesale.


## More visible design pass — 17 November 2026

The owner found the first refinement too subtle and requested a more noticeable
improvement, including good animation and main-menu subsections. This pass
supersedes the first pass's compact benefit cards and plain product framing.
The centred headline and exact supporting copy, cobalt/navy palette, white
background and existing product illustrations remain the visual foundation.

- A new pale-blue product showcase frames the sample dashboard, marks it as
  illustrative and provides six real module shortcuts. A small brand eyebrow,
  larger display type and an inline benefit row give the hero a clearer hierarchy.
- Full-width Platform, Solutions and Resources menus pair a featured overview
  with two columns of descriptive links and a footer shortcut. Main sections
  become scrollable accordions on mobile. Existing data supplies destinations;
  duplication between the old columns and flat navigation arrays was removed.
- The connected-workspace diagram now sits in a defined pale surface. The
  active connector gets a single travelling pulse on hover/focus, with no
  perpetual animation. Product tour tabs use a segmented surface and raised
  active state. The final call to action uses brand cobalt with white text.
- Hero entrances move 24px with 100ms staggering over 800ms; the product frame
  travels 32px over 850ms. Menus enter by 12px over 320ms, their links stagger by
  35ms, and the small feature illustration connects over 650ms. All text remains
  opaque. Native links, touch scrolling and reduced-motion guards are preserved.
- Keyboard ArrowDown enters a menu; Escape returns focus to its trigger.
  Hidden panels leave the focus order immediately. The mobile header/menu sits
  above the chat launcher. Decorative closing-section overflow uses `clip` so
  keyboard navigation cannot scroll its text inside the coloured card.

The public [Navbar Gallery](https://www.navbar.gallery/) mega-menu category
informed the featured-panel/grouped-links composition. The
[Magic UI Animated Beam](https://magicui.design/docs/components/animated-beam)
reference informed the finite connector pulse; its source was not copied or
installed. [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
documents the responsive/reduced-motion setup reused here. These were inspected
as public documentation, not licensed template source. Implementation uses the
site's existing GSAP, CSS, Lucide and React stack without additional packages.
# Tour interaction refinement — 18 November 2026

Owner feedback: remove the repeated module links beneath the hero workspace;
make both product-tour tab groups feel selectable; make scrolling through
chapters work on phones. Reused the established professional-web-craft motion
principles and current GSAP/Lenis stack, with CSS hover/selection feedback. No
new external design assets, packages or claims of inspecting new demos.

Both sections share a moving selection surface, fine-pointer hover, keyboard
focus and tap feedback. Desktop retains its card sequence. Phones use native
vertical cards and sticky horizontal chapter navigation, avoiding the previous
too-tall-card fallback that hid chapters from the scroll journey. Details and
validation: `docs/reviews/tour-navigation-20261118.md`.

## White tour navigation — 18 November 2026

Owner preference supersedes the lighter-grey follow-up: remove the filled strip
from Built to work together. Read-only inspection of the live Crewzy module row
confirmed its white navigation background. The local shared tab component now
uses white space, fine vertical name dividers and a moving underline instead of
a shaded container and selected pill. Hover uses blue text and a short underline;
keyboard focus remains explicit. The shared treatment also keeps compliance tabs
consistent. Module outer canvases and the supporting benefits row are white.
Product screenshots, status colours, text and scroll behavior are retained.

## Workspace surfaces and colour cues — 18 November 2026

Further owner feedback references the existing crewzy.io: white surroundings
for the first dashboard and connected-workspace animation, module-matched scroll
underlines, a single coloured compliance progress line, and a cleaner AI panel.
Read-only inspection of the public page confirmed white dashboard surroundings
and distinct module progress hues. The local design now shares each icon colour
with its line and connector through CSS tokens; selection text uses a darker
mix for readability. Compliance uses green for oversight, amber for review and
blue for audit history, with one full-width progress strip inside the sticky
navigation. Its outer canvas is white. The dashboard interior is near-white
(`#fdfefe`), and Crewzy AI uses white with the existing purple accent family.
Existing entrance and scroll animations are retained, including reduced-motion
alternatives. Tablet QA also corrected pinned-panel margins by moving layout
width/margins to an outer wrapper. No new library or external design asset.

## Footer typography — 18 November 2026

Owner approved 14px footer navigation headings and links, retaining Inter and
12px legal/copyright text. Shared SiteFooter CSS applies this across pages;
heading weight remains 700 and link weight 400. Additional bottom clearance
allows the final legal links to scroll above the floating chat/cookie controls.
After reconnecting and refreshing the local preview, verified desktop (1280px),
tablet (820px) and mobile (390px/320px) spacing. The mobile columns wrap cleanly
without horizontal overflow, and final legal links clear the floating chat
launcher. The temporary viewport override was reset. See the footer review report.
