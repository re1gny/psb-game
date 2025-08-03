import subBg1 from '~/assets/images/cards/monsters/sub-bg-1.png';
import backSubBg1 from '~/assets/images/cards/monsters/back-sub-bg-1.png';
import image1 from '~/assets/images/level1/monster-1.png';

import subBg2 from '~/assets/images/cards/monsters/sub-bg-2.png';
import backSubBg2 from '~/assets/images/cards/monsters/back-sub-bg-2.png';
import image2 from '~/assets/images/level2/monster-1.png';

import subBg3 from '~/assets/images/cards/monsters/sub-bg-3.png';
import backSubBg3 from '~/assets/images/cards/monsters/back-sub-bg-3.png';
import image3 from '~/assets/images/level3/monster-1.png';

import subBg4 from '~/assets/images/cards/monsters/sub-bg-4.png';
import backSubBg4 from '~/assets/images/cards/monsters/back-sub-bg-4.png';
import image4 from '~/assets/images/level4/monster-1.png';

export type Monster = {
    id: number;
    level: number;
    name: string;
    subBg: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    backSubBg: string;
    backImageWidth: number;
    backImageHeight: number;
    details: string;
};

export const MONSTER_1: Monster = {
    id: 1,
    level: 1,
    name: 'Монстр Финансового планирования',
    subBg: subBg1,
    image: image1,
    imageWidth: 305,
    imageHeight: 305,
    backSubBg: backSubBg1,
    backImageWidth: 250,
    backImageHeight: 250,
    details: 'Этот хитрый монстрик не кусается и не пугает по ночам, но он обожает играть с финансами в прятки. Его любимые фразочки: «Ой, да это же мелочь!», «Всего один разочек!» и «Смотри, какая скидка!»  — звучат так мило, что трудно устоять. Он — настоящий мастер превращения импульсивных покупок в «инвестиции в атмосферу»',
};

export const MONSTER_2: Monster = {
    id: 2,
    level: 2,
    name: 'Монстр Офисный полтергейст',
    subBg: subBg2,
    image: image2,
    imageWidth: 276,
    imageHeight: 276,
    backSubBg: backSubBg2,
    backImageWidth: 209,
    backImageHeight: 209,
    details: 'Он обожает устраивать саботаж, когда у тебя есть срочные документы, превращая простую задачу в квест на выживание. Только ты нажимаешь «Печать» — и начинается: бумага зажевывает самый важный лист, только что заправленный картридж оказывается пустым, а драйверы загадочно самоудаляются. Как будто у техники есть личная месть против тебя'
};

export const MONSTER_3: Monster = {
    id: 3,
    level: 3,
    name: 'Монстр Эмоционального выгорания',
    subBg: subBg3,
    image: image3,
    imageWidth: 296,
    imageHeight: 296,
    backSubBg: backSubBg3,
    backImageWidth: 233,
    backImageHeight: 233,
    details: 'Этот монстр — настоящий мастер манипуляций и запугивания. Он приползает, когда дедлайны давят, а список задач сам не готов к такой нагрузке. Прокрастинация, стресс и паника — верные спутники этого монстра. Они шепчут «ты не справишься» и высасывают последние силы. Его лакомство — это страдания и кортизол. Чем больше ты страдаешь, тем сильнее он становится'
};

export const MONSTER_4: Monster = {
    id: 4,
    level: 4,
    name: 'Монстр Информационного хаоса',
    subBg: subBg4,
    image: image4,
    imageWidth: 288,
    imageHeight: 288,
    backSubBg: backSubBg4,
    backImageWidth: 239,
    backImageHeight: 239,
    details: 'Он как паук, плетёт паутину из старых отзывов, противоречивых советов и бесконечных вкладок. 35 страниц, 35 мнений — и ноль ясности. Сила этого монстра — в сомнениях. Ты проверяешь, перепроверяешь, и в итоге больше вопросов, чем ответов'
};

export const ALL_MONSTERS = [MONSTER_1, MONSTER_2, MONSTER_3, MONSTER_4];