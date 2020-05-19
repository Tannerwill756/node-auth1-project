exports.seed = function (knex) {
  const users = [
    {
      username: "Liam",
      password: "123",
      role: 1,
    },
    {
      username: "Noah",
      password: "pizza",
      role: 2,
    },
    {
      username: "William",
      password: "secret",
      role: 1,
    },
    {
      username: "James",
      password: "password",
      role: 2,
    },
    {
      username: "Justin",
      password: "dogs",
      role: null,
    },
  ];
  return knex("users").insert(users);
};
