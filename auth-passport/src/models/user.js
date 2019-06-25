const users = [
  { id: 1, username: 'xiaodongio', password: '123456' }, 
  { id: 2, username: 'nodejs', password: 'passport' }
]


exports.findByName = (name) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.username === username) {
        resolve(user);
      }
    }
  })
}

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    var idx = id - 1;
    if (users[idx]) {
      resolve(users[idx]);
    } else {
      reject(new Error('User ' + id + ' does not exist'));
    }
  })
}


