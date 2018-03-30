var win;
var game;
var start = document.getElementById("start");


start.addEventListener("click", function() {

    win = 0;
    game = 0;
    document.getElementById("board").innerHTML = "";
    var size = document.getElementById("size").valueAsNumber;
    var dificulty = document.getElementById("dificulty").valueAsNumber;
    var numberOfRows = size;
    var numberOfCols = numberOfRows;
    var dificultLevel = dificulty;
    var arrayOfCols = [];
    var status = document.getElementById("status");
    var modal = document.getElementById("modal");
    var modalButton = document.getElementById("new");
    tabela = addElement(numberOfRows, numberOfCols)
    var twoDimensional = addSecondArray(numberOfCols);
    checkMyValue();
    checkNeighboursValue();


    function addFirstArray(rows) {
        var arrayOfRows = [];
        for (var i = 0; i < rows; i++) {
            arrayOfRows[i] = Math.round(Math.random() / (dificultLevel / 5));
        }
        return arrayOfRows;
    }

    function addSecondArray(cols) {
        for (var i = 0; i < cols; i++) {
            arrayOfCols[i] = addFirstArray(numberOfRows);
        }
        return arrayOfCols;
    }


    function addElement(numberOfCols, numberOfRows) {
        var div = document.getElementById("board");

        var newTable = document.createElement("table");
        newTable.id = "tabela";
        newTable.style.border = "1px solid black";
        div.appendChild(newTable);
        var table = document.getElementById("tabela")

        for (i = 0; i < numberOfRows; i++) {
            var newTr = document.createElement("tr");
            table.appendChild(newTr);
            for (k = 0; k < numberOfCols; k++) {
                var newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
        }
    }


    function checkMyValue() {
        for (i = 0; i < numberOfRows; i++) {
            for (k = 0; k < numberOfCols; k++) {
                var pushButton = document.createElement("button");
                var id = i.toString() + "_" + k.toString();
                pushButton.id = id;
                pushButton.type = "button";
                pushButton.value = twoDimensional[i][k];
                if (pushButton.value != 0) {
                    win = win + 1;
                }
                pushButton.innerHTML = twoDimensional[i][k];
                status.innerHTML = "Game fields to check: " + win + "";
                var board = document.getElementsByTagName("tr")[i].children[k];
                board.appendChild(pushButton);
            }
        }
    }



    function checkNeighboursValue() {


        for (i = 0; i < numberOfRows; i++) {
            for (k = 0; k < numberOfCols; k++) {
                lookAtNeighbours(i, k);
                var element = document.getElementById(i + "_" + k);
                element.innerHTML = lookAtNeighbours(i, k);
                element.addEventListener("click", function(ev) {
                    showTheTrue(ev.target.id, ev.which);
                }, {
                    once: true
                });

                element.addEventListener('contextmenu', function(ev) {
                    ev.preventDefault();
                    showTheTrue(ev.target.id, ev.which);
                    return false;
                }, false);
            }
        }
    }


    function lookAtNeighbours(rows, cols) {

        var suma = 0;
        if (rows - 1 >= 0 && cols - 1 >= 0 && twoDimensional[rows - 1][cols - 1] == 0) suma++;
        if (rows - 1 >= 0 && twoDimensional[rows - 1][cols] == 0) suma++;
        if (rows - 1 >= 0 && cols + 1 < numberOfCols && twoDimensional[rows - 1][cols + 1] == 0) suma++;
        if (cols - 1 >= 0 && twoDimensional[rows][cols - 1] == 0) suma++;
        if (cols + 1 >= 0 && twoDimensional[rows][cols + 1] == 0) suma++;
        if (rows + 1 < numberOfRows && cols - 1 >= 0 && twoDimensional[rows + 1][cols - 1] == 0) suma++;
        if (rows + 1 < numberOfRows && twoDimensional[rows + 1][cols] == 0) suma++;
        if (rows + 1 < numberOfRows && cols + 1 < numberOfCols && twoDimensional[rows + 1][cols + 1] == 0) suma++;
        return suma;
    }




    function showTheTrue(id, which) {

        ckeckedElement = document.getElementById(id);
        if (which == 1) {
            if (ckeckedElement.value == 0) {
                ckeckedElement.innerHTML = "<img id='" + id + "' src=\'img/bomb.png\'>"
                ckeckedElement.value = "boom";
                modal.style.display = "block";
                modalButton.addEventListener("click", function() {
                    modal.style.display = "none";
                    location.reload();
                });

            } else {
                ckeckedElement.innerHTML = "<img id='" + id + "' src=\'img/smile.png\'>"
                ckeckedElement.value = "clicked";
                game = game + 1;
                status.innerHTML = "Game fields to check: " + (win - game) + "";
                console.log(game);
                if (win == game) {
                    modal.style.display = "block";
                    document.getElementById("info").innerHTML = "Congratulations! You Win!";
                    modalButton.addEventListener("click", function() {
                        modal.style.display = "none";
                        location.reload();
                    });
                }
            }
        }
        if (which == 3 && ckeckedElement.value != "clicked") {
            ckeckedElement.innerHTML = "<img id='" + id + "' src=\'img/flag.png\'>"
        }
    }

});