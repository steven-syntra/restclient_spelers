<?php
require_once ("lib/HTMLPage.php");

$page = new HTMLPage();
$page->AddBootstrap();

// axios insluiten
$page->AddJava('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', $head=true);
$page->AddJava('fetch_with_axios.js');

$page->Add('<div class="container">');
$page->Add('<br>');

//overzichtstabel met spelers
$page->Add('<table id="tblSpelers" class="table table-bordered">');
$page->Add('<tbody id="tbody_spelers">');
$page->Add('</tbody>');
$page->Add('</table>');

//invoer nieuwe naam + knop
$page->Add('<input type="text" id="naam" class="input">');
$page->Add('&nbsp;');
$page->Add('<button id="add" class="btn btn-danger">Nieuwe speler toevoegen</button>');

//eventuele responses
$page->Add('<div id="divResponse"></div>');

$page->Add('</div>'); //end container

$page->Generate();
print $page->output;
?>





