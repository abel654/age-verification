// Inject the age verification content into a specific container
function injectAgeVerification() {
  // CSS styles
  const styles = `
    :root {
      --modal-background-color: rgba(40, 40, 40, 0.8);
      --main-box-background-color: #1A2524;
      --text-color: #B0D4AD;
      --title-text-color: #B0D4AD;
      --yes-button-background-color: #FFFFF6;
      --no-button-background-color: transparent;
      --yes-button-text-color: #1A2524;
      --no-button-text-color: #FFFFF6;
      --credits-text-color: #b7b7b7;
      --credits-link-color: white;
      --font-family: "Poppins", sans-serif;
      --general-font-size: 13pt;
      --title-font-size: 19pt;
      --button-font-size: 16pt;
      --credits-font-size: 12px;
      --credits-letter-spacing: 4px;
      --border-radius: 5px;
      --font-weight-min: 100;
      --font-weight-mid: 400;
      --font-weight-max: 600;
    }
    #age-verification {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--modal-background-color);
      transition: 500ms;
      z-index: 90000001;
      display: none;
    }
    .age-verification-main {
      background-color: var(--main-box-background-color);
      font-family: var(--font-family);
      color: var(--text-color);
      font-size: var(--general-font-size);
      font-weight: var(--font-weight-max);
      text-align: center;
      padding: 36px 41px;
      position: relative;
      top: 10px;
      width: 500px;
      max-width: 80%;
      margin: 0 auto;
      box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.3);
      border-radius: var(--border-radius);
    }
    @media only screen and (min-height: 400px) {
      .age-verification-main {
        top: 30%;
      }
    }
    .age-title, .age-main-text {
      display: block;
      margin-bottom: 2em;
      font-weight: var(--font-weight-min);
    }
    .age-title {
      font-size: var(--title-font-size);
      font-weight: var(--font-weight-mid);
      margin-bottom: 1em;
    }
    .age-button {
      box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.3);
      font-family: var(--font-family);
      border: 1px solid #FFFFF6;
      font-size: var(--button-font-size);
      font-weight: var(--font-weight-mid);
      display: inline-block;
      width: 220px;
      padding: 10px;
      margin: 5px 10px;
      border-radius: var(--border-radius);
    }
    .age-yes {
      background-color: var(--yes-button-background-color);
      color: var(--yes-button-text-color);
    }
    .age-no {
      background-color: var(--no-button-background-color);
      color: var(--no-button-text-color);
    }
    .age-credits {
      font-family: var(--font-family);
      color: var(--credits-text-color);
      display: block;
      font-size: var(--credits-font-size);
      letter-spacing: var(--credits-letter-spacing);
      text-align: center;
      margin-top: 35px;
      font-weight: 100;
    }
    .age-credits a {
      color: var(--credits-link-color);
    }
  `;

  // Inject the CSS into the document head
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // HTML structure
  const ageVerificationHTML = `
    <div id="age-verification">
      <div class="age-verification-main">
        <span class="age-title">ARE YOU WILLING AND ABLE TO BE AGE VERIFIED UPON DELIVERY?</span>
        <img srcset="">
        <span class="age-main-text">By clicking "Yes, I am", I certify that I am over the age of <strong>21</strong> and will comply with the above statement.</span>
        <button class="age-button age-yes" onclick="ageVerificationConfirm()">Enter</button>
        <button class="age-button age-no" onclick="ageVerificationFailed()">Exit</button>
        <span class="age-credits">Always enjoy responsibly</span>
      </div>
    </div>
  `;

  // Inject the HTML structure into the specified container
  const container = document.querySelector('.age-verification-container');
  if (container) {
    container.innerHTML = ageVerificationHTML;
  }

  // JS functions for cookie management and visibility control
  var ageCookieName = "age-verification-verified-43212342";

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
      var agePass = ageGetCookie(ageCookieName);
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
    ageSetCookie(ageCookieName, "verified", 365);
    ageVerificationHide();
  }

  function ageVerificationFailed() {
    window.location.reload();
  }

  // Run the verification after DOM has been loaded
  document.addEventListener("DOMContentLoaded", function () {
    ageVerificationLoad();
  });
}

// Immediately invoke the function to inject the age verification content
injectAgeVerification();
