const _ = require('lodash');
const faker = require('faker');
const mongoose = require('./src/config/mongoose');
const models = require('./src/api/models').default;

const db = mongoose.connect();

const defaultUsers = [
  {
    email: 'admin@bug.co',
    password: 'password',
    name: 'Admin',
    role: 'ADMIN'
  },
  {
    email: 'dev@bug.co',
    password: 'password',
    name: 'Developer',
    role: 'DEVELOPER'
  },
  {
    email: 'user@bug.co',
    password: 'password',
    name: 'User',
    role: 'USER'
  }
];
const defaultTags = ['New Issue', 'Blocked', 'Urgent', 'Bug', 'Feature'];
const defaultStatuses = ['In Progress', 'Testing', 'Fixed'];

db.once('open', async () => {
  // Empty Database
  await models.User.deleteMany();
  await models.Project.deleteMany();
  await models.Tag.deleteMany();
  await models.Status.deleteMany();
  await models.Issue.deleteMany();
  await models.Comment.deleteMany();
  await models.Change.deleteMany();

  // Create Users
  await Promise.all(defaultUsers.map(async (user) => {
    await models.User.create(user);
  }));
  await Promise.all(_.range(7).map(async () => {
    await models.User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      role: faker.random.arrayElement(['USER', 'ADMIN', 'DEVELOPER'])
    });
  }));

  // Create Projects
  await Promise.all(_.range(5).map(async () => {
    await models.Project.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence()
    });
  }));

  // Create Tags
  await Promise.all(defaultTags.map(async (value) => {
    await models.Tag.create({
      name: value,
      description: faker.lorem.sentence(),
      color: faker.internet.color().toUpperCase()
    });
  }));

  // Create Statuses
  await Promise.all(defaultStatuses.map(async (value) => {
    await models.Status.create({
      name: value,
      description: faker.lorem.sentence()
    });
  }));

  // Create Issues
  const users = await models.User.find({});
  await Promise.all(_.range(15).map(async () => {
    const creatorId = faker.random.arrayElement(users).id;
    const issue = await models.Issue.create({
      title: faker.company.catchPhrase(),
      creatorId
    });
    await models.Comment.create({
      creatorId,
      issueId: issue.id,
      content: faker.lorem.paragraph()
    });
  }));
  process.exit();
});
