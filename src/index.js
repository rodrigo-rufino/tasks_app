const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});



// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({ _id: '123'}, 'taskapp_jwt', {expiresIn: '7 days'});
//     console.log('token:', token);

//     const data = jwt.verify(token, 'taskapp_jwt');
//     console.log(data);
// }

// myFunction();