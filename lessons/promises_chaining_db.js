require('../src/db/mongoose');
const User = require('../src/models/user');

// 5d3761b0cee43e0d88a80a33

User.findById('5d3761b0cee43e0d88a80a33', { age: 10}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});