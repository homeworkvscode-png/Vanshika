/**
 * ============================================================================
 *  ALL THE EDITABLE COPY + MEDIA LIVES HERE
 * ============================================================================
 *  Change names, messages, captions, and image/video paths in this one file
 *  — no need to dig through every page component.
 *
 *  📁 MEDIA: drop your files into /public and they're served from "/".
 *     - Collage photos → public/images/collage/img1.jpg, img2.jpg, ...
 *     - Gallery photos → public/images/gallery/img1.jpg, img2.jpg, ...
 *     - Video          → public/videos/video1.mp4
 *  Every image/video has a graceful fallback if the file is missing, so the
 *  site never shows a broken image icon or broken player.
 * ============================================================================
 */

export const RECIPIENT_NAME = "Vanshika";
export const SENDER_NAME = "Me";

/* ---------------------------------------------------------------------- */
/* 1. LANDING PAGE                                                        */
/* ---------------------------------------------------------------------- */
export const LANDING_TITLE = "Happy Birthday Vanshika ❤️";
export const LANDING_SUBTEXT = "move your cursor across the pink to reveal a little surprise";
export const LANDING_BUTTON = "Open it →";

/* ---------------------------------------------------------------------- */
/* LETTER PAGE                                                            */
/* ---------------------------------------------------------------------- */
export const LETTER_BODY = [
  `Dear ${RECIPIENT_NAME},`,
  "I kept starting this letter over, because nothing sounded like enough. So I stopped trying to make it perfect and just started telling the truth.",
  "You make ordinary days feel like they're worth remembering. I hope this year hands you back a little of what you give everyone else.",
  "Happy birthday — I'm so glad you exist.",
];

/* ---------------------------------------------------------------------- */
/* 2. COLLAGE PAGE — scrapbook polaroids                                  */
/* ---------------------------------------------------------------------- */
export const COLLAGE_KICKER = "a few of my favorite moments";
export const COLLAGE_HINT = "tap a photo for a closer look";
export const COLLAGE_ITEMS = [
  { src: "/images/collage/img1.jpg", caption: "that one afternoon" },
  { src: "/images/collage/img2.jpg", caption: "we still laugh about this" },
  { src: "/images/collage/img3.jpg", caption: "my favorite kind of chaos" },
  { src: "/images/collage/img4.jpg", caption: "you, mid-laugh" },
  { src: "/images/collage/img5.jpg", caption: "a good day" },
  { src: "/images/collage/img6.jpg", caption: "keep this one forever" },
];

/* ---------------------------------------------------------------------- */
/* 3. GALLERY PAGE — the full album, supports many images                */
/* ---------------------------------------------------------------------- */
export const GALLERY_TITLE = "the whole album";
export const GALLERY_HINT = "tap any photo for a closer look";
// Add or remove entries freely — the grid and lightbox both scale to any count.
export const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery/img${i + 1}.jpg`,
  caption: `memory #${i + 1}`,
}));

/* ---------------------------------------------------------------------- */
/* 4. CINEMATIC VIDEO PAGE                                                */
/* ---------------------------------------------------------------------- */
export const VIDEO_SRC = "/videos/video1.mp4";
export const VIDEO_CAPTION = "A small memory for you 💖";

/* ---------------------------------------------------------------------- */
/* 5. FEEDBACK / FINAL PAGE                                               */
/* ---------------------------------------------------------------------- */
export const FINAL_MESSAGE = "Happy Birthday";
export const FINAL_SUBTEXT = `with all my love — ${SENDER_NAME}`;
export const FEEDBACK_PROMPT = "loved this? tell me what you think";
export const FEEDBACK_CONFIRM = "Thank you ❤️";
