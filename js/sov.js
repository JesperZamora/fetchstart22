function sov(ms) {
    console.log('Making new Promise inside sov');
    const prom = new Promise(dummyFunction =>
    setTimeout(dummyFunction,ms));
    console.log('Done with making Promise');
    return prom;
}

console.log('start');

async function doSomethingAsync() {
    console.log('Starting Inside doSomethingAsync')
    await sov(10000);
    console.log('Done with doSomethingAsync')
}

doSomethingAsync();
console.log('finish')