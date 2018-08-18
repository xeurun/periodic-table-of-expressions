(function() {
    document.addEventListener('DOMContentLoaded', function() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const activeElementHash = document.location.hash.replace('#', '');
                const data = JSON.parse(this.responseText);
                const column = data.grid.column;
                const row = data.grid.row;
                let periodicTable = document.getElementsByClassName('periodic')[0];

                let elementNumber = 1;
                for(let i = 1; i <= row; i++) {
                    let lineNode = document.createElement('div');
                    lineNode.className = 'periodic-row';
                    for(let j = 1; j <= column; j++) {
                        let cellNode = document.createElement('div');
                        cellNode.className = 'cell';

                        let cell = data.cells[i + ":" + j];
                        if (cell !== undefined) {
                            let weightNode = document.createElement('div');
                            weightNode.className = 'at_weight';
                            weightNode.innerText = cell.weight;
                            let elementNode = document.createElement('div');
                            elementNode.className = 'element';
                            let numNode = document.createElement('div');
                            numNode.className = 'at_num';
                            numNode.innerText = elementNumber;
                            let symbolNode = document.createElement('div');
                            symbolNode.className = 'symbol';
                            symbolNode.innerText = cell.symbol;
                            let detailsNode = document.createElement('div');
                            detailsNode.className = 'at_details';
                            detailsNode.innerText = cell.title;
                            detailsNode.appendChild(document.createElement('br'));
                            if (activeElementHash !== undefined && activeElementHash === cell.symbol) {
                                elementNode.className += ' active';
                            }
                            elementNode.appendChild(weightNode);
                            elementNode.appendChild(numNode);
                            elementNode.appendChild(symbolNode);
                            elementNode.appendChild(detailsNode);
                            cellNode.addEventListener('click', function (event, tt) {
                                document.location.hash = cell.symbol;
                                let target = event.target || event.currentTarget;

                                if (target.firstChild.className.indexOf('active') > 0) {
                                    target.firstChild.className = target.firstChild.className.replace('active', '');
                                } else {
                                    var activeElement = document.getElementsByClassName('element active')[0];
                                    if (activeElement !== undefined) {
                                        activeElement.className = activeElement.className.replace(' active', '');
                                    }
                                    target.firstChild.className = target.firstChild.className + ' ' + 'active';
                                }

                            });
                            cellNode.appendChild(elementNode);
                        }

                        lineNode.appendChild(cellNode);
                        elementNumber++;
                    }
                    periodicTable.appendChild(lineNode);
                }

                let clearNode = document.createElement('div');
                clearNode.style.clear = 'both';
                periodicTable.appendChild(clearNode);
            }
        };
        xmlhttp.open("GET", "assets/data.json", true);
        xmlhttp.send();
    });
})();
/*
                console.log(cells);
                for (let pos in data.cells) {
                    let cell = cells.pos;
                    console.log(pos);
                    let lineNode = document.createElement('div');
                    lineNode.className = 'periodic-row';
                    line.forEach(function(cell) {
                        let cellNode = document.createElement('div');
                        cellNode.className = 'cell';
                        let elementNode = document.createElement('div');
                        elementNode.className = 'element';

                        if (Object.keys(cell).length > 0) {
                            let numNode = document.createElement('div');
                            numNode.className = 'at_num';
                            // todo change 1 to iterator
                            numNode.innerText = 1;
                            let symbolNode = document.createElement('div');
                            symbolNode.className = 'symbol';
                            symbolNode.innerText = cell.symbol;
                            let detailsNode = document.createElement('div');
                            detailsNode.className = 'at_details';
                            // todo change 1 to random ?.??? digit
                            detailsNode.innerHtml = cell.name + '<br>' + 1;
                            elementNode.appendChild(numNode);
                            elementNode.appendChild(symbolNode);
                            elementNode.appendChild(detailsNode);
                            cellNode.appendChild(elementNode);
                        }

                        lineNode.appendChild(cellNode);
                    });
                    periodicTable.appendChild(lineNode);
                };
                let clearNode = document.createElement('div');
                clearNode.style.clear = 'both';
                periodicTable.appendChild(clearNode);
            */
