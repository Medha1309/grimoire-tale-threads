# Ouija Board Image Generation

## Image Prompt for AI Image Generator

Use this prompt to generate the photoreal Ouija board plate image:

```
Ultra-realistic antique Ouija board on an aged walnut table, viewed from a slight three-quarter top-down angle. Classic ivory letters A–Z in a smooth arc, numbers 0–9 in a row beneath, and the words YES, NO, GOODBYE in an old serif type. The board is framed in darker carved wood with subtle engraved details and worn edges, fine wood grain visible. Dim candle reflections at the corners of the frame, soft fog licking at the edges, teal and amber low-key lighting, subtle film grain, gentle vignette. Center area of the board is clean and readable. No hands, no people, no extra logos. Shot on a 35mm lens, high detail, photorealistic.
```

## Save Location

Save the generated image as: `/public/ouija_plate.jpg`

## Usage

Once you have the image:
1. Generate it using an AI image generator (Midjourney, DALL-E, Stable Diffusion, etc.)
2. Save it to `/public/ouija_plate.jpg`
3. The component will automatically use it as the background

## Current State

The component works perfectly without the image (uses CSS fallback), but adding the photoreal image will make it look stunning.

The board currently:
- Has a realistic wood texture fallback
- Shows glowing letters A-Z, 0-9, YES, NO, GOODBYE
- Features an animated planchette that follows your cursor
- Has fog effects and atmospheric lighting
- Responds to clicks to compose messages
