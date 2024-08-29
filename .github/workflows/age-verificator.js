// Dynamically load the CSS
var css = document.createElement('link');
css.href = "https://raw.githubusercontent.com/yourusername/repositoryname/main/style.css";
css.rel = "stylesheet";
document.head.appendChild(css);

// Create the HTML structure for the age verification popup
var ageVerificationHTML = `
<div id="age-verification">
  <div class="age-verification-main">
    <span class="age-title">ARE YOU WILLING AND ABLE TO BE AGE VERIFIED UPON DELIVERY?</span>
    <br>
    <img srcset=""></img>
    <span class="age-main-text">By clicking "Yes, I am", I certify that I am over the age of <strong>21</strong> and will comply with the above statement.</span>
    <button class="age-button age-yes" onclick="ageVerificationConfirm()">Yes, I am</button>
    <button class="age-button age-no" onclick="ageVerificationFailed()">Exit</button>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', ageVerificationHTML);

// Functions from your original feature.js file
function ageSetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ageGetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function ageVerificationHide() {
  var ageVerificationModel = document.getElementById("age-verification");
  ageVerificationModel.style.display = "none";
}
function ageVerificationShow() {
  var ageVerificationModel = document.getElementById("age-verification");
  ageVerificationModel.style.display = "block";
}

function ageVerificationLoad() {
  try {
    var agePass = ageGetCookie("age-verification-verified-43212342");
    if (agePass != "") {
      ageVerificationHide();
      return;
    } else {
      ageVerificationShow();
    }
  } catch (err) {
    ageVerificationShow();
  }
}

function ageVerificationConfirm() {
  ageSetCookie("age-verification-verified-43212342", "verified", 0);
  ageVerificationHide();
}

function ageVerificationFailed() {
  window.location.reload();
}

// Run the verification after DOM has been loaded
document.addEventListener("DOMContentLoaded", function (event) {
  ageVerificationLoad();
});
