import { GameItem, GameCreator } from '../models/game.item.model';

const creator1: GameCreator = {
  name: 'ST',
  iconUrl: 'assets/creators/steam.png',
};
const creator2: GameCreator = {
  name: 'EP',
  iconUrl: 'assets/creators/epic.png',
};
const creator3: GameCreator = {
  name: 'RK',
  iconUrl: 'assets/creators/rockstar.png',
};
const creator4: GameCreator = {
  name: 'RT',
  iconUrl: 'assets/creators/riot.png',
};
const creator5: GameCreator = {
  name: 'EA',
  iconUrl: 'assets/creators/ea.png',
};
const creator6: GameCreator = {
  name: 'RB',
  iconUrl: 'assets/creators/roblox.png',
};

export const CREATORS: GameCreator[] = [
  creator1,
  creator2,
  creator3,
  creator4,
  creator5,
  creator6,
];

export const GAME_LIST: GameItem[] = [
  {
    id: '1',
    name: 'game 1',
    description: 'First game in the series.',
    creation: new Date(),
    creators: [creator1, creator2],
  },
  {
    id: '95',
    name: 'empty level',
    description: 'A level with no content.',
    creation: new Date(),
    creators: [creator4],
  },
  {
    id: '99',
    name: 'new level',
    description: 'A newly created level.',
    creation: new Date(),
    creators: [],
  },
  {
    id: '3',
    name: 'battle zone',
    description: 'Intense battle arena.',
    creation: new Date(),
    creators: [creator3, creator4, creator5, creator1],
  },
  {
    id: '2',
    name: 'ocean adventure',
    description: 'Explore the vast ocean.',
    creation: new Date(),
    creators: [],
  },
  {
    id: '45',
    name: 'castle defense',
    description: 'Defend the mighty castle.',
    creation: new Date(),
    creators: [...CREATORS],
  },
  {
    id: '5',
    name: 'long journey',
    description: 'A journey across the lands.',
    creation: new Date(),
    creators: [],
    parentId: '45',
  },
  {
    id: '7',
    name: 'forest quest',
    description: 'A quest deep in the forest.',
    creation: new Date(),
    creators: [],
    parentId: '45',
  },
  {
    id: '9',
    name: 'mountain pass',
    description: 'Navigate the dangerous mountains.',
    creation: new Date(),
    creators: [],
    parentId: '45',
  },
  {
    id: '88',
    name: 'final battle',
    description: 'The ultimate showdown.',
    creation: new Date(),
    creators: [],
    parentId: '99',
  },
];
