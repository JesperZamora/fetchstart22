const inpUrl = document.querySelector('#inpUrl');
const textArea = document.querySelector('#txt')
const pbFetch = document.querySelector('#pbFetchUrl');
pbFetch.addEventListener('click', actionFetchUrl);


//original code given 13/09/2023
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.text());
}

async function actionFetchUrl() {
    const url = inpUrl.value
    const jsonOutput = await fetchAnyUrl(url);
    textArea.textContent = jsonOutput;
}



//Update to the original code given above. Instead of combining the async/await with then();

function newFetchAnyUrl(url) {
    return fetch(url).then(response => response.text().then(data => data));
}

// The reason we use "then()" again when calling our newFetchAnyUrl(url) is because it returns a Promise.
// So to gain access to the information we need to use the "then()" and give it function.
function newActionFetchUrl() {
    const url = inpUrl.value
    newFetchAnyUrl(url).then(
        jsonOutput => textArea.textContent =jsonOutput
    );
}


// This function does the same as the two functions above only using async/await.
async function newActionFetchUrl() {
    const res = await fetch(inpUrl.value);
    const data = await res.text();
    textArea.textContent = data;
}
