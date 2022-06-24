
//var mongoose = require('mongoose');
//var app = require('../../app');
// fs.readFile('databases/systemConfigureData.json', err, data => {
//     if (err) throw err;
//     console.log(data);
// });
//function systemConfigureOnClick() {
// 테이블의 Row 클릭시 값 가져오기
// function getSystemConfigureTableRow() {
//     console.log("here");
//     console.log($(this.td));
//     var str = ""
//     var tdArr = new Array();	// 배열 선언

//     // 현재 클릭된 Row(<tr>)
//     var tr = $(this);
//     console.log(tr.text());
//     var td = tr.children();
//     console.log(td);

// }

const bmsInfoTable = `
        <table class="table-fill" id="table-data"> 
          <thead id="thead">
            <tr class="rows"> 
              <th class="text-left" width=10px>NO </th>
              <th class="text-left" width=100px style="display:none">테이블 </th>
              <th class="text-left" width=100px>시스템명</th>
              <th class="text-left" width=100px>종류</th>
              <th class="text-left" width=40px>수량  </th>
              <th class="text-left" width=100px>일시  </th>
              <th class="text-left">위치 </th>
            </tr>
          </thead>
          <tbody class="table-hover" id="tbody"></tbody>
        </table>
`
$(document).ready(() => {
    console.log("two ready");
    //getSystemConfigurationData('bms_system', '{ "table_id": "bms_a" }');
    getSystemConfigurationData('bms_system', '{}');
});
$(document).ready(() => {
    console.log("Document ready here");
    //$(document).getElementsByClassName(".table-fill").deleteRow(0);

    $(".table-fill").delegate("tr.rows", "click", function () {
        var str = ""
        var tdArr = new Array();	// 배열 선언
        //document.getElementsByName("table-data").deleteRow(0);


        // 현재 클릭된 Row(<tr>)
        var tr = $(this);
        var td = tr.children();
        console.log(tr);
        // tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
        console.log("클릭한 Row의 모든 데이터 : " + tr.text());

        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        td.each(function (i) {
            tdArr.push(td.eq(i).text());
        });

        // console.log("배열에 담긴 값 : " + tdArr);

        // td.eq(index)를 통해 값을 가져올 수도 있다.
        var no = td.eq(0).text();
        var tableName = td.eq(1).text();
        var name = td.eq(2).text();
        var email = td.eq(3).text();


        //getSystemConfigurationData('bms_system', '{ "table_id": "bms_a" }');
        //getSystemCelldata(tableName, '{"ecode":0}');
        getSystemCelldata(tableName, '{}');

        str += " * 클릭된 Row의 td값 = No. : <font color='red'>" + no + "</font>" +
            ", 아이디 : <font color='red'>" + tableName + "</font>" +
            ", 이름 : <font color='red'>" + name + "</font>" +
            ", 이메일 : <font color='red'>" + email + "</font>";

        $("#ex1_Result1").html(" * 클릭한 Row의 모든 데이터 = " + tr.text());
        $("#ex1_Result2").html(str);
    });
});



const bmsCellThead = `
            <tr class="rows"> 
              <th class="text-left" width=10px>NO </th>
              <th class="text-left" width=100px style="display:none">테이블 </th>
              <th class="text-left" width=100px>시스템명</th>
              <th class="text-left" width=100px>종류</th>
              <th class="text-left" width=40px>수량  </th>
              <th class="text-left" width=100px>일시  </th>
              <th class="text-left">위치 </th>
            </tr>
`

function addRowHeading(tableID, jsonData, startIdx, rowCount) {
    let tableThead = document.getElementById('tCellHead');
    tableThead.innerHTML = bmsCellThead;
    tableThead.innerHTML = `<tr class="rows"> `;
    let tHeadString = `<th class="text-left"></th>`;
    while (rowCount--) {
        tHeadString += `<th class="text-left">${jsonData[0].cellValue[startIdx]}</th>`;
        startIdx++;
    }
    tableThead.innerHTML += tHeadString;
    tableThead.innerHTML += `</tr>`;

    // let tableRef = document.getElementById(tableID);
    // let newRow = tableRef.insertRow(-1);
    // let newCell = newRow.insertCell(-1);
    // newCell.innerHTML = startIdx;
    // while (rowCount--) {
    //     newCell = newRow.insertCell(-1);
    //     newCell.innerHTML = `${jsonData[0].cellValue[startIdx++][0]}`;
    // }
}
function addRow(tableID, jsonData, startIdx, rowCount) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(-1);
    newCell.innerHTML = startIdx;
    while (rowCount--) {
        if (startIdx >= jsonData[0].cellValue.length) break;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = `${jsonData[0].cellValue[startIdx][0]}<br>${jsonData[0].cellValue[startIdx][1]}`;
        startIdx++;
    }

    // Append a text node to the cell
    //             row += ` <td class="text-left">${json[0].cellValue[j][0]}<br>
    //                         ${json[0].cellValue[j][1]}</td> `;
    //let newText = document.createTextNode(`${jsonData[0].cellValue[j][0]}(${jsonData[0].cellValue[j][1]})`);
    //newCell.appendChild(newText);
}
function getSystemCelldata(tableName, query) {
    var systemConfigureData;
    var jquery = new Object();
    console.log('여기서 서버에 데이타를 요청합니다.');
    const systemData = {
        "TableName": [tableName, query],
        "passwd": ["mvcjhkim", "qoffl"]
    }
    jquery = JSON.parse(JSON.stringify(systemData));
    console.log(jquery);

    //console.log(JSON.stringify(systemData));
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(systemData)
    })
        .then(response => response.json())
        .then((json) => {
            //console.log(json[0].cellValue[0]);
            let tableA = document.getElementById('table-data');
            tableA.hidden = true;
            //console.log(tableA.rows.length);
            // for (let i = tableA.rows.length; i > 0; i--) {
            //     tableA.deleteRow(i - 1);
            // }
            //let tableThead = document.getElementById('tCellHead');
            //tableThead.innerHTML = bmsCellThead;
            //console.log(tableA);
            //bmsInfoTable 
            //let table = document.getElementById('tCellBody');
            //if (table != null) table.remove();
            //row += bmsInfoTable;
            //var row = '';//bmsCellTable ;
            //console.log(`${systemConfigureData[0]}`);
            // console.log(json[0].cellValue[i][0]);
            // console.log(json[0].cellValue[i][1]);
            //let cellNumber = 20;
            //table.innerHTML += `<tr class="rows" id="rows-data"></tr>`;
            //let table_tr = document.getElementById('rows-data');
            //console.log(`tr ${table_tr}`);
            //console.log(json[0].cellValue.length);
            let cellNumber = json[0].cellValue.length;
            let trHeading = `[ {"cellValue": ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]} ]`;
            let displayCount = 16;

            addRowHeading('table-cellData', JSON.parse(trHeading), 0, displayCount);
            for (j = 0; j < cellNumber; j += displayCount) {
                addRow('table-cellData', json, j, displayCount);
            }
            let labelStr = document.getElementById('status_label');
            labelStr.innerHTML = `Data Received time ${json[0].logDate}`;
            //console.log(json[0].logDate);
            //let newRow;
            // for (j = 0; j < cellNumber; j++) {
            //     if (j % 8 == 0) newRow = table.insertRow(-1);
            //     let newCell = newRow.insertCell(-1)
            // }
            // if (j % 8 == 0) {
            //     row += ` <tr class="rows" id="rows-data"> `;
            //     for (let i = 0; i < 8; i++) {
            //         if (j < cellNumber) {
            //             row += ` <td class="text-left">${json[0].cellValue[j][0]}<br>
            //                         ${json[0].cellValue[j][1]}</td> `;
            //         }
            //     };
            //     row += `</tr>`;
            // }
            // table.innerHTML += row;
            // console.log(table);
        })
}
function getSystemConfigurationData(tableName, query) {
    var systemConfigureData;
    console.log('여기서 서버에 데이타를 요청합니다.');
    const systemData = {
        "TableName": [tableName, query],
        "passwd": ["mvcjhkim", "qoffl"]
    }
    //console.log(JSON.stringify(systemData));
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(systemData)
    })
        .then(response => response.json())
        .then((json) => {
            systemConfigureData = json;

            console.log(systemConfigureData);
            var table = document.getElementById('tbody');
            var row = '';
            //console.log(`${systemConfigureData[0]}`);
            for (idx in systemConfigureData) {
                //console.log(systemConfigureData[idx]);
                //console.log(systemConfigureData[idx][0]);
                var index = idx;
                index++;
                console.log(systemConfigureData[idx].table_id);
                row +=
                    `
                <tr class="rows" id="rows-data"> 
                <td class="text-left">${index}</td>
                <td class="text-left" style="display:none" >${systemConfigureData[idx].table_id}</td>
                <td class="text-left">${systemConfigureData[idx].systemName}</td>
                <td class="text-left">${systemConfigureData[idx].bat_kind}</td>
                <td class="text-left">${systemConfigureData[idx].number}</td>
                <td class="text-left">${systemConfigureData[idx].installDate}</td>
                <td class="text-left">${systemConfigureData[idx].position}</td>
                </tr>
                `
            };
            table.innerHTML += row;
            // console.log(table);
        })
}
