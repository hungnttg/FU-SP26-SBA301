//chay trong console
fetch("http://localhost:8081/slot13/users",{
    headers: {"X-API-VERSION":"1"}
})
.then(res=>res.json())
.then(data => console.log("V1: ",data))
.catch(err =>console.error(err));
//chay trong powershell
// curl.exe -H "X-API-VERSION: 1" http://localhost:8081/slot13/users