const Query = {
  me: (obj, agrs, context) => {
    const fullName = obj.me.name;
    const shortName = (fullName[0] + fullName.split(' ')[1][0]).toUpperCase();

    const data = {
      me: {
        shortName,
        __typename: 'User',
      },
    };

    context.client.writeData({
      data,
    });
  },
};

export default Query;
