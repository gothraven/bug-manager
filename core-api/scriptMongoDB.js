// const connect = require("./src/config/mongoose");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });
const models = require('./src/api/models');

const users = [
  {
    _id: 1001,
    email: 'AdelV@mail.fr',
    password: '@Test@!',
    name: 'Adele VANCE',
    role: 'user'
  },
  {
    _id: 1002,
    email: 'AlexW@mail.fr',
    password: '@Test@!',
    name: 'Alex WILBER',
    role: 'user'
  },
  {
    _id: 1003,
    email: 'GradieA@mail.fr',
    password: '@Test@!',
    name: 'Gradie ARCHIE',
    role: 'user'
  },
  {
    _id: 1004,
    email: 'HenriettaM@mail.fr',
    password: '@Test@!',
    name: 'Henrietta MUELLER',
    role: 'user'
  },
  {
    _id: 1005,
    email: 'JohannaL@mail.fr',
    password: '@Test@!',
    name: 'Johanna Lorenz',
    role: 'user'
  },
  {
    _id: 1006,
    email: 'admin@mail.fr',
    password: '@Test@!',
    name: 'Admin',
    role: 'admin'
  }
];

const projects = [
  {
    _id: 2001,
    name: 'First Project v1',
    description: 'this is just a testing project v1',
    createdAt: '2019-10-27T00:38:48.931+00:00',
    updatedAt: '2019-10-27T18:16:16.154+00:00'
  },
  {
    _id: 2002,
    name: 'Project Y',
    description: 'Lorem ipsum dolor sit amet',
    createdAt: '2019-11-13T23:12:09.420+00:00',
    updatedAt: '2019-11-13T23:27:19.358+00:00'
  },
  {
    _id: 2003,
    name: 'Project Alpha',
    description: 'Lorem ipsum dolor sit amet',
    createdAt: '2019-11-13T23:27:22.867+00:00',
    updatedAt: '2019-11-13T23:27:27.869+00:00'
  },
  {
    _id: 2004,
    name: 'Project Z',
    description: 'The Space X project we always talked about',
    createdAt: '2019-11-13T23:27:37.324+00:00',
    updatedAt: '2019-12-01T00:46:43.515+00:00'
  }
];

const status = [
  {
    _id: 3001,
    name: 'New Issue',
    description: 'when ever something new',
    createdAt: '2019-11-09T16:56:45.782+00:00',
    updatedAt: '2019-11-09T16:56:45.782+00:00'
  },
  {
    _id: 3002,
    name: 'In Progress',
    description: 'when ever in progress',
    createdAt: '2019-11-09T16:58:41.035+00:00',
    updatedAt: '2019-11-09T16:58:41.035+00:00'
  },
  {
    _id: 3003,
    name: 'Testing',
    description: 'when ever we test',
    createdAt: '2019-11-09T16:58:41.035+00:00',
    updatedAt: '2019-11-09T16:58:41.035+00:00'
  }
];

const tags = [
  {
    _id: 4001,
    name: 'tata',
    description: 'description 1',
    color: '#00D084'
  },
  {
    _id: 4002,
    name: 'toto',
    description: 'description 2',
    color: '#FF6900'
  },
  {
    _id: 4003,
    name: 'tato',
    description: 'description 3',
    color: '#0693E3'
  },
  {
    _id: 4004,
    name: 'titi',
    description: 'description 4',
    color: '#EB144C'
  }
];

const changes = [
  {
    _id: 5001,
    creatorId: 1001,
    issueId: 7001,
    type: 'ADD_TAG',
    data: {
      tagId: '5de2dce01919b04f5d5559be'
    },
    createdAt: '2019-12-16T01:30:29.353+00:00',
    updatedAt: '2019-12-16T01:30:29.353+00:00'
  },
  {
    _id: 5002,
    creatorId: 1002,
    issueId: 7002,
    type: 'ADD_TAG',
    data: {
      tagId: '5dcb40cdd5c7e5c4f5673071'
    },
    createdAt: '2019-12-16T01:31:06.991+00:00',
    updatedAt: '2019-12-16T01:31:06.991+00:00'
  },
  {
    _id: 5003,
    creatorId: 1003,
    issueId: 7003,
    type: 'ADD_TAG',
    data: {
      tagId: '5dcb40cdd5c7e5c4f5673071'
    },
    createdAt: '2019-12-16T01:31:06.991+00:00',
    updatedAt: '2019-12-16T01:31:06.991+00:00'
  },
  {
    _id: 5004,
    creatorId: 1004,
    issueId: 7004,
    type: 'ADD_TAG',
    data: {
      tagId: '5dcb2ec8d5c7e5c4f5673070'
    },
    createdAt: '2019-12-16T01:31:07.001+00:00',
    updatedAt: '2019-12-16T01:31:07.001+00:00'
  }
];

const comments = [
  {
    _id: 6001,
    creatorId: 1001,
    issueId: 7001,
    content: 'Something wrong with all the titles',
    createdAt: '2019-11-20T20:54:44.263+00:00',
    updatedAt: '2019-11-20T20:54:44.263+00:00'
  },
  {
    _id: 6002,
    creatorId: 1002,
    issueId: 7002,
    content: 'The first comment on this issue',
    createdAt: '2019-11-20T20:55:37.996+00:00',
    updatedAt: '2019-11-20T20:55:37.996+00:00'
  },
  {
    _id: 6003,
    creatorId: 1003,
    issueId: 7003,
    content: 'This is the first working UX issue',
    createdAt: '2019-12-01T22:43:28.097+00:00',
    updatedAt: '2019-12-01T22:43:28.097+00:00'
  },
  {
    _id: 6004,
    creatorId: 1004,
    issueId: 7004,
    content: 'This one is gonna be the right one',
    createdAt: '2019-12-01T22:44:16.918+00:00',
    updatedAt: '2019-12-01T22:44:16.918+00:00'
  },
  {
    _id: 6005,
    creatorId: 1005,
    issueId: 7005,
    content: 'This one should update another query',
    createdAt: '2019-12-01T22:47:18.368+00:00',
    updatedAt: '2019-12-01T22:47:18.368+00:00'
  },
  {
    _id: 6006,
    creatorId: 1006,
    issueId: 7003,
    content: 'This one should update the UX but not travel to another page',
    createdAt: '2019-12-01T22:48:02.829+00:00',
    updatedAt: '2019-12-01T22:48:02.829+00:00'
  },
  {
    _id: 6007,
    creatorId: 1006,
    issueId: 7004,
    content: 'something to try',
    createdAt: '2019-12-15T00:47:43.877+00:00',
    updatedAt: '2019-12-15T00:47:43.877+00:00'
  }
];

const issues = [
  {
    _id: 7001,
    open: true,
    assignedUserIds: [1006],
    tagIds: [4001, 4002, 4003, 4004],
    title: 'Bug in UX',
    creatorId: 1006,
    statusId: 3001,
    createdAt: '2019-11-20T20:54:44.239+00:00',
    updatedAt: '2019-12-16T01:31:06.973+00:00'
  },
  {
    _id: 7002,
    open: true,
    assignedUserIds: [1006],
    tagIds: [],
    title: 'First UX Issue',
    creatorId: 1001,
    statusId: 3001,
    createdAt: '2019-12-01T22:43:28.045+00:00',
    updatedAt: '2019-12-16T01:29:19.783+00:00'
  },
  {
    _id: 7003,
    open: true,
    assignedUserIds: [1006],
    tagIds: [],
    title: 'Second Created Issue',
    creatorId: 1002,
    statusId: 3002,
    createdAt: '2019-12-01T22:44:16.852+00:00',
    updatedAt: '2019-12-16T01:29:33.855+00:00'
  },
  {
    _id: 7004,
    open: true,
    assignedUserIds: [1006],
    tagIds: [],
    title: 'Third Create Issue',
    creatorId: 1003,
    statusId: 3002,
    createdAt: '2019-12-01T22:47:18.349+00:00',
    updatedAt: '2019-12-16T01:29:42.892+00:00'
  },
  {
    _id: 7005,
    open: true,
    assignedUserIds: [1006],
    tagIds: [],
    title: 'Fourth Issue',
    creatorId: 1004,
    statusId: 3003,
    createdAt: '2019-12-01T22:48:02.801+00:00',
    updatedAt: '2019-12-17T15:31:28.338+00:00'
  }
];

mongoose.once('open', () => {
  users.forEach((user) => {
    new models.User(user).save((err) => {
      if (err) throw err;
    });
  });
  projects.forEach((project) => {
    new models.Project(project).save((err) => {
      if (err) throw err;
    });
  });
  status.forEach((statut) => {
    new models.Status(statut).save((err) => {
      if (err) throw err;
    });
  });
  tags.forEach((tag) => {
    new models.Tag(tag).save((err) => {
      if (err) throw err;
    });
  });
  changes.forEach((change) => {
    new models.Change(change).save((err) => {
      if (err) throw err;
    });
  });
  comments.forEach((comment) => {
    new models.Comment(comment).save((err) => {
      if (err) throw err;
    });
  });
  issues.forEach((issue) => {
    new models.Issue(issue).save((err) => {
      if (err) throw err;
    });
  });
});
