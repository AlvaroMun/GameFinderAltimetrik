document.addEventListener("DOMContentLoaded", function () {
  let inputUser = document.querySelector("#userInput");
  let inputPassword = document.querySelector("#passwordInput");
  let loginBtn = document.querySelector("#loginBtn");
  let errMail = document.querySelector("#errorMail");
  let usrIcon = document.querySelector("#userIcon");
  let usrSvg = document.querySelector("#userSvg");
  let usrFieldContainer = document.querySelector("#userFieldContainer");
  let errPass = document.querySelector("#errorPass");
  let passIcon = document.querySelector("#passIcon");
  let showPassIcon = document.querySelector("#showPassword");
  let passSvg = document.querySelector("#passSvg");
  let passFieldContainer = document.querySelector("#passFieldContainer");
  let togglePass = document.querySelector("#showPassword");
  let snackbarErrorColor = "rgba(237, 116, 116, 1)";
  let snackbarAlertColor = "rgba(237, 174, 116, 1)";
  let snackbarSuccessColor = "rgba(136, 218, 68, 1)";
  let snackbar = document.querySelector("#snackbar");

  loginBtn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    console.log(inputUser.value);
    console.log(inputPassword.value);

    validation();
  });

  inputUser.addEventListener("focus", inputUserFocus);
  inputUser.addEventListener("blur", inputUserBlur);
  inputPassword.addEventListener("focus", inputPassFocus);
  inputPassword.addEventListener("blur", inputPassBlur);
  togglePass.addEventListener("click", togglePassword);

  function validation() {
    if (inputUser.value.length === 0 && inputPassword.value.length === 0) {
      inputUserError();
      inputPassError();

      callSnackbar("Please, complete de following fields", snackbarAlertColor);
      errPass.innerHTML = "Please, complete the following fields";
    } else if (inputUser.value.length === 0) {
      inputUserError();
      errPass.innerHTML = "Please, complete the following fields";
      callSnackbar("Please, complete de following fields", snackbarAlertColor);
    } else if (inputPassword.value.length === 0) {
      inputPassError();
      errPass.innerHTML = "Please, complete the following fields";
      callSnackbar("Please, complete de following fields", snackbarAlertColor);
    } else {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          inputUser.value
        )
      ) {
        login(inputUser.value, inputPassword.value);

        errMail.innerHTML = "";
        inputUserBlur();
        errPass.innerHTML = "";
        inputUserBlur();
      } else {
        errMail.innerHTML = "Enter a valid email";
        callSnackbar("Please, enter a valid email", snackbarAlertColor);
        inputUserError();
      }
    }
  }

  function inputUserBlur() {
    if (usrFieldContainer.classList.contains("inputError")) {
      usrFieldContainer.classList.remove("inputError");
    }
    if (usrFieldContainer.classList.contains("inputFocus")) {
      usrFieldContainer.classList.remove("inputFocus");
    }

    if (usrSvg.classList.contains("fillError")) {
      usrSvg.classList.remove("fillError");
    }

    if (usrSvg.classList.contains("fillFocus")) {
      usrSvg.classList.remove("fillFocus");
    }

    if (usrIcon.classList.contains("iconContainerError")) {
      usrIcon.classList.remove("iconContainerError");
    }

    if (usrIcon.classList.contains("iconContainerFocus")) {
      usrIcon.classList.remove("iconContainerFocus");
    }
  }

  function inputUserFocus() {
    errMail.innerHTML = "";

    usrFieldContainer.classList.contains("inputError")
      ? usrFieldContainer.classList.replace("inputError", "inputFocus")
      : usrFieldContainer.classList.add("inputFocus");

    usrSvg.classList.contains("fillError")
      ? usrSvg.classList.replace("fillError", "fillFocus")
      : usrSvg.classList.add("fillFocus");

    usrIcon.classList.contains("iconContainerError")
      ? usrIcon.classList.replace("iconContainerError", "iconContainerFocus")
      : usrIcon.classList.add("iconContainerFocus");
  }

  function inputUserError() {
    usrFieldContainer.classList.add("inputError");
    usrSvg.classList.add("fillError");
    usrIcon.classList.add("iconContainerError");
  }

  function inputPassFocus() {
    passFieldContainer.classList.replace("inputError", "inputFocus");
    passSvg.classList.replace("fillError", "fillFocus");
    passIcon.classList.replace("iconContainerError", "iconContainerFocus");
    showPassIcon.classList.replace("inputError", "inputFocus");

    passFieldContainer.classList.contains("inputError")
      ? passFieldContainer.classList.replace("inputError", "inputFocus")
      : passFieldContainer.classList.add("inputFocus");

    passSvg.classList.contains("fillError")
      ? passSvg.classList.replace("fillError", "fillFocus")
      : passSvg.classList.add("fillFocus");

    passIcon.classList.contains("iconContainerError")
      ? passIcon.classList.replace("iconContainerError", "iconContainerFocus")
      : passIcon.classList.add("iconContainerFocus");

    showPassIcon.classList.contains("inputError")
      ? showPassIcon.classList.replace("inputError", "inputFocus")
      : showPassIcon.classList.add("inputFocus");
    errPass.innerHTML = "";
  }

  function inputPassBlur() {
    if (passFieldContainer.classList.contains("inputError")) {
      passFieldContainer.classList.remove("inputError");
    }
    if (passFieldContainer.classList.contains("inputFocus")) {
      passFieldContainer.classList.remove("inputFocus");
    }

    if (passSvg.classList.contains("fillError")) {
      passSvg.classList.remove("fillError");
    }

    if (passSvg.classList.contains("fillFocus")) {
      passSvg.classList.remove("fillFocus");
    }

    if (passIcon.classList.contains("iconContainerError")) {
      passIcon.classList.remove("iconContainerError");
    }

    if (passIcon.classList.contains("iconContainerFocus")) {
      passIcon.classList.remove("iconContainerFocus");
    }
    if (showPassIcon.classList.contains("inputError")) {
      showPassIcon.classList.remove("inputError");
    }
    if (showPassIcon.classList.contains("inputFocus")) {
      showPassIcon.classList.remove("inputFocus");
    }
  }

  function inputPassError() {
    passFieldContainer.classList.add("inputError");
    passSvg.classList.add("fillError");
    passIcon.classList.add("iconContainerError");
    showPassIcon.classList.add("inputError");
  }

  function togglePassword() {
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  }

  async function login(user, pass) {
    let response;
    try {
      response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          email: user,
          password: pass,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("response ok?", response.ok);
      if (response.ok) {
        console.log("ACA ESTAAA");
        callSnackbar("Successful login", snackbarSuccessColor);
        window.location.replace("../main/main.html");
      } else {
        console.log("ERRRORRR ");
        errMail.innerHTML = "Enter a valid email";
        errPass.innerHTML = "Enter a valid password";
        inputUserError();
        inputPassError();
        callSnackbar(
          "Remeber to input a valid user/password",
          snackbarAlertColor
        );
      }

      console.log("response iside try", response);
    } catch (error) {
      callSnackbar(
        "Something went wrong, please check your internet connection",
        snackbarErrorColor
      );
    }
  }

  function callSnackbar(msg, color) {
    let innerSnackbar = `
      <div>
        <h3>${msg}</h3>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.354 4.646C5.26011 4.55211 5.13278 4.49937 5 4.49937C4.86722 4.49937 4.73989 4.55211 4.646 4.646C4.55211 4.73989 4.49937 4.86722 4.49937 5C4.49937 5.13278 4.55211 5.26011 4.646 5.354L7.293 8L4.646 10.646C4.59951 10.6925 4.56264 10.7477 4.53748 10.8084C4.51232 10.8692 4.49937 10.9343 4.49937 11C4.49937 11.0657 4.51232 11.1308 4.53748 11.1916C4.56264 11.2523 4.59951 11.3075 4.646 11.354C4.73989 11.4479 4.86722 11.5006 5 11.5006C5.06574 11.5006 5.13084 11.4877 5.19158 11.4625C5.25232 11.4374 5.30751 11.4005 5.354 11.354L8 8.707L10.646 11.354C10.6925 11.4005 10.7477 11.4374 10.8084 11.4625C10.8692 11.4877 10.9343 11.5006 11 11.5006C11.0657 11.5006 11.1308 11.4877 11.1916 11.4625C11.2523 11.4374 11.3075 11.4005 11.354 11.354C11.4005 11.3075 11.4374 11.2523 11.4625 11.1916C11.4877 11.1308 11.5006 11.0657 11.5006 11C11.5006 10.9343 11.4877 10.8692 11.4625 10.8084C11.4374 10.7477 11.4005 10.6925 11.354 10.646L8.707 8L11.354 5.354C11.4005 5.30751 11.4374 5.25232 11.4625 5.19158C11.4877 5.13084 11.5006 5.06574 11.5006 5C11.5006 4.93426 11.4877 4.86916 11.4625 4.80842C11.4374 4.74768 11.4005 4.69249 11.354 4.646C11.3075 4.59951 11.2523 4.56264 11.1916 4.53748C11.1308 4.51232 11.0657 4.49937 11 4.49937C10.9343 4.49937 10.8692 4.51232 10.8084 4.53748C10.7477 4.56264 10.6925 4.59951 10.646 4.646L8 7.293L5.354 4.646Z"
          fill="#F0D3D3"
        />
      </svg>`;
    snackbar.style.background = color;
    snackbar.innerHTML = innerSnackbar;
    snackbar.classList.remove("snackbarHide");
    snackbar.classList.add("snackbarShow");
    setTimeout(() => {
      snackbar.classList.remove("snackbarShow");
      snackbar.classList.add("snackbarHide");
    }, 3000);
  }
});
