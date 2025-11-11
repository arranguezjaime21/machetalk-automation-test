import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });

export const FakeData = {
  randomName: () => faker.person.fullName(),
  randomEmail: () => faker.internet.email(),
  randomPhone: () => faker.phone.number('+1##########'),
  randomPassword: (len = 10) => faker.internet.password({ length: len }),
  randomSentence: () => {
    const subjects = ["I", "We", "My friend", "This user", "Someone", "Everyone", "Girl"];
    const verbs = ["posted", "shared", "created", "enjoyed", "watched", "shows", "play"];
    const objects = ["a video", "a photo", "a story", "a live stream", "a post", "a reels", "a timeline"];
    const endings = ["today!", "recently!", "just now!", "on the timeline!", "with everyone!", "yesterday", "last month", "last year"];
    return `${faker.helpers.arrayElement(subjects)} ${faker.helpers.arrayElement(verbs)} ${faker.helpers.arrayElement(objects)} ${faker.helpers.arrayElement(endings)}`;
  },
  randomWord: () => faker.word.noun(),
};