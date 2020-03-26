const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// const me = new User({
//   name: "andrew hinger",
//   email: "mike@gmial.com",
//   password: "sdsdpassword   "
// });

// me.save()
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const newTask = new Task({ description: "make cookies" });
// newTask
//   .save()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
