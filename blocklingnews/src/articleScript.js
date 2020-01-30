function getParams(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}

if (Number.isNaN(getParams("resp")))
  location.replace("http://imm.hopto.org/bnews");
if (getParams("resp")==="site-info")
  location.replace("http://imm.hopto.org/bnews");
var waitForLoad = n => {
  return new Promise((resolve, reject) => {
    var tXhr = new XMLHttpRequest();
    tXhr.onerror = () => {
      document.body.innerHTML +=
        '<h3 id="errorLoading">Could not reach npoint.io </h3>';
      reject();
    };
    tXhr.onloadend = async function() {
      console.log(JSON.parse(this.response));
      resolve(JSON.parse(this.response)[n]);
    };
    tXhr.open("GET", "https://api.npoint.io/c9cd93525cf4fdc39073", true);
    tXhr.send(null);
  });
};
var waitForLoadYt = id => {
  return new Promise((resolve, reject) => {
    var tXhr = new XMLHttpRequest();
    tXhr.onerror = () => {
      document.body.innerHTML +=
        '<h3 id="errorLoading">Could not reach youtube </h3>';
      reject();
    };
    tXhr.onloadend = async function() {
      resolve(JSON.parse(this.response).items[0].snippet.title);
    };
    tXhr.open(
      "GET",
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
        id +
        "&key=AIzaSyCLCw6F8TbQUkRY15uFaZCQvsfrn4mvMnI",
      true
    );
    tXhr.send(null);
  });
};
window.onload = async () => {
  let resp = await waitForLoad(getParams("resp"));
  console.log(resp);
  console.log(await waitForLoadYt(resp.id));
  document.title = await waitForLoadYt(resp.id);
  //Remarkable est defini plus tot

  document.getElementById("content").innerHTML = new Remarkable()
    .render(resp.entire)
    .split("\n")
    .join("<br>");
  console.log(
    new Remarkable()
      .render(resp.entire)
      .split("\n")
      .join("<br>")
  );
};
