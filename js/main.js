const myTable = document.getElementsByTagName('table')[0];


async function populateTable() {
    const url =  "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const url1 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    //fetching the json data from the above url
    const populationPromise = await fetch(url);
    const employmentPromise = await fetch(url1);        
    const populationJSON = await populationPromise.json()
    const employmentJSON = await employmentPromise.json();

    const muncData = Object.values(populationJSON.dataset.dimension.Alue.category.label)
    const popData = populationJSON.dataset.value
    const empData = employmentJSON.dataset.value
    
    for (let index = 0; index < muncData.length; index++) {
        // building a row of data to the table
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        td1.innerText = muncData[index] //municipality.dimension.Alue.category.label
        td2.innerText = popData[index]
        td3.innerText = empData[index]
        // employment percentage 
        let emprate = (Number(empData[index])/Number(popData[index]))*100

        // table rows are given class based on the requirements,
        // this way the css can recognize them and set the appropriate colour.
        if(emprate > 45){
            tr.classList.add('highEmployment')
        }else if(emprate < 25){
            tr.classList.add('lowEmployment')
        }
        td4.innerText = emprate.toFixed(2)+"%" 
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        myTable.querySelector('tbody').appendChild(tr);
        
    }
    
} 

// runs our function when the page has been loaded
document.addEventListener("DOMContentLoaded", populateTable);







