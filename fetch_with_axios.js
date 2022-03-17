//  BIJ HET LADEN VAN DE PAGINA, ALS HIJ KLAAR IS, SPELERS LADEN
document.onreadystatechange = function(event) {

    if (document.readyState === "complete") {
        getSpelers();
    }

};

// GET
async function getSpelers() {

    const url = "http://localhost:8081/spelers";

    try {
        const response = await axios(url);
        BuildTableSpelers(response.data);
        // resultaat.innerText =  response.data.places[0]["place_name"];
    }
    catch (error) {
        divResponse.innerText = "Fout bij oproepen API";
    }
}
// END GET

// POST
document.querySelector("#add").onclick = async () => {

    try {
        const data = { 'naam': document.querySelector("#naam").value };

        const options = {
            url: "http://localhost:8081/spelers",
            method: 'POST',
            headers: {"content-type": "application/json" },
            data: JSON.stringify(data),
        };

        const response = await axios(options);

        getSpelers();
    }
    catch (error) {
        divResponse.innerText = "Fout bij oproepen API";
    }
}
// END POST


// PUT
document.querySelector("#tblSpelers").addEventListener('click', async function(e) {

        if ( e.target.className == 'edit btn btn-primary' ) {

            let button = e.target;
            let caption = button.innerHTML;
            let naamcel = button.parentElement.parentElement.firstChild;
            let naam = naamcel.innerHTML;
            let id = button.getAttribute("data-id"); //speler id ophalen

            if ( caption == "Edit" )
            {
                naamcel.innerHTML = "<input type=text id=editInput value='" + naam + "'>";
                button.innerHTML = "Store";
            }

            if ( caption == "Store" )
            {
                nieuwe_naam = document.querySelector("#editInput").value;

                try {
                    const data = { 'naam': nieuwe_naam };

                    const options = {
                        url: "http://localhost:8081/speler/" + id,
                        method: 'PUT',
                        headers: {"content-type": "application/json" },
                        data: JSON.stringify(data),
                    };

                    const response = await axios(options);

                    getSpelers();
                }
                catch (error) {
                    divResponse.innerText = "Fout bij oproepen API";
                }
            }
        }
});

// DELETE
document.querySelector("#tblSpelers").addEventListener('click', async function(e) {

    if ( e.target.className == 'delete btn btn-danger' ) {

        let id = e.target.getAttribute("data-id"); //speler id ophalen

        try {
            const options = {
                url: "http://localhost:8081/speler/" + id,
                method: 'DELETE',
            };

            const response = await axios(options);

            getSpelers();
        } catch (error) {
            divResponse.innerText = "Fout bij oproepen API";
        }
    }
});

// BUILD TABLE
function BuildTableSpelers( data )
{
    var newrows = "<tr><th colspan='3'><h1>PLAYERS</h1></th></tr>";

    for (var speler in data )
    {
        newrows += '<tr><td class="naamcel" data-id=' + speler + '>' + data[speler] + '</td>';
        newrows += '<td><button class="edit btn btn-primary" data-id=' + speler + '>Edit</button></td>';
        newrows += '<td><button class="delete btn btn-danger" data-id=' + speler + '>Delete</button></td>';
        newrows += '</tr>';
    }

    $('#tbody_spelers').html(newrows);
}


