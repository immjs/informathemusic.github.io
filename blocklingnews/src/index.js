window.onload=()=>{
var content = document.getElementById("content");
var colors = ["#F08080", "#FFC0CB", "#adff2f", "#ADD8E6", "#F0E68C"];
//	
var uColors = ["#CD5C5C", "#ff8da1", "#32CD32", "#adcae6", "#f0d58c"];
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
/*function levelNRandomness(n, min, max, arr, genN) {
  if (!Array.isArray(arr)) {
    arr = [];
    for (var i = 0; i < n; i++) {
      arr.push(getRandomInt(min, max));
    }
  }
  if (isNaN(genN)) {
    genN = n;
    n = 0;
  }
  console.log(n,genN)
  for (i = 0; i < n; i++) {
    arr.push(getRandomInt(min, max));
  }
  return n === genN ? arr : levelNRandomness(n++, min, max, arr, genN);
}
console.log(levelNRandomness(6,0,10));*/

var waitForLoad = id => {
  return new Promise((resolve, reject) => {
    var tXhr = new XMLHttpRequest();
    tXhr.onerror = () => {
      document.body.innerHTML +=
        '<h3 id="errorLoading">Could not reach youtube </h3>';
      reject();
    };
    tXhr.onload = async function() {
      resolve(this.response);
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
var xhr = new XMLHttpRequest();
var dom = "https://api.npoint.io/c9cd93525cf4fdc39073";
xhr.open("GET", dom, true);
xhr.onerror = () => {
  return (document.body.innerHTML +=
    '<h3 id="errorLoading">Could not reach ' + dom + "</h3>");
};
xhr.onload = async function() {
  if (this.status !== 200) {
    return (document.body.innerHTML = "<h1>Could not reach" + dom + "</h1>");
  }
  var data = JSON.parse(this.response);
  let k = data.length;
  for (var i = k; i > 0; i--) {
    data[i - 1].id = JSON.parse(await waitForLoad(data[i - 1].id));
    data[i - 1].id = data[i - 1].id.items[0].snippet.title;
    console.log(data[i - 1].id, i - 1);
  }
  for (i = k; i > 0; i--) {
    var r=getRandomInt(0, colors.length - 1)
    var p = document.createElement("div");
    content.appendChild(p);
    p.outerHTML =
      
        '<article class="article">'+
            '<h3 class="article__title">'+data.id+'</h3>'+
            '<p class="article__content">'+data.summary+'</p>'+
        '</article>'
  }
  //https://jsonstorage.net/api/items/6618ee1d-f14c-4c17-8691-ff17652e7668
  //'https://www.random.org/integers/?num='5'&min=0&max='100'&col='8'&base=10&format=plain&rnd=new'
};

xhr.send(null);
}
