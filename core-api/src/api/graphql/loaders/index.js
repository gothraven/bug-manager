export default async (keys, models, model) => {
  const data = await models[model].find({
    _id: {
      $in: keys
    }
  });

  return keys.map(key => data.find(x => x.id === `${key}`));
};
