const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const Tasks = new Schema({
  project: String,
  description: String
});

const Task = mongoose.model('Task', Tasks);

let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';

// task.save(err => {
//   if (err) throw err;
//   console.log('Task saved.');
// });

// Task.find({'project': 'Bikeshed'}, (err, tasks) => {
//   tasks.forEach(task => {
//     console.log('Id : ' + task._id);
//     console.log('description : ' + task.description);
//   });
// });


// Task.findOne({}, function(err, doc) {
//   if(!err) {
//     console.log(doc);
//     doc.update({$set: {project: "Bikeshed1"}}, function(err) {
//       console.log(arguments);
//     })
//     // doc.project = "Bikeshed2";
//     // doc.save();
//     console.log(doc.get("project"));
//   }
// });


async function create() {
  return await Task.create({
    "project": "mongodb1",
    "description" : "demo2"
  });
}


console.log(create().then());