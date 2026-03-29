import { ModeResponse } from '../types';
import { randomColor } from '../visuals';
import { getState } from '../state';

const ANIMALS: Array<{ emoji: string; en: string; de: string; sound_en: string; sound_de: string }> = [
  { emoji: '🐶', en: 'Dog', de: 'Hund', sound_en: 'Woof woof!', sound_de: 'Wau wau!' },
  { emoji: '🐱', en: 'Cat', de: 'Katze', sound_en: 'Meow!', sound_de: 'Miau!' },
  { emoji: '🐻', en: 'Bear', de: 'Bär', sound_en: 'Growl!', sound_de: 'Grr!' },
  { emoji: '🦁', en: 'Lion', de: 'Löwe', sound_en: 'Roar!', sound_de: 'Brüll!' },
  { emoji: '🐸', en: 'Frog', de: 'Frosch', sound_en: 'Ribbit!', sound_de: 'Quak!' },
  { emoji: '🐵', en: 'Monkey', de: 'Affe', sound_en: 'Ooh ooh!', sound_de: 'Uh uh!' },
  { emoji: '🐷', en: 'Pig', de: 'Schwein', sound_en: 'Oink oink!', sound_de: 'Oink oink!' },
  { emoji: '🐮', en: 'Cow', de: 'Kuh', sound_en: 'Moo!', sound_de: 'Muh!' },
  { emoji: '🦊', en: 'Fox', de: 'Fuchs', sound_en: 'Yip yip!', sound_de: 'Yip yip!' },
  { emoji: '🐰', en: 'Rabbit', de: 'Hase', sound_en: 'Squeak!', sound_de: 'Fiep!' },
  { emoji: '🐼', en: 'Panda', de: 'Panda', sound_en: 'Chomp!', sound_de: 'Mampf!' },
  { emoji: '🐨', en: 'Koala', de: 'Koala', sound_en: 'Grunt!', sound_de: 'Grunz!' },
  { emoji: '🦄', en: 'Unicorn', de: 'Einhorn', sound_en: 'Neigh!', sound_de: 'Wieher!' },
  { emoji: '🐝', en: 'Bee', de: 'Biene', sound_en: 'Buzz buzz!', sound_de: 'Summ summ!' },
  { emoji: '🦋', en: 'Butterfly', de: 'Schmetterling', sound_en: 'Flutter!', sound_de: 'Flatter!' },
  { emoji: '🐢', en: 'Turtle', de: 'Schildkröte', sound_en: 'Slow and steady!', sound_de: 'Langsam!' },
  { emoji: '🐙', en: 'Octopus', de: 'Oktopus', sound_en: 'Splash!', sound_de: 'Platsch!' },
  { emoji: '🐬', en: 'Dolphin', de: 'Delfin', sound_en: 'Click click!', sound_de: 'Klick klick!' },
  { emoji: '🦀', en: 'Crab', de: 'Krabbe', sound_en: 'Pinch!', sound_de: 'Zwick!' },
  { emoji: '🐧', en: 'Penguin', de: 'Pinguin', sound_en: 'Waddle!', sound_de: 'Watschel!' },
];

export function handleAnimals(): ModeResponse {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? animal.de : animal.en;
  const sound = isGerman ? animal.sound_de : animal.sound_en;

  return {
    display: animal.emoji,
    subDisplay: name,
    color: randomColor(),
    speak: `${name}. ${sound}`,
  };
}
