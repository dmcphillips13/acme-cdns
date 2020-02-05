const productsHeader = document.querySelector('#products thead');

const productsBody = document.querySelector('#products tbody');

const companiesHeader = document.querySelector('#companies thead');

const companiesBody = document.querySelector('#companies tbody');


const productsTable = document.querySelector('#products');
const companiesTable = document.querySelector('#companies');

const pProducts = axios.get('https://acme-users-api-rev.herokuapp.com/api/products');

const pCompanies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies');

const pAll = Promise.all([pProducts, pCompanies])
  .then( responses => {
    return responses.map(response => response.data);
  });

pAll.then(data => {
    const [products, companies] = data;
    render(companies, companiesTable);
    render(products, productsTable);
    toggleTables();
});

const render = (data, table) => {
    const labels = [];
    let htmlHeader = '<thead><tr>';
    let htmlBody = '<tbody>';

    data.forEach(item => {
        for (const property in item) {
            if (labels.indexOf(property) === -1) {
                labels.push(property);
                htmlHeader += `<th>${property.toUpperCase()}</th>`
            }
            htmlBody += `<td>${item[property]}</td>`
        }

        htmlHeader += '</tr>';
        htmlBody += '</tr>';
    });

    htmlHeader += '</tr></thead>';
    htmlBody += '</tbody>';

    //header.innerHTML =  htmlHeader;
    table.innerHTML =  htmlHeader + htmlBody;
}

const toggleTables = () => {
    const hash = window.location.hash.slice(1);

    if (hash === 'products') {
        console.log('products');
        productsTable.classList.remove('d-none');
        companiesTable.classList.add('d-none');
    } else {
        console.log('companies');
        productsTable.classList.add('d-none');
        companiesTable.classList.remove('d-none');
    }

    const link = document.querySelector('.nav-link');
}


window.addEventListener('hashchange', () => {
    toggleTables();
})
