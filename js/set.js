var win = 0;
var game = 0;
var numberOfRows  = prompt("Wpisz rozmiar obszaru gry");
var numberOfCols = numberOfRows;
var dificultLevel = prompt("wpisz poziom trudności w skali od 1 do 5");
var arrayOfCols = [];
tabela = addElement(numberOfRows, numberOfCols)
var dwuWymiarowa = addSecondArray(numberOfCols);
checkNeighboursValue();

function createButtons(){
    for (i = 0; i < numberOfRows; i++){
        for (k = 0; k < numberOfCols; k++){

            var pushButton = document.createElement("button");
            var id = i.toString()+"_"+k.toString();
            pushButton.id = id;
            pushButton.type = "button";
            pushButton.class = "test";
            pushButton.value = dwuWymiarowa[i][k];
            pushButton.innerHTML = dwuWymiarowa[i][k];

            
            var board = document.getElementsByTagName("tr")[i].children[k];
            board.innerHTML = "";
            board.appendChild(pushButton); 
        }
    }
}




function addFirstArray(liczbaWierszy){
    for (var i = 0; i < liczbaWierszy; i++) {
    var arrayOfRows = []
    arrayOfRows[i] =  Math.round(Math.random() / (dificultLevel/5));
    if(arrayOfRows[i] != 0) win = win + 1;    
  }
  return arrayOfRows;
}

function addSecondArray(liczbaKolumn){
  for (var i = 0; i < liczbaKolumn; i++) {
    arrayOfCols[i] = addFirstArray(numberOfRows);
  }
  return arrayOfCols;
}


function addElement(numberOfCols, numberOfRows){
    var div = document.getElementById("plansza");
    
    var newTable = document.createElement("table");
    newTable.id = "tabela";
    newTable.style.border = "1px solid black";
    div.appendChild(newTable);
    var table = document.getElementById("tabela")
    
    for (i = 0; i < numberOfRows; i++){
        var newTr= document.createElement("tr");
        table.appendChild(newTr);
        for (k = 0; k < numberOfCols; k++){
            var newTd= document.createElement("td");
            newTr.appendChild(newTd);
        }
    }   
}





function checkNeighboursValue(){
    
    
    for (i = 0; i < numberOfRows; i++){
        for (k = 0; k < numberOfCols; k++){
            lookAtNeighbours(i, k);
            var element = document.getElementById(i + "_" + k);
            element.innerHTML = lookAtNeighbours(i, k);
            element.addEventListener("click", function(ev){
                showTheTrue(ev.target.id, ev.which);
            }, {once: true});
            
            element.addEventListener('contextmenu', function(ev) {
                ev.preventDefault();
                showTheTrue(ev.target.id, ev.which);
                return false;
            }, false);
        

        }
    }
}


function lookAtNeighbours(rows, cols){
    
    var suma = 0;
    if (rows - 1 >= 0 && cols - 1 >= 0 && dwuWymiarowa[rows-1][cols-1] == 0) suma++;
    if(rows - 1 >= 0 && dwuWymiarowa[rows-1][cols] == 0) suma++;
    if(rows - 1 >= 0 && cols + 1 < numberOfCols && dwuWymiarowa[rows - 1][cols + 1] == 0) suma ++;
    if(cols - 1 >= 0 && dwuWymiarowa[rows][cols-1] == 0) suma++;
    if(cols + 1 >= 0 && dwuWymiarowa[rows][cols+1] == 0) suma++;
    if(rows + 1 < numberOfRows && cols - 1 >= 0 && dwuWymiarowa[rows+1][cols-1] == 0) suma++;
    if(rows + 1 < numberOfRows && dwuWymiarowa[rows+1][cols] == 0) suma++;
    if(rows + 1 < numberOfRows && cols + 1 < numberOfCols && dwuWymiarowa[rows+1][cols+1] == 0) suma++;
    return suma;
}


function showTheTrue(id, which){
            
        sprawdzanyElement = document.getElementById(id);
    if (which == 1){
        if (sprawdzanyElement.value == 0){ 
            sprawdzanyElement.innerHTML = "<img id='"+id+"' src=\'img/bomb.png\'>"
            sprawdzanyElement.value = "clicked";

        }
        else {
            sprawdzanyElement.innerHTML = "<img id='"+id+"' src=\'img/smile.png\'>"
            sprawdzanyElement.value = "clicked";
            game = game + 1;
            console.log(game);
        }
    }
    if (which == 3 && sprawdzanyElement.value != "clicked"){
        sprawdzanyElement.innerHTML = "<img id='"+id+"' src=\'img/flag.png\'>"
    }
}