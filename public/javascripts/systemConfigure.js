

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

$(document).ready(() => {
    console.log("two ready");
    getSystemConfigurationData();
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

        console.log("배열에 담긴 값 : " + tdArr);

        // td.eq(index)를 통해 값을 가져올 수도 있다.
        var no = td.eq(0).text();
        var userid = td.eq(1).text();
        var name = td.eq(2).text();
        var email = td.eq(3).text();


        str += " * 클릭된 Row의 td값 = No. : <font color='red'>" + no + "</font>" +
            ", 아이디 : <font color='red'>" + userid + "</font>" +
            ", 이름 : <font color='red'>" + name + "</font>" +
            ", 이메일 : <font color='red'>" + email + "</font>";

        $("#ex1_Result1").html(" * 클릭한 Row의 모든 데이터 = " + tr.text());
        $("#ex1_Result2").html(str);
    });
});

function getSystemConfigurationData() {
    var systemConfigureData;
    console.log('여기서 서버에 데이타를 요청합니다.');
    const systemData = {
        "id": ["mvcjhkim", "inhee"],
        "passwd": ["qoffl", "good"]
    }
    //console.log(JSON.stringify(systemData));
    fetch("/systemConfigure", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(systemData)
    })
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            systemConfigureData = json;
            var table = document.getElementById('tbody');

            var row = '';
            for (idx in systemConfigureData) {
                row +=
                    `
                <tr class="rows" id="rows-data"> 
                <td class="text-left">${systemConfigureData[idx]['no']}</td>
                <td class="text-left">${systemConfigureData[idx]['systemName']}</td>
                <td class="text-left">${systemConfigureData[idx]['BatteryKind']}</td>
                <td class="text-left">${systemConfigureData[idx]['InstallNumber']}</td>
                <td class="text-left">${systemConfigureData[idx]['Installdate']}</td>
                <td class="text-left">${systemConfigureData[idx]['InstallPositon']}</td>
                </tr>
                `
            };
            table.innerHTML += row;
            console.log(table);
        })
}
