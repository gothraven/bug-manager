export default async (keys, models) => {
  const tags = await models.Tag.find({
    _id: {
      $in: keys
    }
  });

  return keys.map(key => tags.find(tag => tag.id === key));
};
