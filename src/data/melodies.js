import { lml } from './lmlParser.js';

// Import LML files as raw text (esbuild text loader)
import maryHadALittleLamb from './melodies/mary-had-a-little-lamb.lml';
import amazingGraceLml from './melodies/amazing-grace.lml';
import ohSusannaLml from './melodies/oh-susanna.lml';
import homeOnTheRangeLml from './melodies/home-on-the-range.lml';
import simpleGiftsLml from './melodies/simple-gifts.lml';
import twinkleTwinkleLml from './melodies/twinkle-twinkle.lml';
import shenandoahLml from './melodies/shenandoah.lml';
import jingleBellsLml from './melodies/jingle-bells.lml';
import silentNightLml from './melodies/silent-night.lml';
import weWishYouAMerryChristmasLml from './melodies/we-wish-you-a-merry-christmas.lml';
import joyToTheWorldLml from './melodies/joy-to-the-world.lml';

// Parse LML files into melody format
// The parsed format is compatible with the existing playback system:
// { name: string, category: string, tempo: number, notes: [[degree, octave, beats], ...] }
export const melodies = [
    lml(maryHadALittleLamb),
    // Traditional American
    lml(amazingGraceLml),
    lml(ohSusannaLml),
    lml(homeOnTheRangeLml),
    lml(simpleGiftsLml),
    lml(twinkleTwinkleLml),
    lml(shenandoahLml),

    // Christmas
    lml(jingleBellsLml),
    lml(silentNightLml),
    lml(weWishYouAMerryChristmasLml),
    lml(joyToTheWorldLml),
];
