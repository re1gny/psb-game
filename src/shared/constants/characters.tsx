import { ReactNode } from 'react';

import baseBg1 from '~/assets/images/cards/character1/base-bg.png';
import subBg1 from '~/assets/images/cards/character1/sub-bg.png';
import image1 from '~/assets/images/characters/character1/character.png';
import looseImage1 from '~/assets/images/characters/character1/character-loose.png';
import backSubBg1 from '~/assets/images/cards/character1/back-sub-bg.png';

import baseBg2 from '~/assets/images/cards/character2/base-bg.png';
import subBg2 from '~/assets/images/cards/character2/sub-bg.png';
import image2 from '~/assets/images/characters/character2/character.png';
import looseImage2 from '~/assets/images/characters/character2/character-loose.png';
import backSubBg2 from '~/assets/images/cards/character2/back-sub-bg.png';

import baseBg3 from '~/assets/images/cards/character3/base-bg.png';
import subBg3 from '~/assets/images/cards/character3/sub-bg.png';
import image3 from '~/assets/images/characters/character3/character.png';
import looseImage3 from '~/assets/images/characters/character3/character-loose.png';
import backSubBg3 from '~/assets/images/cards/character3/back-sub-bg.png';

import baseBg4 from '~/assets/images/cards/character4/base-bg.png';
import subBg4 from '~/assets/images/cards/character4/sub-bg.png';
import image4 from '~/assets/images/characters/character4/character.png';
import looseImage4 from '~/assets/images/characters/character4/character-loose.png';
import unknownImage4 from '~/assets/images/cards/character4/unknown-bg.png';
import backSubBg4 from '~/assets/images/cards/character4/back-sub-bg.png';

import baseBg5 from '~/assets/images/cards/character5/base-bg.png';
import subBg5 from '~/assets/images/cards/character5/sub-bg.png';
import image5 from '~/assets/images/characters/character5/character.png';
import looseImage5 from '~/assets/images/characters/character5/character-loose.png';
import unknownImage5 from '~/assets/images/cards/character5/unknown-bg.png';
import backSubBg5 from '~/assets/images/cards/character5/back-sub-bg.png';

import baseBg6 from '~/assets/images/cards/character6/base-bg.png';
import subBg6 from '~/assets/images/cards/character6/sub-bg.png';
import image6 from '~/assets/images/characters/character6/character.png';
import looseImage6 from '~/assets/images/characters/character6/character-loose.png';
import backSubBg6 from '~/assets/images/cards/character6/back-sub-bg.png';

import baseBg7 from '~/assets/images/cards/character7/base-bg.png';
import subBg7 from '~/assets/images/cards/character7/sub-bg.png';
import image7 from '~/assets/images/characters/character7/character.png';
import looseImage7 from '~/assets/images/characters/character7/character-loose.png';
import unknownImage7 from '~/assets/images/cards/character7/unknown-bg.png';
import backSubBg7 from '~/assets/images/cards/character7/back-sub-bg.png';

import baseBg8 from '~/assets/images/cards/character8/base-bg.png';
import subBg8 from '~/assets/images/cards/character8/sub-bg.png';
import image8 from '~/assets/images/characters/character8/character.png';
import looseImage8 from '~/assets/images/characters/character8/character-loose.png';
import backSubBg8 from '~/assets/images/cards/character8/back-sub-bg.png';

import baseBg9 from '~/assets/images/cards/character9/base-bg.png';
import subBg9 from '~/assets/images/cards/character9/sub-bg.png';
import image9 from '~/assets/images/characters/character9/character.png';
import looseImage9 from '~/assets/images/characters/character9/character-loose.png';
import unknownImage9 from '~/assets/images/cards/character9/unknown-bg.png';
import backSubBg9 from '~/assets/images/cards/character9/back-sub-bg.png';

import baseBg10 from '~/assets/images/cards/character10/base-bg.png';
import subBg10 from '~/assets/images/cards/character10/sub-bg.png';
import image10 from '~/assets/images/characters/character10/character.png';
import looseImage10 from '~/assets/images/characters/character10/character-loose.png';
import unknownImage10 from '~/assets/images/cards/character10/unknown-bg.png';
import backSubBg10 from '~/assets/images/cards/character10/back-sub-bg.png';

export type Character = {
    id: number;
    name: string;
    baseBg: string;
    subBg: string;
    image: string;
    looseImage: string;
    imageWidth: number;
    imageHeight: number;
    borderColor: string;
    unknownImage?: string;
    backSubBg: string;
    pros: string[];
    cons: string[];
    backSign: ReactNode;
    backImageY: number;
    backImageWidth: number;
    backImageHeight: number;
    age: string;
};

export const CHARACTER_1: Character = {
    id: 1,
    name: 'Импульсивный трендвотчер',
    baseBg: baseBg1,
    subBg: subBg1,
    image: image1,
    looseImage: looseImage1,
    imageWidth: 420,
    imageHeight: 420,
    borderColor: '#872900',
    backSubBg: backSubBg1,
    pros: [
        'Креатив и тренды — её страсть. Знает каждый наряд на Met Gala и мемы из тиктока', 
        '100% внимания к деталям —\nеё день расписан по минутам,\nа любимое занятие — ставить галочки в списке дел'
    ],
    cons: ['Финансовая грамотность заканчивается в отделе со скидками на эстетичные вещи'],
    backSign: (
        <svg className='w-[calc(18px*var(--size-ratio))] h-[calc(17px*var(--size-ratio))]' viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.77456 1.33974C8.27209 0.364826 9.66512 0.364825 10.1627 1.33974L11.6809 4.31468C11.8756 4.69636 12.2412 4.96192 12.6644 5.02923L15.9628 5.55382C17.0438 5.72574 17.4743 7.05059 16.7008 7.82504L14.3406 10.1882C14.0378 10.4914 13.8982 10.9211 13.965 11.3444L14.4853 14.6436C14.6559 15.7247 13.5289 16.5435 12.5533 16.0473L9.57644 14.5329C9.1945 14.3386 8.7427 14.3386 8.36077 14.5329L5.38389 16.0473C4.40834 16.5435 3.28135 15.7247 3.45188 14.6436L3.97225 11.3444C4.03901 10.9211 3.8994 10.4914 3.59659 10.1882L1.23641 7.82504C0.462953 7.05059 0.893422 5.72574 1.97437 5.55382L5.27285 5.02923C5.69605 4.96192 6.06156 4.69636 6.25635 4.31468L7.77456 1.33974Z" fill="#872900"/>
        </svg>
    ),
    backImageY: 27,
    backImageWidth: 257,
    backImageHeight: 257,
    age: '22 года',
};

export const CHARACTER_2: Character = {
    id: 2,
    name: 'Финансовый стратег',
    baseBg: baseBg2,
    subBg: subBg2,
    image: image2,
    looseImage: looseImage2,
    imageWidth: 405,
    imageHeight: 405,
    borderColor: '#92006C',
    backSubBg: backSubBg2,
    pros: [
        'Каждый рубль учтён\nи не выбьется из формулы Excel',
        'Практична и опытна: виртуозно расставляет задачи закрытыми глазами',
    ],
    cons: [
        'Творческий подход\nне её сильная сторона — предпочитает проверенные временем решения',
    ],
    backSign: (
        <svg className='w-[calc(16px*var(--size-ratio))] h-[calc(16px*var(--size-ratio))]' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#92006C"/>
        </svg>
    ),
    backImageY: 40,
    backImageWidth: 287,
    backImageHeight: 287,
    age: '48 лет',
};

export const CHARACTER_3: Character = {
    id: 3,
    name: 'Техно-ниндзя',
    baseBg: baseBg3,
    subBg: subBg3,
    image: image3,
    looseImage: looseImage3,
    imageWidth: 397,
    imageHeight: 397,
    borderColor: '#2C2D84',
    backSubBg: backSubBg3,
    pros: [
        'Может найти любое решение проблемы в YouTube, а его любимый канал — Wylsacom',
        'Знает, как переформатировать любой файл в пдф-ку',
    ],
    cons: [
        'Впервые видит картридж\nвживую',
        'Паникует, если комбинация кнопок «включить-выключить»\nне срабатывает'
    ],
    backSign: (
      <svg className='w-[calc(13px*var(--size-ratio))] h-[calc(16px*var(--size-ratio))]' viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.53391 15.2906C2.77937 15.2906 0.62207 12.2206 0.62207 7.74001C0.62207 3.25946 2.77937 0.189453 6.53391 0.189453C10.2884 0.189453 12.4457 3.25946 12.4457 7.74001C12.4457 12.2206 10.2884 15.2906 6.53391 15.2906ZM6.53391 12.0546C8.27634 12.0546 9.12682 10.5404 9.12682 7.74001C9.12682 4.93967 8.27634 3.42541 6.53391 3.42541C4.79147 3.42541 3.941 4.93967 3.941 7.74001C3.941 10.5404 4.79147 12.0546 6.53391 12.0546Z" fill="#2C2D84"/>
      </svg>
    ),
    backImageY: 47,
    backImageWidth: 279,
    backImageHeight: 279,
    age: '24 года'
};

export const CHARACTER_4: Character = {
    id: 4,
    name: 'Дзен-инженер',
    baseBg: baseBg4,
    subBg: subBg4,
    image: image4,
    looseImage: looseImage4,
    imageWidth: 374,
    imageHeight: 374,
    borderColor: '#872900',
    unknownImage: unknownImage4,
    backSubBg: backSubBg4,
    pros: [
      'В его рюкзаке всегда есть запасные кабели, переходники и таинственная флешка с драйверами',
      'Знает секретный код для\nсброса настроек принтера',
      'Знает лайфхак: «Если стукнуть по корпусу — заработает»'
    ],
    cons: [
      'Не доверяет облачным хранилищам'
    ],
    backSign: (
      <svg className='w-[calc(21px*var(--size-ratio))] h-[calc(9px*var(--size-ratio))]' viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6.02222C4.31414 3.74158 10.9539 0.548686 19 6.02222" stroke="#872900" className='stroke-[calc(5.57766px*var(--size-ratio))]' />
      </svg>
    ),
    backImageY: 56,
    backImageWidth: 217,
    backImageHeight: 217,
    age: '46 лет'
};

export const CHARACTER_5: Character = {
    id: 5,
    name: 'Проработанный стажёр',
    baseBg: baseBg5,
    subBg: subBg5,
    image: image5,
    looseImage: looseImage5,
    imageWidth: 419,
    imageHeight: 419,
    borderColor: '#92006C',
    unknownImage: unknownImage5,
    backSubBg: backSubBg5,
    pros: [
      'Адепт Figma и Canva —\nв её арсенале 100 шаблонов презентации для любого\nпроекта',
      'Работает с психологом уже несколько месяцев и знает,\nкак бороться со стрессом\nи тревогой',
    ],
    cons: [
      'Публичные выступления — её личный ад: она не выносит\nвзгляды аудитории',
    ],
    backSign: (
      <svg className='w-[calc(20px*var(--size-ratio))] h-[calc(8px*var(--size-ratio))]' viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 2.30182C4.0454 1.50243 10.1362 2.32906 10.1362 7.67352C10.1362 3.3911 12.4968 1.14557 18.7916 2.30182" stroke="#92006C" className='stroke-[calc(3.63093px*var(--size-ratio))]' />
      </svg>
    ),
    backImageY: 37,
    backImageWidth: 287,
    backImageHeight: 287,
    age: '19 лет'
};

export const CHARACTER_6: Character = {
    id: 6,
    name: 'Мастер убеждения',
    baseBg: baseBg6,
    subBg: subBg6,
    image: image6,
    looseImage: looseImage6,
    imageWidth: 297,
    imageHeight: 446,
    borderColor: '#2C2D84',
    backSubBg: backSubBg6,
    pros: [
      'На собеседовании ждёт, когда рекрутер попросит «продать ручку», ведь у него в запасе\nуже 10 способов',
      'Играл в КВН в универе —\nи даже выиграл звание\n«Лучшего актёра»',
    ],
    cons: [
      'Скептически относится\nк психологии: считает, что\n«само пройдёт» и заедает стресс чем‑нибудь сладким',
    ],
    backSign: (
      <svg className='w-[calc(16px*var(--size-ratio))] h-[calc(15px*var(--size-ratio))]' viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2295 7.37305L12.9414 9.66113L9.37109 6.09082V14.8145H6.13867V6.29492L2.77148 9.66211L0.483398 7.37402L7.85449 0.000976562L7.85645 0L15.2295 7.37305Z" fill="#2C2D84"/>
      </svg>
    ),
    backImageY: 39,
    backImageWidth: 180,
    backImageHeight: 271,
    age: '51 год'
};

export const CHARACTER_7: Character = { 
    id: 7,
    name: 'Нейромант',
    baseBg: baseBg7,
    subBg: subBg7,
    image: image7,
    looseImage: looseImage7,
    imageWidth: 264,
    imageHeight: 404,
    borderColor: '#872900',
    unknownImage: unknownImage7,
    backSubBg: backSubBg7,
    pros: [
      'Гуру нейросетей — написал\n100+ промптов и вывел идеальную формулу общения\nс ChatGPT',
      'В арсенале сотни нейросетей\nна все случаи жизни',
    ],
    cons: [
      'Слепо доверяет GPT как своему лучшему другу, даже если тот утверждает, что столица\nТурции — Стамбул'
    ],
    backSign: (
      <svg className='w-[calc(15px*var(--size-ratio))] h-[calc(11px*var(--size-ratio))]' viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.83186 0L0 11H15L7.83186 0Z" fill="#872900"/>
      </svg>
    ),
    backImageY: 36,
    backImageWidth: 186,
    backImageHeight: 287,
    age: '23 года'
};

export const CHARACTER_8: Character = {
    id: 8,
    name: 'Контрол-фрик',
    baseBg: baseBg8,
    subBg: subBg8,
    image: image8,
    looseImage: looseImage8,
    imageWidth: 257,
    imageHeight: 385,
    borderColor: '#92006C',
    backSubBg: backSubBg8,
    pros: [
      'Его гугл-таблицы учитывают\nвсё — от времени на дорогу\nдо среднего чека в кафе',
      'Смотрел все выпуски «Орла\nи решки» и завел блокнот-путеводитель по миру'
    ],
    cons: [
      'Доверяет только бумажным картам, даже если они были напечатаны в 2015 году'
    ],
    backSign: (
      <svg className='w-[calc(16px*var(--size-ratio))] h-[calc(16px*var(--size-ratio))]' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="5.5" stroke="#92006C" className='stroke-[calc(5px*var(--size-ratio))]' />
      </svg>
    ),
    backImageY: 50,
    backImageWidth: 187,
    backImageHeight: 281,
    age: '33 года'
};

export const CHARACTER_9: Character = {
    id: 9,
    name: 'Мастер позитивных вибраций',
    baseBg: baseBg9,
    subBg: subBg9,
    image: image9,
    looseImage: looseImage9,
    imageWidth: 407,
    imageHeight: 407,
    borderColor: '#2C2D84',
    unknownImage: unknownImage9,
    backSubBg: backSubBg9,
    pros: [
      'Может поддержать морально\nв любой ситуации',
      'Ходячий цитатник Брайана Трейси, Кови и Джо Диспензы. «Каждое утро — шанс начать сначала», «Не ошибается тот, кто ничего не делает» — её Telegram-канал — хранилище мотивационных фраз'
    ],
    cons: [
      'Боится Excel-таблиц, а формулы ВПР снятся ей в кошмарах'
    ],
    backSign: (
      <svg className='w-[calc(16px*var(--size-ratio))] h-[calc(14px*var(--size-ratio))]' viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5928 0C13.7664 0 15.5278 1.76011 15.5312 3.93262C15.5314 3.9346 15.5331 3.93648 15.5332 3.93848C15.5632 4.98886 15.1206 5.85223 14.8955 6.15234L14.7158 6.33887C14.538 6.56987 14.3352 6.78043 14.1113 6.9668L8.03997 13.2795C7.92126 13.403 7.7241 13.4041 7.60403 13.282L1.19922 6.76855C1.00623 6.58166 0.83233 6.37516 0.680664 6.15234C0.432577 5.78784 0.243867 5.37948 0.128906 4.94141C0.100508 4.83318 0.076825 4.72298 0.0576172 4.61133L0.0546875 4.58691C0.0358853 4.47422 0.0234637 4.36785 0.0146484 4.27148C0.00547948 4.16184 0 4.05049 0 3.93848C0.000244734 1.76343 1.76405 0.000255947 3.93945 0C5.35143 0 6.58937 0.742897 7.28463 1.85898C7.45291 2.12911 8.07833 2.12911 8.24664 1.859C8.94213 0.74286 10.1807 3.5702e-05 11.5928 0Z" fill="#2C2D84"/>
      </svg>
    ),
    backImageY: 34,
    backImageWidth: 267,
    backImageHeight: 267,
    age: '36 лет'
};

export const CHARACTER_10: Character = {
    id: 10,
    name: 'Notion гуру',
    baseBg: baseBg10,
    subBg: subBg10,
    image: image10,
    looseImage: looseImage10,
    imageWidth: 264,
    imageHeight: 404,
    borderColor: '#872900',
    unknownImage: unknownImage10,
    backSubBg: backSubBg10,
    pros: [
      'Построил идеальную систему\nдля жизни в Notion с целями, привычками, базой фильмов\nи даже шаблонами для свиданий',
      'Профессионал по созданию идеальных to-do листов'
    ],
    cons: [
      'Постоянно переделывает\nшаблон вместо того,\nчтобы действовать по нему'
    ],
    backSign: (
      <svg className='w-[calc(19px*var(--size-ratio))] h-[calc(15px*var(--size-ratio))]' viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.48242 6.13934L8.30337 11.2488L16.5174 2" stroke="#872900" className='stroke-[calc(4.8094px*var(--size-ratio))]' />
      </svg>
    ),
    backImageY: 45,
    backImageWidth: 164,
    backImageHeight: 251,
    age: '38 лет'
};

export const ALL_CHARACTERS = [CHARACTER_1, CHARACTER_2, CHARACTER_3, CHARACTER_6, CHARACTER_8, CHARACTER_4, CHARACTER_5, CHARACTER_7, CHARACTER_9, CHARACTER_10];