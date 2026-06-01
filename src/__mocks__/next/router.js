exports.useRouter = function () {
  return {
    locale: 'en',
    push: function (value) {
      return value;
    },
    query: {
      token: 'token',
    },
  };
};
