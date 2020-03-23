const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
MongoClient.connect(
  // connectioninfo: /cygdrive/c/Users/andrew/mongodb/bin/mongod.exe --dbpath=/Users/andrew/mongodb-data
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to db");
    }
    console.log("connected to db");
    const db = client.db(databaseName);

    // db.collection("users")
    //   .deleteMany({ age: 34 })
    //   .then(result => {
    //     console.log(result.deletedCount);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({ description: "make dinner" })
      .then(result => {
        console.log(result.deletedCount);
      })
      .catch(error => {
        console.log(error);
      });
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5e77a626a8d79702b89ee2eb")
    //     },
    //     {
    //       $set: { name: "vikram-bikram" }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany({ completed: false }, { $set: { completed: true } })
    //   .then(result => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5e76a71d9eb22032a055f879") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("could not find user");
    //     }
    //     console.log(user);
    //   }
    // );

    //returns cursor
    // db.collection("users")
    //   .find({ age: 34 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("5e76a71d9eb22032a055f87c") },
    //   (error, task) => {
    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    // db.collection("users").insertOne(
    //   { _id: id, name: "vikram", age: 99 },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     { name: "Gus", age: 33 },
    //     { name: "Brian", age: 55 },
    //     { name: "Janean", age: 34 },
    //     { name: "Travis", age: 34 }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "clean house",
    //       completed: true
    //     },
    //     {
    //       description: "clean boat",
    //       completed: false
    //     },
    //     {
    //       description: "make dinner",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("could not add tasks");
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);
