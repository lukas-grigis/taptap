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
  { emoji: '🦈', en: 'Shark', de: 'Hai', sound_en: 'Chomp chomp!', sound_de: 'Schnapp!' },
  { emoji: '🐊', en: 'Crocodile', de: 'Krokodil', sound_en: 'Snap!', sound_de: 'Schnapp!' },
  { emoji: '🦒', en: 'Giraffe', de: 'Giraffe', sound_en: 'Munch!', sound_de: 'Mampf!' },
  { emoji: '🦓', en: 'Zebra', de: 'Zebra', sound_en: 'Neigh!', sound_de: 'Wieher!' },
  { emoji: '🐘', en: 'Elephant', de: 'Elefant', sound_en: 'Trumpet!', sound_de: 'Troet!' },
  { emoji: '🦏', en: 'Rhino', de: 'Nashorn', sound_en: 'Snort!', sound_de: 'Schnauf!' },
  { emoji: '🦛', en: 'Hippo', de: 'Nilpferd', sound_en: 'Splash!', sound_de: 'Platsch!' },
  { emoji: '🦩', en: 'Flamingo', de: 'Flamingo', sound_en: 'Squawk!', sound_de: 'Kreisch!' },
  { emoji: '🦚', en: 'Peacock', de: 'Pfau', sound_en: 'Caw!', sound_de: 'Krah!' },
  { emoji: '🦜', en: 'Parrot', de: 'Papagei', sound_en: 'Polly!', sound_de: 'Lora!' },
  { emoji: '🦔', en: 'Hedgehog', de: 'Igel', sound_en: 'Snuffle!', sound_de: 'Schnuffel!' },
  { emoji: '🐿️', en: 'Squirrel', de: 'Eichhoernchen', sound_en: 'Chitter!', sound_de: 'Fiep!' },
  { emoji: '🦌', en: 'Deer', de: 'Hirsch', sound_en: 'Bellow!', sound_de: 'Roehr!' },
  { emoji: '🐺', en: 'Wolf', de: 'Wolf', sound_en: 'Howl!', sound_de: 'Heul!' },
  { emoji: '🦝', en: 'Raccoon', de: 'Waschbaer', sound_en: 'Chitter!', sound_de: 'Fiep!' },
  { emoji: '🐓', en: 'Rooster', de: 'Hahn', sound_en: 'Cock-a-doodle-doo!', sound_de: 'Kikeriki!' },
  { emoji: '🐟', en: 'Fish', de: 'Fisch', sound_en: 'Blub blub!', sound_de: 'Blub blub!' },
  { emoji: '🦭', en: 'Seal', de: 'Seehund', sound_en: 'Arf arf!', sound_de: 'Arf arf!' },
  { emoji: '🐇', en: 'Bunny', de: 'Kaninchen', sound_en: 'Hop hop!', sound_de: 'Hopp hopp!' },
  { emoji: '🦦', en: 'Otter', de: 'Otter', sound_en: 'Squeak!', sound_de: 'Quietsch!' },
  { emoji: '🦘', en: 'Kangaroo', de: 'Kaenguru', sound_en: 'Boing!', sound_de: 'Boing!' },
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
