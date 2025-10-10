import { faker } from "@faker-js/faker";

export const FakeData = {
  randomName: () => faker.person.fullName(),
  randomEmail: () => faker.internet.email(),
  randomPhone: () => faker.phone.number(),
  randomPassword: () => faker.internet.password({ length: 10 }),
  randomSentence: () => faker.lorem.sentence(),
  randomWord: () => faker.lorem.word(),
};