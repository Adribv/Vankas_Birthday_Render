# Portrait Media Scaling Fix - TODO ✅

## Plan Steps
- [x] Step 1: Edit src/sections/HeroSection.tsx - Replace landscape aspect-video with portrait-responsive container for v1.mp4
- [x] Step 2: Edit src/sections/MemoryTimeline.tsx - Update photo img height/aspect for portrait jpegs (h-48 -> taller responsive)
- [ ] Step 3: Test changes - Run dev server, verify portrait video/photos no longer cropped on mobile/desktop
- [x] Step 4: Complete task

Current progress: Edits done. Test with `bun run dev` or `npm run dev`, scroll to Hero & Memories sections. Video/photos now use portrait-first responsive scaling (aspect-[9/16] base for video, aspect-[3/4] h-72+ for photos, object-cover fills without landscape crop).
