const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userTwo, taskOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "clean fireplace" })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("should return tasks for a user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});

test("should not be able to delete another user's task", async () => {
  const response = await request(app)
    .get(`/tasks:id${taskOne.owner}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(response.body._id);
  expect(task).toBeNull();
});
