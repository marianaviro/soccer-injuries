const years = [2020, 2021, 2022];
const leagues = [39, 140];

years.forEach((year) => {
  leagues.forEach((league) => {
    fetch(
      "https://v3.football.api-sports.io/injuries?league=" +
        league +
        "&season=" +
        year,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": import.meta.env.API_KEY,
        },
      }
    )
      .then(async (response) => {
        data = await response.json();
        json = await data.response;
        download(
          JSON.stringify(json),
          "fixtures-la-liga-" + year + ".json",
          "text/plain"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
