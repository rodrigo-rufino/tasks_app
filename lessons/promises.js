const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7, 4, 1]);
        reject('Things went wrong!');
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log('Success!', result);
}).catch((error) => {
    console.log('Error!', error);
});






// ======== Promise Chaining
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

// Bad Example:
add(1, 2).then((sum) => {
    console.log(sum);
    add(10, 20).then((sum) => {
        console.log(sum);
    }).catch((e) => {
        console.log(e);
    });
}).catch((e) => {
    console.log(e);
});

// Good Example:
add(1, 2).then((sum) => {
    console.log(sum);
    return add(sum, 4);
}).then((sum2) => {
    console.log(sum2);
}).catch((e) => {
    console.log(e);
});