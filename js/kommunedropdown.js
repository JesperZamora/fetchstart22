const urlKommuner = 'https://api.dataforsyningen.dk/kommuner'

const ddKommuner = document.querySelector('#ddKommuner');
const pbFetchKommuner = document.querySelector('#pbFetchKommuner');

pbFetchKommuner.addEventListener('click', loadData);
ddKommuner.addEventListener('change', openWebsite);

let kommuneNavneAndHrefList;


function mapNameAndHref(kommuner) {
    kommuneNavneAndHrefList = kommuner.map(kom => {
        return {
            navn: kom.navn,
            href: kom.href
        }
    });
}

function addKommunerToList() {
    kommuneNavneAndHrefList.forEach(kom => {
        const element = document.createElement('option');
        element.value = kom.href;
        element.textContent = kom.navn;
        ddKommuner.append(element);
    });
}

/**
 * I use await two times instead of using a "handler function", like the fetchAnyUrl() in fetchurl.js, that uses "then()"
 * See the fetchurl.js for more info.
 */
async function loadData() {
    const res = await fetch(urlKommuner);
    const data = await res.json();
    mapNameAndHref(data)
    addKommunerToList();
}

function openWebsite() {
    const selectedValue = this.value;
    window.open(selectedValue, '_blank');
}


/**
 * Everything below is code written to search for a Kommune by name.
 * When you press the "Load data", data from the API wil be fetched see function "loadData()".
 * The function "mapNameAndHref(data)" inside the "loadData() will call the function and send the Array to mapNameAndHref().
 * mapNameAndHref will sort the Array using the map function and inside the map function it will create a new object literal
 * with "navn" and "href".
 * The map function will return an array only containing the objects with navn and href and it will be set to a global variable,
 * so it can be used in other functions like the "searchByName()". In the searchByName() function, using the filter function it will return true
 * if there is a match to the input name, and if it's true there is chained a map function that will return an Array containing the href.
 */
const pbSearch = document.querySelector('#pbSearch');
const inpSearch = document.querySelector('#inpSearch');
const kommuneList = document.querySelector('#kommuneList');

pbSearch.addEventListener('click', searchByName);

function searchByName() {
    const inp = inpSearch.value;
    const kommuneUrl = kommuneNavneAndHrefList.filter(komm => {
        return komm.navn === inp;
    }).map(komHref => {
        return komHref.href;
    });

    const elements = kommuneList.querySelectorAll('a');

    let nameAlreadyExists = false;

    elements.forEach(element => {
        if (element.textContent === inp) {
            nameAlreadyExists = true;
        }
    });

    if (kommuneUrl.length > 0 && !nameAlreadyExists) {
        const element = document.createElement('a');
        const br = document.createElement('br');
        element.href = kommuneUrl[0];
        element.textContent = inp;
        element.target = '_blank';
        kommuneList.append(element);
        kommuneList.append(br);
    }
}




