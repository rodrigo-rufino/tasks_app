require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');


// promises chaining
User.findById('5d3761b0cee43e0d88a80a33', { age: 10}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then((result) => {
    console.log('count result:', result);
}).catch((e) => {
    console.log(e);
});


// async await example
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5d3761b0cee43e0d88a80a33', 33).then((count) => {
    console.log('age count:', count);
}).catch((e) => {
    console.log(e);
});


// async await example 2
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteTaskAndCount('5d37607f34411117881b99bb').then((count) => {
    console.log('remaining tasks:', count);
}).catch((e) => {
    console.log(e);
});