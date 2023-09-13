const inpUrl = document.querySelector('#inpUrl');
const textArea = document.querySelector('#txt')
const pbFetch = document.querySelector('#pbFetchUrl');
pbFetch.addEventListener('click', actionFetchUrl);


function fetchAnyUrl(url) {
    return fetch(url).then(response => response.text().then(data => data));
}

function actionFetchUrl() {
    const url = inpUrl.value
    fetchAnyUrl(url).then(
        jsonOutput => textArea.textContent =jsonOutput
    );
}

async function newActionFetchUrl() {
    const res = await fetch(inpUrl.value);
    const data = await res.text();
    textArea.textContent = data;
}

