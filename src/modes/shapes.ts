import { ModeResponse } from '../types';
import { randomColor } from '../visuals';
import { getState } from '../state';

const SHAPES: Array<{ css: string; en: string; de: string }> = [
  { css: 'circle', en: 'Circle', de: 'Kreis' },
  { css: 'square', en: 'Square', de: 'Quadrat' },
  { css: 'triangle', en: 'Triangle', de: 'Dreieck' },
  { css: 'star', en: 'Star', de: 'Stern' },
  { css: 'heart', en: 'Heart', de: 'Herz' },
  { css: 'diamond', en: 'Diamond', de: 'Diamant' },
  { css: 'oval', en: 'Oval', de: 'Oval' },
  { css: 'pentagon', en: 'Pentagon', de: 'Fünfeck' },
  { css: 'hexagon', en: 'Hexagon', de: 'Sechseck' },
  { css: 'arrow', en: 'Arrow', de: 'Pfeil' },
];

let touchIndex = 0;

export function handleShapes(key?: string): ModeResponse {
  let shape: typeof SHAPES[number];

  if (key) {
    shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  } else {
    shape = SHAPES[touchIndex % SHAPES.length];
    touchIndex++;
  }

  const color = randomColor();
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? shape.de : shape.en;

  return {
    display: `<div class="shape shape-${shape.css}" style="background:${color};"></div>`,
    subDisplay: name,
    color: color,
    speak: name,
    isHTML: true,
  };
}
