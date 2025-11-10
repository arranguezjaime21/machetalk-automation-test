import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });

export const FakeData = {
  randomName: () => faker.person.fullName(),
  randomEmail: () => faker.internet.email(),
  randomPhone: () => faker.phone.number('+1##########'),
  randomPassword: (len = 10) => faker.internet.password({ length: len }),
  randomSentence: () => {
    const subjects = ["I", "We", "My friend", "This user", "Someone"];
    const verbs = ["posted", "shared", "created", "enjoyed", "watched"];
    const objects = ["a video", "a photo", "a story", "a live stream", "a post"];
    const endings = ["today!", "recently!", "just now!", "on the timeline!", "with everyone!"];
    return `${faker.helpers.arrayElement(subjects)} ${faker.helpers.arrayElement(verbs)} ${faker.helpers.arrayElement(objects)} ${faker.helpers.arrayElement(endings)}`;
  },
  randomWord: () => faker.word.noun(),
};