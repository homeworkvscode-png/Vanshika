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
export const LANDING_SUBTEXT = "open this when you have a quiet minute ✨";
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
export const GALLERY_ITEMS = [
  {
    "src": "/images/gallery/imag1.jpeg",
    "caption": "memory #1"
  },
  {
    "src": "/images/gallery/imag2.jpeg",
    "caption": "memory #2"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (10).jpeg",
    "caption": "memory #3"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (11).jpeg",
    "caption": "memory #4"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (12).jpeg",
    "caption": "memory #5"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (13).jpeg",
    "caption": "memory #6"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (2).jpeg",
    "caption": "memory #7"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (3).jpeg",
    "caption": "memory #8"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (4).jpeg",
    "caption": "memory #9"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (5).jpeg",
    "caption": "memory #10"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (6).jpeg",
    "caption": "memory #11"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (7).jpeg",
    "caption": "memory #12"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (8).jpeg",
    "caption": "memory #13"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM (9).jpeg",
    "caption": "memory #14"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.10 PM.jpeg",
    "caption": "memory #15"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (1).jpeg",
    "caption": "memory #16"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (10).jpeg",
    "caption": "memory #17"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (11).jpeg",
    "caption": "memory #18"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (12).jpeg",
    "caption": "memory #19"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (13).jpeg",
    "caption": "memory #20"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (14).jpeg",
    "caption": "memory #21"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (15).jpeg",
    "caption": "memory #22"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (16).jpeg",
    "caption": "memory #23"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (17).jpeg",
    "caption": "memory #24"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (18).jpeg",
    "caption": "memory #25"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (19).jpeg",
    "caption": "memory #26"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (2).jpeg",
    "caption": "memory #27"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (20).jpeg",
    "caption": "memory #28"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (21).jpeg",
    "caption": "memory #29"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (22).jpeg",
    "caption": "memory #30"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (23).jpeg",
    "caption": "memory #31"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (24).jpeg",
    "caption": "memory #32"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (25).jpeg",
    "caption": "memory #33"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (26).jpeg",
    "caption": "memory #34"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (3).jpeg",
    "caption": "memory #35"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (4).jpeg",
    "caption": "memory #36"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (5).jpeg",
    "caption": "memory #37"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (6).jpeg",
    "caption": "memory #38"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (7).jpeg",
    "caption": "memory #39"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (8).jpeg",
    "caption": "memory #40"
  },
  {
    "src": "/images/gallery/WhatsApp Image 2026-08-09 at 10.25.11 PM (9).jpeg",
    "caption": "memory #41"
  }
];

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

/* ---------------------------------------------------------------------- */
/* 6. INSTAGRAM PROFILE                                                   */
/* ---------------------------------------------------------------------- */
export const INSTAGRAM_URL = "https://www.instagram.com/_vanshika_nagariya?igsh=NHhzM3Zwcnozbmdu";
export const INSTAGRAM_LABEL = "Visit Vanshika's Instagram 📸";

/* ---------------------------------------------------------------------- */
/* 7. CREDITS / CREATOR SHOUTOUTS                                         */
/* ---------------------------------------------------------------------- */
export const CREDITS_TITLE = "Made with love for Vanshika ❤️";
export const CREDITS_LIST = [
  { role: "Mastermind & Planning", name: "Kush", emoji: "🧠" },
  { role: "Website Development", name: "Luv", emoji: "💻" },
  { role: "Video Editor", name: "Bharat", emoji: "🎬" },
];
