# Editorial team image

Asset: `public/images/crewzy-team-editorial-v2.png` (1448 × 1086).

Created using the built-in image-generation tool for this design review.
This is an illustrative scene with fictional people, not a real Crewzy team,
customer endorsement or evidence of product usage. The original workshop image
is retained. Replace with approved team/client photography when available.
Next.js Image serves responsive, optimized versions in the page.

## Final generation prompt

```text
Use case: photorealistic-natural
Asset type: editorial photograph for the people-focused section of Crewzy, a light, professional HR and compliance software website.
Primary request: a natural, quietly confident photograph of three colleagues reviewing work together in a small contemporary design studio. This is an illustrative team scene, not an actual customer portrait.
Scene/backdrop: bright lived-in studio with tall windows, pale warm plaster, a simple oak worktable and understated shelves. One open unbranded laptop, a few paper layouts and a notebook; believable restrained workspace, not a staged corporate boardroom.
Subject: three adult colleagues in their thirties and forties, different backgrounds, relaxed everyday professional clothes in navy, cream and soft blue. Candid concentration, someone listening and someone explaining a paper layout; nobody looking at the camera, no exaggerated smiling, no handshakes. Natural faces and anatomically accurate hands.
Style/medium: photorealistic premium documentary/editorial photography, 35mm lens, natural skin texture and fabric detail, subtle film grain, real daylight with gentle shadows, no heavy retouching or cinematic effects.
Composition/framing: landscape 4:3 composition; people sit close enough to remain legible in a website section, medium-wide eye-level view; calm balanced composition, keep important faces away from the edges. Image alone, no surrounding website mockup.
Color palette: warm off-white and natural oak, restrained navy and soft blue details. Accurate natural colour, bright but not washed out.
Constraints: no logos, no watermarks, no typography, no readable screen or document text, no floating graphics, no neon, no stock-photo poses, no glossy plastic skin, no excessive background blur.
```


## 4K editorial image — 20 October 2026

Current website asset: `public/images/crewzy-team-editorial-4k.png` (3840 × 2160).
The prior 1448 × 1086 original remains unchanged.

The built-in image-generation tool enhanced the supplied illustrative image
and extended the studio scene to 16:9. It returned a 1672 × 941 PNG; that output
was resized with Lanczos3 to the requested 3840 × 2160 delivery dimensions.
This is AI-enhanced and upscaled, not a native-detail 4K photograph.
The scene and people remain illustrative, not actual Crewzy staff or customers.

Next.js Image uses responsive `sizes` that account for the 16:9 cover crop
and the existing photo zoom (680px / 850px / 900px across breakpoints),
quality 90, its default WebP negotiation and lazy loading. Smaller screens
receive smaller optimized images rather than the full master. The generated
3840px srcset candidate remains available for high-density displays.
The real founder portrait remains the supplied original at its existing size;
no facial detail has been invented for it.

Dashboard, module and compliance previews remain live HTML/CSS with SVG icons.
They have no fixed bitmap resolution. Active reading states render at scale 1,
and the settled hero dashboard clears its entrance transform.

### Built-in image-generation prompt

```text
Use case: identity-preserve. Asset type: high-resolution editorial photograph for the existing Crewzy website. Image 1 is the edit target: an illustrative photograph of three fictional colleagues reviewing papers in a bright studio. Primary request: create a sharper, high-detail 4K landscape master, exactly 3840 x 2160 pixels if supported. Preserve the same three fictional people, their faces, poses, clothing, body proportions, hands, the papers, laptop, table, light, colour palette and natural editorial photographic style. Preserve the original 4:3 scene composition inside the central 75% of the wider frame, extending only the studio background at the left and right to reach 16:9; this allows the website to crop the image responsively. Improve natural hair, fabric, skin and paper detail without changing identity, expressions, objects or scene. Keep believable skin texture and soft daylight, no oversharpening halos or plastic smoothing. Do not add people, logos, readable text, watermarks or UI. This is an illustrative team scene, not a real customer or company photo.
```


### Verification

- Confirmed the new PNG is exactly 3840 × 2160; original assets retained.
- At a 3840 × 2160 viewport, the hero dashboard had no transform and the
  selected people table and all ancestors had identity/no transforms and no
  blur filters. Document width matched viewport width.
- Mobile 390px preview loaded a 750px optimized candidate without page overflow.
- Desktop optimized WebP response at 1080 × 608, quality 85: HTTP 200,
  104,898 bytes (about 102 KiB), instead of delivering the 14.7 MB PNG master.
- All 38 existing tests, TypeScript and the isolated production build passed.


## Finishing pass — preserving the existing visual design

The colours, layout, typography sizes, image asset and animations remain the
same. The editorial photo uses quality 90 instead of 85 for less compression;
responsive sizes and lazy loading are retained. Dashboard review-queue labels
and compliance audit labels use weight 600 to match existing preview titles.
No new image generation or style redesign was introduced in this pass.


Quality-90 delivery check: HTTP 200 WebP at 1080 × 608, 136,134 bytes
(about 133 KiB). Palette declarations in both refined preview stylesheets were
compared before/after and remained identical. Browser checks confirmed review
queue labels still use 14px text at native scale, with weight 600.


## Parked app walkthrough — 20 October 2026

Status: removed from the website at the owner’s request. The component and
demo media remain local for possible future use and are excluded from this
website commit; they are not part of the shipped public assets.

- Video: `public/videos/crewzy-walkthrough.mp4` — 49 seconds, 1600 × 1000,
  H.264, 24 fps, faststart; no audio.
- Poster: `public/images/crewzy-walkthrough-poster.jpg` — a frame from the
  actual document register, 1600 × 1000.
- Captions: `public/videos/crewzy-walkthrough.vtt` — nine contiguous cues.

This is an edited sequence of nine actual browser screen captures, not a
continuous screen recording or a generated app mockup. The source interface
is the current canonical `ready-to-merge-code/crewzy-frontend-nextjs` working
tree. The UI was not redrawn or retouched. Each 1600 × 900 capture is retained
at its native size above a separate 100px caption strip.

An isolated local frontend used synthetic API responses based on the existing
app test fixtures. It did not connect to customer services. People, emails,
phone numbers, documents and activity were sample data. This demonstrates
the actual frontend interface, not a validation of deployed backend behavior.
The temporary frontend and fixture proxy were stopped after capture.

Chapters: 0–22s adding Alex Morgan through the actual form and showing the
Invited employee record; 22–34s the existing document register and Expiring
filter for Sophie Harris; 34–49s audit history and the before/after expiry-date
change. The second chapter uses a previously uploaded sample certificate,
not a document automatically created by adding the employee.

The parked prototype uses a native, manually played video with a poster, optional
English captions and a text transcript. `preload="none"` avoids eagerly loading
the video. UI captures and the encoding manifest remain in this task’s local
artifacts for reference.


## Parked demo 01 — sign in to Crewzy — 21 October 2026

Status: local prototype only, excluded from this website commit together with
the removed walkthrough component and media.

- Video: `public/videos/crewzy-signin-demo.mp4` — 26 seconds, 1600 × 1000,
  H.264 High, 24 fps, limited-range yuv420p, faststart; no audio.
- Poster: `public/images/crewzy-signin-demo-poster.jpg`.
- Captions: `public/videos/crewzy-signin-demo.vtt` — five contiguous cues.

Captured through the actual deployed Crewzy development app using its normal
email/password sign-in flow. Successful authentication reached the company
dashboard. This is an edited sequence of actual browser captures with a
separate caption strip, rather than a continuous recording. It demonstrates
existing-account sign-in, not account creation.

Privacy masks cover the work email, workspace identity, personalised Google
account suggestion, account menu identity, billing/sidebar details and the
entire dashboard data area. The dashboard frame retains only generic app
navigation and an explicit notice that workspace data is hidden. No employee
records, business metrics, password, verification code, session token or
redirect/handoff URL appears in the footage. Credential entry was not captured.
Raw captures remain outside the repository and are not website assets.
No workspace records were created or edited for this demo.

The parked walkthrough selector defaults to this sign-in demo. The original local
fixture-backed people/compliance overview remains available with its original
provenance, captions and transcript. Both videos require manual playback,
reset when switching demos, and have optional English captions plus a text
transcript.
