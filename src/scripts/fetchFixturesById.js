const years = [2020];
const ids = "720922-720939-720800-605426-720750-720805-720777-721026";

fetch("https://v3.football.api-sports.io/fixtures?ids=" + ids, {
  method: "GET",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": import.meta.env.API_KEY,
  },
})
  .then(async (response) => {
    data = await response.json();
    json = await data.response;
    download(JSON.stringify(json), "additional-fixtures.json", "text/plain");
  })
  .catch((err) => {
    console.log(err);
  });

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
