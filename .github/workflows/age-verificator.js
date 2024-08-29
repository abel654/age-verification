// Dynamically load the CSS
var style = document.createElement('style');
style.innerHTML = `
  #age-verification {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .age-verification-main {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 300px;
    width: 100%;
  }

  .age-title {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .age-main-text {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .age-button {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin: 5px;
  }

  .age-button.age-yes {
    background-color: #4CAF50; /* Green */
  }

  .age-button.age-no {
    background-color: #f44336; /* Red */
  }
`;
document.head.appendChild(style);

// Create the HTML structure for the age verification popup
var ageVerificationHTML = `
<div id="age-verification">
  <div class="age-verification-main">
    <span class="age-title">ARE YOU WILLING AND ABLE TO BE AGE VERIFIED UPON DELIVERY?</span>
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
  ageSetCookie("age-verification-verified-43212342", "verified", 30);
  ageVerificationHide();
}

function ageVerificationFailed() {
  window.location.href = "https://www.google.com";
}

// Run the verification after DOM has been loaded
document.addEventListener("DOMContentLoaded", function (event) {
  ageVerificationLoad();
});
