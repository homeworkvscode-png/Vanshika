/**
 * ============================================================================
 *  ALL THE EDITABLE COPY + MEDIA LIVES HERE
 * ============================================================================
 */

export const RECIPIENT_NAME = "Vanshika";
export const SENDER_NAME = "Friends";

/* ---------------------------------------------------------------------- */
/* 1. LANDING PAGE                                                        */
/* ---------------------------------------------------------------------- */
export const LANDING_TITLE = "Happy Birthday Vanshika 🎉";
export const LANDING_SUBTEXT = "open this when you have a quiet minute ✨";
export const LANDING_BUTTON = "Open it →";

export const LETTER_TITLE = "Just a Little Something 💌";

export const LETTER_BODY = [
  "Piya,",
  "Mujhe yaad hai jab main Garmiyon ki chhutti mein apni Masi ke ghar aaya karta tha. Masi ke ghar jaane se zyada mujhe tumhare aur Vansh ke saath rehne mein maza aata tha.",
  "Phir itne saal hogye gaye, tumhare ghar aana bhi almost band ho gaya.",
  "But,",
  "phir itne saalon baad tumhe Sunny Bhaiya ki shaadi mein dekha.",
  "Honestly, us moment ko explain karna thoda mushkil hai, toh usko side mein hi rakhte hain. 😂",
  "Aaj tumhara birthday hai,\nAaj ka din bas enjoy karo, smile karo, aur mast raho. ✨",
  "Bas ek chota sa gift hai tumhare liye.\nI know, it's probably not as good as it could have been, but time bhi thoda kam tha aur photos bhi zyada nahi thi. 😭😂",
  "But phir bhi, socha ki is baar sirf “Happy Birthday” text karke nikal jaane se thoda zyada effort kiya jaye.",
  "So yeah… Happy Birthday, Piya! 🎂✨",
  "Hope you have an amazing day.\nEnjoy your day! 🤍",
];

/* ---------------------------------------------------------------------- */
/* 2. COLLAGE PAGE — Automatically includes ALL pictures in public/images/collage */
/* ---------------------------------------------------------------------- */
export const COLLAGE_KICKER = "a few of my favorite moments";
export const COLLAGE_HINT = "tap a photo for a closer look";

const collageGlob = import.meta.glob(
  "/public/images/collage/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
);

const DEFAULT_CAPTIONS = [
  "that one afternoon",
  "we still laugh about this",
  "my favorite kind of chaos",
  "you, mid-laugh",
  "a good day",
  "keep this one forever",
];

export const COLLAGE_ITEMS = Object.keys(collageGlob).map((path, i) => ({
  src: path.replace("/public", ""),
  caption: DEFAULT_CAPTIONS[i % DEFAULT_CAPTIONS.length] || `moment #${i + 1}`,
}));

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
/* 4. CINEMATIC VIDEO PAGE — Auto-detects video file in public/videos     */
/* ---------------------------------------------------------------------- */
const videoGlob = import.meta.glob(
  "/public/videos/*.{mp4,mov,webm,MP4,MOV,WEBM}",
  { eager: true, query: "?url", import: "default" }
);

const scannedVideos = Object.keys(videoGlob);
export const VIDEO_SRC = scannedVideos.length > 0
  ? scannedVideos[0].replace("/public", "")
  : "/videos/video1.mp4";
export const VIDEO_CAPTION = "A special memory for you ✨";

/* ---------------------------------------------------------------------- */
/* 5. FEEDBACK / FINAL PAGE                                               */
/* ---------------------------------------------------------------------- */
export const FINAL_MESSAGE = "Happy Birthday Vanshika";
export const FINAL_SUBTEXT = "with all my love — Me ❤️";
export const FEEDBACK_PROMPT = "Leave a birthday note for Vanshika 💬";
export const FEEDBACK_CONFIRM = "Thank you ✨";

/* ---------------------------------------------------------------------- */
/* 6. INSTAGRAM PROFILE                                                   */
/* ---------------------------------------------------------------------- */
export const INSTAGRAM_URL = "https://www.instagram.com/_vanshika_nagariya?igsh=NHhzM3Zwcnozbmdu";
export const INSTAGRAM_LABEL = "Visit Vanshika's Instagram 📸";

/* ---------------------------------------------------------------------- */
/* 7. CREDITS / CREATOR SHOUTOUTS                                         */
/* ---------------------------------------------------------------------- */
export const CREDITS_TITLE = "Created for Vanshika's Birthday ✨";
export const CREDITS_LIST = [
  { role: "Mastermind & Planning", name: "Kush", emoji: "🧠" },
  { role: "Website Development", name: "Luv", emoji: "💻" },
  { role: "Video Editor", name: "Bharat", emoji: "🎬" },
];
