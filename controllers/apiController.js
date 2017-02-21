function index(req, res){
  res.json({
    message: "Welcome to Tolkien Creature Quiz!",
    documentation_url: "https://github.com/rccacho/Project-01",
    base_url: "localhost:3000",
    endpoints: [{
      method: "GET",
      path: "/api",
      description: "describes available endpoints"
    },
  {
    method: "GET",
    path: "/api/users",
    description: "returns all users"
  },
  {
    method: "GET",
    path: "api/users/:id",
    description: "returns one user by ID"
  },
  {
    method: "POST",
    path: "api/users",
    desciption: "add a user to the database"
  },
  {
    method: "PUT",
    path: "api/users/:id",
    desciption: "update a user by ID"
  },
  {
    method: "DELETE",
    path: "api/users/:id",
    desciption: "remove a user from the database by ID"
  },
  {
    method: "GET",
    path: "api/creatures",
    description: "returns all creatures"
  },
  {
    method: "GET",
    path: "api/questions",
    description: "returns all questions"
  }]
  });
};

module.exports = {
  index: index
}
