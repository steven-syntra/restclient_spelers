$( function() {

    var mainURL = "http://localhost:8081/";

    //GET LIST OF PLAYERS
    $.ajax({
        url: mainURL + "spelers",       //welk script moet er antwoorden?
        type: "GET",
        dataType: "json",                            //wat verwachten we terug?
        success: function( data  ) {                 //wat doen we bij succes?
            BuildTableSpelers( data );
        },
        error: function( jqXhr, textStatus, errorThrown) {       //wat doen we bij problemen?
            $('#divResponse').html("Er is iets fout gegaan " + textStatus);
        }
    }); //einde ajax call

    //ADD A NEW PLAYER
    $('body').on('click', '#add', function(e) {   //bij de klik op de knop add...

        e.preventDefault(); //geen andere acties laten uitvoeren dan die in deze event handler

        var naam = $('#naam').val();                        //haal de nieuwe naam uit het invoervak

        $.ajax({
            url: mainURL + "spelers",       //welk script moet er antwoorden?
            type: "POST",
            data: { 'naam' : naam },                                //te verzenden data: { 'name1': 'value1', 'name2': 'value2', enz. }
            dataType: "json",                                           //wat verwachten we terug?
            success: function( data  ) {                           //wat doen we bij succes?
                BuildTableSpelers( data );
                $('#naam').val("");
            },
            error: function( jqXhr, textStatus, errorThrown) {       //wat doen we bij problemen?
                $('#divResponse').html("Er is iets fout gegaan " + textStatus);
            }
        }); //einde ajax call

    }); //einde ADD A NEW PLAYER

    //EDIT A PLAYER
    $('body').on('click', 'button.edit', function(e) {   //bij de klik op de knop edit...

        e.preventDefault(); //geen andere acties laten uitvoeren dan die in deze event handler

        var id = $(this).attr("data-id"); //speler id ophalen
        var naamcel = $("td.naamcel[data-id=" + id + "]");     //referentie naar de cell met de te editeren naam
        var caption = $(this).html();

        if ( caption == "Edit" )
        {
            var naam = naamcel.html();     //spelersnaam
            naamcel.html("<input type=text id=editInput value='" + naam + "'>"); //invoervak voorzien om te editeren
            $(this).html('Store');
        } //einde Edit

        if ( caption == "Store" )
        {
            var naam = $("#editInput").val();     //spelersnaam

            $.ajax({
                url: mainURL + "speler/" + id,       //welk script moet er antwoorden?
                type: "PUT",
                data: JSON.stringify({ 'naam' : naam }),                               //te verzenden data: { 'name1': 'value1', 'name2': 'value2', enz. }
                dataType: "json",                                           //wat verwachten we terug?
                success: function( data  ) {                           //wat doen we bij succes?
                    BuildTableSpelers( data );
                },
                error: function( jqXhr, textStatus, errorThrown) {       //wat doen we bij problemen?
                    $('#divResponse').html("Er is iets fout gegaan " + textStatus);
                }
            }); //einde ajax call
        } //einde Store

    }); //einde EDIT A PLAYER

    //DELETE A PLAYER
    $('body').on('click', 'button.delete', function(e) {   //bij de klik op de knop Delete...

        e.preventDefault(); //geen andere acties laten uitvoeren dan die in deze event handler

        var id = $(this).attr("data-id");                        //haal de nieuwe naam uit het invoervak

        $.ajax({
            url: mainURL + "speler/" + id,       //welk script moet er antwoorden?
            type: "DELETE",
            dataType: "json",                                           //wat verwachten we terug?
            success: function( data  ) {                           //wat doen we bij succes?
                BuildTableSpelers( data );
            },
            error: function( jqXhr, textStatus, errorThrown) {       //wat doen we bij problemen?
                $('#divResponse').html("Er is iets fout gegaan " + textStatus);
            }
        }); //einde ajax call

    }); //einde DELETE A PLAYER

}); //einde function

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