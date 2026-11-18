/**
 * Central customization — edit this file to personalize the entire experience.
 * Fields marked PLACEHOLDER should be updated with your real details.
 */

import romanticMusic from '../assets/music/romantic.mp3'

/** Set youtubeVideoId to stream from YouTube; leave empty and set music.src for a local file. */
const MUSIC_YOUTUBE_VIDEO_ID = 'aZGSmUNuEQk'
const MUSIC_YOUTUBE_URL = 'https://youtu.be/aZGSmUNuEQk?si=8hBrC7DY6xLsglhy'

export const princessConfig = {
  /** PLACEHOLDER — your girlfriend's name */
  princessName: 'My Beautiful Princess',

  /** PLACEHOLDER — your name (shown as "Your Prince Charming") */
  princeName: 'Your Prince Charming',

  /** Princess Day date (display only) */
  princessDayDate: '18th November 2026',

  music: {
    youtubeVideoId: MUSIC_YOUTUBE_VIDEO_ID,
    youtubeUrl: MUSIC_YOUTUBE_URL,
    /** Fallback when youtubeVideoId is removed */
    src: romanticMusic,
    title: 'Main Agar Kahoon (Om Shanti Om)',
  },

  loveLetter: `My Dearest Princess,

If I could give you one thing in this world, it would be the ability to see yourself through my eyes.

You would understand how special you are, how beautiful your smile is, and how much happiness your presence brings into my life.

You don't need a castle to be a princess. You don't need a crown to be royalty. You already have something more precious – a heart that makes my world beautiful.

I know I'm not perfect, and I may not always express everything perfectly, but one thing I never want you to doubt is how special you are to me.

On this Princess Day, I just want to remind you that you deserve all the happiness, love, care, and beautiful little moments in this world.

Happy Princess Day, my love.

Forever your biggest admirer. ❤️`,

  /** Revealed when she clicks "One Last Surprise" */
  finalSurpriseMessage: `Psst… this one’s just for you. 🤍

I still smile when I think about that 3rd of March — a random day on Instagram that somehow rewrote my whole story.

From our first “hey” to 23rd April, when you became mine… from 9th August, that date my heart still remembers, to every ordinary day that feels like a little fairytale because you’re in it.

I made this tiny kingdom on the internet not because you need proof — but because loving you feels too beautiful to keep quiet.

So here’s my secret:
I’m not just celebrating Princess Day today.
I’m celebrating the girl who turned my life soft, warm, and full of hope.
The girl I want morning texts with, midnight laughs with, and a thousand more chapters with.

If the whole world is loud someday, come find me here — in the calm, in the love, in us.

Always yours,
now and in every little tomorrow we're yet to write.`,

  royalPromise: {
    title: 'A Promise to My Princess',
    body: `I cannot promise you a life where every day is perfect, but I promise to keep choosing you, appreciating you, supporting you, and finding reasons to make you smile.

No matter how ordinary a day feels, I hope I can always make you feel extraordinary.`,
  },
}