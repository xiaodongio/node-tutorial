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

Task.find({'project': 'Bikeshed'}, (err, tasks) => {
  tasks.forEach(task => {
    console.log('Id : ' + task._id);
    console.log('description : ' + task.description);
  });
})

