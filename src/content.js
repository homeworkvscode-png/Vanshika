/**
 * ============================================================================
 *  ALL THE EDITABLE COPY + MEDIA LIVES HERE
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
/* 3. GALLERY PAGE — Automatically includes ALL pictures in public/images/gallery */
/* ---------------------------------------------------------------------- */
export const GALLERY_TITLE = "the whole album";
export const GALLERY_HINT = "tap any photo for a closer look";

// Auto-scan ALL images inside public/images/gallery dynamically
const galleryGlob = import.meta.glob(
  "/public/images/gallery/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
);

export const GALLERY_ITEMS = Object.keys(galleryGlob).map((path, i) => ({
  src: path.replace("/public", ""),
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
