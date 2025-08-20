import type { ReactNode } from 'react';
import monster11 from '~/assets/images/level1/monster-1.png';
import monster12 from '~/assets/images/level1/monster-2.png';
import monster13 from '~/assets/images/level1/monster-3.png';
import bgTop11 from '~/assets/images/level1/bg-top-1.png';
import bgTop12 from '~/assets/images/level1/bg-top-2.png';

import monster21 from '~/assets/images/level2/monster-1.png';
import monster22 from '~/assets/images/level2/monster-2.png';
import monster23 from '~/assets/images/level2/monster-3.png';
import bgTop21 from '~/assets/images/level2/bg-top-1.png';
import bgTop22 from '~/assets/images/level2/bg-top-2.png';

import monster31 from '~/assets/images/level3/monster-1.png';
import monster32 from '~/assets/images/level3/monster-2.png';
import monster33 from '~/assets/images/level3/monster-3.png';
import bgTop31 from '~/assets/images/level3/bg-top-1.png';
import bgTop32 from '~/assets/images/level3/bg-top-2.png';

import monster41 from '~/assets/images/level4/monster-1.png';
import monster42 from '~/assets/images/level4/monster-2.png';
import monster43 from '~/assets/images/level4/monster-3.png';
import bgTop41 from '~/assets/images/level4/bg-top-1.png';
import bgTop42 from '~/assets/images/level4/bg-top-2.png';

import speech1 from '~/assets/images/levels/speech-1.png';
import speech2 from '~/assets/images/levels/speech-2.png';
import speech3 from '~/assets/images/levels/speech-3.png';

export type Level = {
    id: number;
    monster: number;
    bgTop1: {
        image: string;
        width: number;
        height: number;
        x: number;
        y: number;
    };
    bgTop2: {
        image: string;
        width: number;
        height: number;
        x: number;
        y: number;
    };
    monsterImages: Array<{
      image: string;
      width: number;
      height: number;
      x: number;
      y: number;
    }>;
    characterImages: Record<number, Array<{
      width: number;
      height: number;
      x: number;
      y: number;
    }>>;
    looseCharacterImages: Record<number, Array<{
      width: number;
      height: number;
      x: number;
      y: number;
    }>>;
    characterPairs: Record<number, Record<number, [number, number]>>;
    correctCharacters: [number, number];
    winNewCharacters: Array<number>;
    tasks: Array<{
      image: string;
      text: string;
      width: number;
      height: number;
      x: number;
      y: number;
      rotate: number;
      padding: Array<number>;
      monsterState: number;
    }>;
    looseMonsterText: {
      text: string;
      width: number;
      height: number;
      x: number;
      y: number;
      padding: Array<number>;
    };
    introText: ReactNode;
    hintText: ReactNode;
    chooseCardsText: string;
    looseTitle: string;
    looseText: string;
    winTitle: string;
    winText: string;
};

const LEVEL_CHARACTERS: Level['characterImages'] = {
  1: [
    {
      width: 260,
      height: 260,
      x: -54,
      y: 200,
    },
    {
      width: 260,
      height: 260,
      x: 22,
      y: 250,
    }
  ],
  2: [
    {
      width: 260,
      height: 260,
      x: -54,
      y: 200,
    },
    {
      width: 260,
      height: 260,
      x: 22,
      y: 250,
    }
  ],
  3: [
    {
      width: 252,
      height: 252,
      x: -49,
      y: 204,
    },
    {
      width: 252,
      height: 252,
      x: 22,
      y: 250,
    }
  ],
  4: [
    {
      width: 210,
      height: 210,
      x: -27,
      y: 201,
    },
    {
      width: 210,
      height: 210,
      x: 57,
      y: 284,
    }
  ],
  5: [
    {
      width: 269,
      height: 269,
      x: -48,
      y: 192,
    },
    {
      width: 269,
      height: 269,
      x: 22,
      y: 250,
    }
  ],
  6: [
    {
      width: 180,
      height: 269,
      x: -6,
      y: 198,
    },
    {
      width: 180,
      height: 269,
      x: 72,
      y: 258,
    }
  ],
  7: [
    {
      width: 178.16,
      height: 272.64,
      x: -13,
      y: 189,
    },
    {
      width: 178.16,
      height: 272.64,
      x: 62,
      y: 247,
    }
  ],
  8: [
    {
      width: 170,
      height: 256,
      x: -6,
      y: 198,
    },
    {
      width: 170,
      height: 256,
      x: 62,
      y: 247,
    }
  ],
  9: [
    {
      width: 269,
      height: 269,
      x: -48,
      y: 192,
    },
    {
      width: 269,
      height: 269,
      x: 22,
      y: 250,
    }
  ],
  10: [
    {
      width: 172,
      height: 263,
      x: -9,
      y: 182,
    },
    {
      width: 172,
      height: 263,
      x: 42,
      y: 250,
    }
  ],
}

const LEVEL_LOOSE_CHARACTERS: Level['looseCharacterImages'] = {
  1: [
    {
      width: 260,
      height: 260,
      x: -54,
      y: 200,
    },
    {
      width: 260,
      height: 260,
      x: 22,
      y: 250,
    }
  ],
  2: [
    {
      width: 149.94,
      height: 227,
      x: -9,
      y: 200,
    },
    {
      width: 149.94,
      height: 227,
      x: 57,
      y: 250,
    }
  ],
  3: [
    {
      width: 252,
      height: 252,
      x: -49,
      y: 204,
    },
    {
      width: 252,
      height: 252,
      x: 22,
      y: 250,
    }
  ],
  4: [
    {
      width: 159.94,
      height: 240,
      x: 9,
      y: 214,
    },
    {
      width: 159.94,
      height: 240,
      x: 75,
      y: 261,
    }
  ],
  5: [
    {
      width: 120.09,
      height: 246,
      x: 13,
      y: 205,
    },
    {
      width: 120.09,
      height: 246,
      x: 75,
      y: 261,
    }
  ],
  6: [
    {
      width: 180,
      height: 269,
      x: -6,
      y: 198,
    },
    {
      width: 180,
      height: 269,
      x: 72,
      y: 258,
    }
  ],
  7: [
    {
      width: 178.16,
      height: 272.64,
      x: -13,
      y: 189,
    },
    {
      width: 178.16,
      height: 272.64,
      x: 62,
      y: 247,
    }
  ],
  8: [
    {
      width: 170,
      height: 256,
      x: -6,
      y: 198,
    },
    {
      width: 170,
      height: 256,
      x: 62,
      y: 247,
    }
  ],
  9: [
    {
      width: 159.94,
      height: 240,
      x: 9,
      y: 214,
    },
    {
      width: 159.94,
      height: 240,
      x: 75,
      y: 261,
    }
  ],
  10: [
    {
      width: 172,
      height: 263,
      x: -9,
      y: 182,
    },
    {
      width: 172,
      height: 263,
      x: 42,
      y: 250,
    }
  ],
}

const LEVEL_CHARACTERS_PAIRS: Level['characterPairs'] = {
  1: {
    2: [2, 1],
    3: [3, 1],
    4: [4, 1],
    5: [5, 1],
    6: [6, 1],
    7: [7, 1],
    8: [8, 1],
    9: [9, 1],
    10: [10, 1],
  },
  2: {
    1: [2, 1],
    3: [2, 3],
    4: [2, 4],
    5: [2, 5],
    6: [2, 6],
    7: [2, 7],
    8: [2, 8],
    9: [2, 9],
    10: [2, 10],
  },
  3: {
    1: [3, 1],
    2: [3, 2],
    4: [3, 4],
    5: [3, 5],
    6: [3, 6],
    7: [3, 7],
    8: [3, 8],
    9: [3, 9],
    10: [3, 10],
  },
  4: {
    1: [1, 4],
    2: [2, 4],
    3: [3, 4],
    5: [5, 4],
    6: [6, 4],
    7: [7, 4],
    8: [8, 4],
    9: [9, 4],
    10: [10, 4],
  },
  5: {
    1: [5, 1],
    2: [5, 2],
    3: [5, 3],
    4: [5, 4],
    6: [5, 6],
    7: [5, 7],
    8: [5, 8],
    9: [5, 9],
    10: [5, 10],
  },
  6: {
    1: [6, 1],
    2: [6, 2],
    3: [6, 3],
    4: [6, 4],
    5: [5, 6],
    7: [7, 6],
    8: [6, 8],
    9: [6, 9],
    10: [10, 6],
  },
  7: {
    1: [7, 1],
    2: [7, 2],
    3: [7, 3],
    4: [7, 4],
    5: [7, 5],
    6: [7, 6],
    8: [7, 8],
    9: [7, 9],
    10: [7, 10],
  },
  8: {
    1: [8, 1],
    2: [8, 2],
    3: [8, 3],
    4: [8, 4],
    5: [8, 5],
    6: [8, 6],
    7: [7, 8],
    9: [8, 9],
    10: [10, 8],
  },
  9: {
    1: [9, 1],
    2: [9, 2],
    3: [9, 3],
    4: [9, 4],
    5: [9, 5],
    6: [9, 6],
    7: [9, 7],
    8: [9, 8],
    10: [9, 10],
  },
  10: {
    1: [10, 1],
    2: [10, 2],
    3: [10, 3],
    4: [10, 4],
    5: [10, 5],
    6: [10, 6],
    7: [10, 7],
    8: [10, 8],
    9: [10, 9],
  },
}

const LEVEL_1_TASKS: Level['tasks'] = [
  {
    image: speech1,
    text: 'составили список задач',
    width: 192.02,
    height: 168.88,
    x: 88,
    y: 76,
    rotate: -0.89,
    padding: [102.6, 72.48, 46.46, 48.03],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'определили концепцию вечеринки',
    width: 218.65,
    height: 141.13,
    x: 72,
    y: 111,
    rotate: -5.51,
    padding: [55.54, 63.22, 56.21, 59.5],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'заказали выгодный набор посуды',
    width: 248.53,
    height: 112.66,
    x: 57,
    y: 115,
    rotate: -7.7,
    padding: [47, 61.09, 40.95, 67.29],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'заказали пиццу\nпо акции 3+1=5',
    width: 223.84,
    height: 143.11,
    x: 69,
    y: 114,
    rotate: -5.51,
    padding: [63.02, 55.02, 54.56, 63.16],
    monsterState: 2,
  },
  {
    image: speech2,
    text: 'распределили деньги\nпо категориям',
    width: 223.84,
    height: 143.11,
    x: 92,
    y: 129,
    rotate: -5.51,
    padding: [56, 73.55, 50.93, 63],
    monsterState: 2,
  },
  {
    image: speech2,
    text: 'cделали Excel-табличку с расходами',
    width: 267.63,
    height: 123.34,
    x: 57.07,
    y: 138.01,
    rotate: -7.7,
    padding: [45.99, 77.81, 42.1, 71.93],
    monsterState: 2,
  },
]

const LEVEL_2_TASKS: Level['tasks'] = [
  {
    image: speech2,
    text: 'просмотрели ролики\nна YouTube',
    width: 218.65,
    height: 141.13,
    x: 73,
    y: 130,
    rotate: -5.51,
    padding: [55.54, 63.22, 56.21, 59.5],
    monsterState: 1,
  },
  {
    image: speech1,
    text: 'перезагрузили картридж',
    width: 205.21,
    height: 175.9,
    x: 84,
    y: 89.83,
    rotate: -4.57,
    padding: [110.6, 67.48, 41.46, 51.03],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'узнали,\nна какие кнопки нажимать',
    width: 218.65,
    height: 141.13,
    x: 72,
    y: 130,
    rotate: -5.51,
    padding: [55, 58.09, 50.95, 61.29],
    monsterState: 1,
  },
  {
    image: speech1,
    text: 'разослали приглашения\nпо email',
    width: 223.44,
    height: 191.53,
    x: 81,
    y: 83,
    rotate: 4.21,
    padding: [113.6, 72.48, 46.46, 48.03],
    monsterState: 2,
  },
  {
    image: speech2,
    text: 'переустановили драйвер',
    width: 222,
    height: 112.66,
    x: 70,
    y: 147,
    rotate: -7.7,
    padding: [47, 67.55, 40.93, 63],
    monsterState: 2,
  },
  {
    image: speech3,
    text: 'установили настройки печати',
    width: 174.2,
    height: 127.37,
    x: 100,
    y: 157,
    rotate: 0,
    padding: [51, 43.2, 55.37, 39],
    monsterState: 2,
  },
]

const LEVEL_3_TASKS: Level['tasks'] = [
  {
    image: speech1,
    text: 'провели спринт',
    width: 182.36,
    height: 156.32,
    x: 93.06,
    y: 76,
    rotate: -3.28,
    padding: [96.54, 63.22, 35.21, 45.5],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'помедитировали',
    width: 222,
    height: 112.66,
    x: 70,
    y: 119,
    rotate: -7.7,
    padding: [52.6, 57.48, 40.46, 64.03],
    monsterState: 1,
  },
  {
    image: speech3,
    text: 'распределили задачи',
    width: 174.2,
    height: 127.37,
    x: 94,
    y: 132,
    rotate: 0,
    padding: [55, 49.09, 48.95, 46.29],
    monsterState: 1,
  },
  {
    image: speech1,
    text: 'использовали шаблон презентации',
    width: 259.39,
    height: 222.34,
    x: 57,
    y: 36,
    rotate: -0.89,
    padding: [133.6, 102.48, 56.46, 68.03],
    monsterState: 2,
  },
  {
    image: speech2,
    text: 'поставили дедлайны',
    width: 178.2,
    height: 112.66,
    x: 92,
    y: 115,
    rotate: -7.7,
    padding: [47, 53.55, 40.93, 53],
    monsterState: 2,
  },
  {
    image: speech3,
    text: 'послушали звуки природы',
    width: 191,
    height: 139.65,
    x: 92,
    y: 122,
    rotate: 0,
    padding: [61, 43.2, 55.37, 39],
    monsterState: 2,
  },
]

const LEVEL_4_TASKS: Level['tasks'] = [
  {
    image: speech1,
    text: 'составили промпт',
    width: 182.36,
    height: 156.32,
    x: 93.06,
    y: 81,
    rotate: -3.28,
    padding: [96.54, 63.22, 35.21, 45.5],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'поговорили\nс чатом',
    width: 203,
    height: 133.1,
    x: 86,
    y: 133,
    rotate: 0,
    padding: [56.6, 57.48, 51.46, 56.03],
    monsterState: 1,
  },
  {
    image: speech3,
    text: 'перепроверили график работы',
    width: 204,
    height: 133.45,
    x: 86,
    y: 152,
    rotate: 0,
    padding: [57, 49.09, 48.95, 46.29],
    monsterState: 1,
  },
  {
    image: speech2,
    text: 'нашли достоверные источники',
    width: 205,
    height: 134.41,
    x: 80,
    y: 117,
    rotate: -5.51,
    padding: [52.6, 58.48, 49.46, 56.03],
    monsterState: 2,
  },
  {
    image: speech2,
    text: 'прочитали отзывы',
    width: 205,
    height: 134.41,
    x: 86,
    y: 127,
    rotate: -5.51,
    padding: [57, 53.55, 40.93, 53],
    monsterState: 2,
  },
  {
    image: speech3,
    text: 'сопоставили маршрут\nс расписанием',
    width: 219.95,
    height: 160.82,
    x: 78,
    y: 114,
    rotate: 0,
    padding: [65, 54.2, 54.37, 49],
    monsterState: 2,
  },
]

const LEVEL_1_MONSTER_IMAGES: Level['monsterImages'] = [
  {
    image: monster11,
    width: 285,
    height: 285,
    x: 121,
    y: 119,
  },
  {
    image: monster12,
    width: 293,
    height: 293,
    x: 117,
    y: 115,
  },
  {
    image: monster13,
    width: 295,
    height: 295,
    x: 117,
    y: 143,
  },
];

const LEVEL_2_MONSTER_IMAGES: Level['monsterImages'] = [
  {
    image: monster21,
    width: 264,
    height: 264,
    x: 129,
    y: 143,
  },
  {
    image: monster22,
    width: 284,
    height: 284,
    x: 119,
    y: 127,
  },
  {
    image: monster23,
    width: 290,
    height: 290,
    x: 157,
    y: 185,
  },
];

const LEVEL_3_MONSTER_IMAGES: Level['monsterImages'] = [
  {
    image: monster31,
    width: 263,
    height: 263,
    x: 129,
    y: 150,
  },
  {
    image: monster32,
    width: 274,
    height: 274,
    x: 134,
    y: 139,
  },
  {
    image: monster33,
    width: 300,
    height: 300,
    x: 145,
    y: 181,
  },
];

const LEVEL_4_MONSTER_IMAGES: Level['monsterImages'] = [
  {
    image: monster41,
    width: 279,
    height: 279,
    x: 129,
    y: 141,
  },
  {
    image: monster42,
    width: 282,
    height: 282,
    x: 128,
    y: 141,
  },
  {
    image: monster43,
    width: 223,
    height: 223,
    x: 189,
    y: 246,
  },
];

export const LEVEL_1: Level = {
    id: 1,
    monster: 1,
    bgTop1: {
        image: bgTop11,
        width: 402,
        height: 340,
        x: -28,
        y: -24,
    },
    bgTop2: {
        image: bgTop12,
        width: 435,
        height: 212.09,
        x: -46,
        y: 150,
    },
    monsterImages: LEVEL_1_MONSTER_IMAGES,
    characterImages: LEVEL_CHARACTERS,
    looseCharacterImages: LEVEL_LOOSE_CHARACTERS,
    characterPairs: LEVEL_CHARACTERS_PAIRS,
    correctCharacters: [1, 2],
    winNewCharacters: [4],
    tasks: LEVEL_1_TASKS,
    looseMonsterText: {
      width: 161,
      height: 117,
      x: 52,
      y: 88,
      padding: [37, 7.71, 39, 11],
      text: 'немного эстетики никому не повредит… особенно твоему бюджету!',
    },
    introText: (
      <>
        Друзья решили устроить{' '}<span className={'font-extrabold text-[#EA5616]'}>PowerPoint вечеринку</span>{' '}с настолками и призами за самый абсурдный слайд.
        Казалось бы, все продумали: лофт, еда, игры, призы. Но чем детальнее план — тем страшнее цифры расходов. 
        Теперь все ломают{'\n'}голову,{' '}<span className={'font-extrabold text-[#EA5616]'}>как сохранить крутой ивент{'\n'}и не разориться</span>.
        Монстр Финансового планирования{'\n'}хочет сорвать их планы
      </>
    ),
    hintText: (
      <>
        Составь комбинацию героев, которая позволит сохранить{' '}<span className={'font-extrabold text-[#EA5616]'}>креативность</span>{' '}вечеринки и при этом не выйти за рамки бюджета. Помни, что больше всего монстр боится <span className={'font-extrabold text-[#EA5616]'}>табличек Excel</span> с доходами-расходами и планированием финансов
      </>
    ),
    chooseCardsText: 'Выбери 2 карты\nс персонажами, которые помогут победить монстра\nи устроить праздник',
    looseTitle: 'Упс! Монстр пока побеждает…',
    looseText: 'Монстр Финансового планирования радостно закупился свечками, гирляндами и съел половину бюджета. Вечеринка под угрозой! Попробуй другую комбинацию — может, креативность и финансовая грамотность помогут на этот раз?',
    winTitle: 'Монстр Финансового планирования побеждён!',
    winText: 'Креативность, знание трендов\nи финансовая грамотность — отличное сочетание навыков. Вечеринка прошла на ура! Друзья весь вечер смотрели смешные презентации друг друга, общались\nи шутили. И самое главное —\nникто не остался голодным',
};

export const LEVEL_2: Level = {
    id: 2,
    monster: 2,
    bgTop1: {
        image: bgTop21,
        width: 402,
        height: 340,
        x: -28,
        y: -24,
    },
    bgTop2: {
        image: bgTop22,
        width: 435,
        height: 212.09,
        x: -46,
        y: 150,
    },
    monsterImages: LEVEL_2_MONSTER_IMAGES,
    characterImages: LEVEL_CHARACTERS,
    looseCharacterImages: LEVEL_LOOSE_CHARACTERS,
    characterPairs: LEVEL_CHARACTERS_PAIRS,
    correctCharacters: [3, 4],
    winNewCharacters: [5, 9],
    tasks: LEVEL_2_TASKS,
    looseMonsterText: {
      width: 189.61,
      height: 135,
      x: 30,
      y: 85,
      padding: [48, 22.61, 50, 27],
      text: 'Попробуй выключить\nи включить ещё раз.\nКогда‑нибудь точно сработает XD',
    },
    introText: (
      <>
        В универе началась подготовка{'\n'}к 1 сентября — нужен постер{'\n'}об официальной церемонии для первокурсников. Студсовет сделал крутой дизайн,{'\n'}но{' '}<span className={'font-extrabold text-[#EA5616]'}>принтер объявил бойкот</span>:{'\n'}жуёт бумагу и игнорирует кнопки (и даже трюк «выключить{'\n'}из розетки и включить» не помог). До праздника всего 2 дня, нужно срочно{' '}<span className={'font-extrabold text-[#EA5616]'}>оповестить первашей{'\n'}о мероприятии!</span>
      </>
    ),
    hintText: (
      <>
        Этот техно-тиран не всесилен — его можно одолеть, если действовать хладнокровно и по плану. Решение любой проблемы можно найти{'\n'}в интернете. На крайняк, можно обойтись{' '}<span className={'font-extrabold text-[#EA5616]'}>пдф-файлом</span>{' '}{'\n'}и воспользоваться{' '}<span className={'font-extrabold text-[#EA5616]'}>университетской рассылкой</span>
      </>
    ),
    chooseCardsText: 'Выбери 2 карты\nс персонажами, которые помогут одолеть принтер\nи уведомить первашей\nо наступающем празднике',
    looseTitle: 'До победы немного\nне хватило…',
    looseText: 'Бумага зажевана, картридж пуст,\nа драйвер исчез. Похоже, тебе не хватило немного технической магии',
    winTitle: 'Офисный полтергейст повержен!',
    winText: 'Активисты студсовета уже расклеивают афиши по универу,\nа первокурсники обсуждают грядущий праздник в чатах',
};

export const LEVEL_3: Level = {
    id: 3,
    monster: 3,
    bgTop1: {
        image: bgTop31,
        width: 402,
        height: 340,
        x: -14,
        y: -38,
    },
    bgTop2: {
        image: bgTop32,
        width: 773.94,
        height: 425.5,
        x: -105,
        y: -51,
    },
    monsterImages: LEVEL_3_MONSTER_IMAGES,
    characterImages: LEVEL_CHARACTERS,
    looseCharacterImages: LEVEL_LOOSE_CHARACTERS,
    characterPairs: LEVEL_CHARACTERS_PAIRS,
    correctCharacters: [5, 6],
    winNewCharacters: [7, 10],
    tasks: LEVEL_3_TASKS,
    looseMonsterText: {
      width: 174.71,
      height: 124.39,
      x: 24,
      y: 81,
      padding: [50, 16.71, 37.39, 18],
      text: 'Да ты весь на нервах. Могу дать телефон своего психолога',
    },
    introText: (
      <>
        В креативном агентстве подходит{'\n'}к концу проект по ребрендингу для клиента. Но финал под угрозой — коллега, который вёл проект, неожиданно уволился. Команде нужно срочно подготовиться{'\n'}к встрече, но времени почти нет. Все в замешательстве, кому отдать дополнительную нагрузку. Нужно не только быстро <span className={'font-extrabold text-[#EA5616]'}>сделать красивую презентацию</span>, но и <span className={'font-extrabold text-[#EA5616]'}>грамотно представить её клиенту</span>
      </>
    ),
    hintText: (
      <>
        Больше всего этот монстр боится найти способ <span className={'font-extrabold text-[#EA5616]'}>контролировать эмоции и стресс</span>, быстро включаться и грамотно <span className={'font-extrabold text-[#EA5616]'}>распределять обязанности</span>
      </>
    ),
    chooseCardsText: 'Выбери 2 карты\nс персонажами, которые помогут команде победить монстра и подготовиться\nк презентации',
    looseTitle: 'Монстр радуется…\nно это ненадолго!',
    looseText: 'Стресс победил — команда ушла в прокрастинацию. У кого‑то дедлайн сгорел, кто‑то внезапно ушёл на перерыв… (и не вернулся). Соберись и попробуй снова — может, пора призвать тех, кто умеет держать фокус и сохранять баланс',
    winTitle: 'Эмоциональное выгорание больше не страшно!',
    winText: 'Это было смело. Команда смогла взять стресс под контроль и отлично презентовала результаты ребрендинга. Теперь ничто\nне сможет вывести их из равновесия!',
};

export const LEVEL_4: Level = {
    id: 4,
    monster: 4,
    bgTop1: {
        image: bgTop41,
        width: 402,
        height: 340,
        x: -28,
        y: -24,
    },
    bgTop2: {
        image: bgTop42,
        width: 435,
        height: 212.09,
        x: -46,
        y: 150,
    },
    monsterImages: LEVEL_4_MONSTER_IMAGES,
    characterImages: LEVEL_CHARACTERS,
    looseCharacterImages: LEVEL_LOOSE_CHARACTERS,
    characterPairs: LEVEL_CHARACTERS_PAIRS,
    correctCharacters: [7, 8],
    winNewCharacters: [],
    tasks: LEVEL_4_TASKS,
    looseMonsterText: {
      width: 174.71,
      height: 124.39,
      x: 39,
      y: 80,
      padding: [46, 17.71, 41.39, 17],
      text: 'А ты точно проверил этот источник? Лучше перепроверь ещё раз!',
    },
    introText: (
      <>
        После продуктивного, но долгого{'\n'}и холодного года друзья решили: «Все, пора в отпуск». Билеты куплены, чемоданы собраны…{'\n'}а вот про маршрут забыли! Пока миллениал тонет в тоннах информации, читает десятки статей, смотрит обзоры на YouTube{'\n'}и листает путеводители, зумер терпеливо слушает, кивает, а потом говорит: «Давай спросим{'\n'}у ChatGPT?» Но монстр Информационного хаоса не сдаётся — он шепчет: «А вдруг ИИ врёт? Давай ещё раз проверим{'\n'}на трёх сайтах?»
      </>
    ),
    hintText: (
      <>
        Единственное противоядие —{'\n'}это <span className={'font-extrabold text-[#EA5616]'}>чёткое формулирование запроса, надёжные источники</span>{' '}{'\n'}и уверенность в своём выборе.{'\n'}И не забывай, что даже ИИ нужно перепроверять на здравый смысл!
      </>
    ),
    chooseCardsText: 'Выбери 2 карты\nс персонажами, которые помогут победить монстра\nи спланировать идеальный маршрут для путешествия',
    looseTitle: 'Это был достойный бой!\nНо монстр пока сильнее',
    looseText: 'Информационный хаос ликует —\nу тебя открыто ещё больше вкладок, чем раньше. Стоит навести порядок — попробуй выбрать других персонажей!',
    winTitle: 'Ты справился с хаосом!',
    winText: 'ИИ молниеносно набросал маршрут, а ваша дотошная проверка выявила, что «тот самый атмосферный бар» — действительно крутое место на 10/10, а не какая-нибудь прачечная, закрывшаяся в 2015 году. Теперь у вас есть идеальный план путешествия, осталось только вовремя доехать до аэропорта…',
};

export const ALL_LEVELS: Array<Level> = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];