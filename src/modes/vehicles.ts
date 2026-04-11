import { ModeResponse } from '../types';
import { randomColor } from '../visuals';
import { getState } from '../state';
import { playEngine } from '../audio';

const VEHICLES: Array<{ emoji: string; en: string; de: string }> = [
  { emoji: '🚗', en: 'Car', de: 'Auto' },
  { emoji: '🚂', en: 'Train', de: 'Zug' },
  { emoji: '🚀', en: 'Rocket', de: 'Rakete' },
  { emoji: '🚁', en: 'Helicopter', de: 'Hubschrauber' },
  { emoji: '🚢', en: 'Ship', de: 'Schiff' },
  { emoji: '🏍️', en: 'Motorcycle', de: 'Motorrad' },
  { emoji: '🚲', en: 'Bicycle', de: 'Fahrrad' },
  { emoji: '✈️', en: 'Airplane', de: 'Flugzeug' },
  { emoji: '🚜', en: 'Tractor', de: 'Traktor' },
  { emoji: '🛸', en: 'UFO', de: 'UFO' },
  { emoji: '🚌', en: 'Bus', de: 'Bus' },
  { emoji: '🏎️', en: 'Race Car', de: 'Rennwagen' },
  { emoji: '🚒', en: 'Fire Truck', de: 'Feuerwehrauto' },
  { emoji: '🚑', en: 'Ambulance', de: 'Krankenwagen' },
  { emoji: '🚓', en: 'Police Car', de: 'Polizeiauto' },
  { emoji: '🛳️', en: 'Cruise Ship', de: 'Kreuzfahrtschiff' },
  { emoji: '🚡', en: 'Cable Car', de: 'Seilbahn' },
  { emoji: '🛺', en: 'Tuk Tuk', de: 'Tuk Tuk' },
  { emoji: '⛵', en: 'Sailboat', de: 'Segelboot' },
  { emoji: '🛵', en: 'Scooter', de: 'Roller' },
  { emoji: '🚛', en: 'Truck', de: 'Lastwagen' },
  { emoji: '🏗️', en: 'Crane', de: 'Kran' },
];

export function handleVehicles(): ModeResponse {
  const vehicle = VEHICLES[Math.floor(Math.random() * VEHICLES.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? vehicle.de : vehicle.en;

  playEngine();

  return {
    display: vehicle.emoji,
    subDisplay: name,
    color: randomColor(),
    speak: name,
  };
}
