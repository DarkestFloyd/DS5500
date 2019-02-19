var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

var header = document.querySelector('h1');
header.onclick = function() {
  header.textContent = "Hello, World!";
}

var button = document.querySelector('button');
function setName() {
  var name = prompt("Enter your name: ");
  localStorage.setItem('name', name);
  header.textContent = "Hello, " + name + "!";
}

button.onclick = function() {
  setName();
}
