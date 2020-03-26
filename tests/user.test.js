const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "andrew",
      email: "andrewjhinger@gmail.com",
      password: "testtesttest"
    })
    .expect(201);

  //Assert db was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNUll;

  //   expect(response.body.user.name).toBe("Andrew");
  expect(response.body).toMatchObject({
    user: { name: "andrew", email: "andrewjhinger@gmail.com" },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe("testtesttest");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  //Assert db was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNUll;

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "poop",
      password: "poop"
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    // .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
});

test("should delete user when authenticated", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  //Assert db was changed correctly
  const user = await User.findById(userOneId);
  expect(user).toBeNUll;
});

test("should not delete user when not authenticated", async () => {
  await request(app)
    .delete("/users/me")
    // .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
});

// test("should upload avatar image", async () => {
//   await request(app)
//     .post("users/me/avatar")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .attach("avatar", "tests/fixtures/012.jpg")
//     .expect(200);

//   const user = await User.findById(userOneId);
//   expect(user.avatar).toEqual(expect.any(Buffer));
// });
