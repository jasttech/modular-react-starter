import * as faker from 'faker';

export const userGenerator = (overrides) => ({
  id: faker.datatype.uuid(),
  firstName: faker.internet.userName(),
  lastName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  teamId: faker.datatype.uuid(),
  teamName: faker.company.companyName(),
  role: 'ADMIN',
  bio: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const teamGenerator = (overrides) => ({
  id: faker.datatype.uuid(),
  name: faker.company.companyName(),
  description: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const discussionGenerator = (overrides) => ({
  id: faker.datatype.uuid(),
  title: faker.company.catchPhrase(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const commentGenerator = (overrides) => ({
  id: faker.datatype.uuid(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});
