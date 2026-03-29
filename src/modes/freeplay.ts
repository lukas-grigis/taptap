import { ModeResponse } from '../types';
import { handleAlphabet } from './alphabet';
import { handleNumbers } from './numbers';
import { handleAnimals } from './animals';
import { handleColors } from './colors';
import { handleShapes } from './shapes';
import { handleMusic } from './music';
import { handleVehicles } from './vehicles';
import { handleFood } from './food';
import { handleWeather } from './weather';
import { handleEmotions } from './emotions';
import { handleBodyParts } from './bodyparts';

const handlers = [handleAlphabet, handleNumbers, handleAnimals, handleColors, handleShapes, handleMusic, handleVehicles, handleFood, handleWeather, handleEmotions, handleBodyParts];

export function handleFreePlay(key?: string): ModeResponse {
  const handler = handlers[Math.floor(Math.random() * handlers.length)];
  return handler(key);
}
