

//var app = require('../../app');
// fs.readFile('databases/systemConfigureData.json', err, data => {
//     if (err) throw err;
//     console.log(data);



// });
function getSystemConfigurationData() {
    console.log('여기서 서버에 데이타를 요청합니다.');
    const systemData = {
        "id": "mvcjhkim",
        "passwd": "qoffl"
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
        .then((json) => { console.log(json) })
    // .then((response) => {
    //     console.log(response.json());
    // }).then((data) => {
    //     console.log(data);

    // }).catch((e) => {
    //     console.log(e);
    // });
}
