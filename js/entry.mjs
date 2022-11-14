import { deleteLocalItem, setLocalItem, login, register, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, showInput, API, reportError, user } from "./modules/main.mjs";

//Page element grabs
const loginForm = document.querySelector("#login-form");
const ErrorContainers = document.querySelectorAll(".error-reporting");
const submitBtn = document.querySelector("#submit-btn");
const toggleText = document.querySelector("#toggle-text");
const toggleBtn = document.querySelector("#toggle-btn");
const signUpInputs = document.querySelectorAll(".signup");

const querystring = new URLSearchParams(window.location.search);
const logout = querystring.get("logout");

if (logout === "true") {
  deleteLocalItem("user");
}

/**
 * Toggles between login and signup forms.
 */
function toggleForm() {
  if (submitBtn.innerText === "Sign Up") {
    submitBtn.innerText = "Login";
    toggleText.innerText = "Not a member?";
    toggleBtn.innerText = "Sign Up";
    ErrorContainers[2].innerText = "";
    ErrorContainers[3].innerText = "";
  } else {
    submitBtn.innerText = "Sign Up";
    toggleText.innerText = "Already have an account?";
    toggleBtn.innerText = "Login";
  }
  signUpInputs.forEach((input) => {
    showInput(input, 84);
  });
}

toggleBtn.addEventListener("click", toggleForm);

/**
 * Runs validation, and submit form data, based form state.
 * @param {Event} submit form submission
 */
async function validateLoginSignUp(submit) {
  submit.preventDefault();
  // getting form data, hidden inputs are disabled so not added depending on state.
  const formData = new FormData(submit.target);
  const bodyData = Object.fromEntries(formData.entries());
  //validation
  const emailCorrect = isValidEmail(bodyData.email, ErrorContainers[1]);
  const passwordCorrect = isValidInputLength(bodyData.password, 8, ErrorContainers[3]);
  let registerSuccessful = false;
  if (submitBtn.textContent === "Sign Up") {
    //---------------- Signup -----------------
    const usersNameCorrect = isValidUsername(bodyData.name, ErrorContainers[2]);
    const passwordConfirmed = hasMatchingPasswords(bodyData.password, bodyData.passwordConfirm, 8, ErrorContainers[3]);
    if (emailCorrect && passwordCorrect && usersNameCorrect && passwordConfirmed) {
      ErrorContainers[0].innerText = "";
      try {
        //remove confirm password from body
        delete bodyData.passwordConfirm;
        const response = await register(bodyData);
        if (response.statusCode === 400) {
          ErrorContainers[0].innerText = response.message;
        } else {
          ErrorContainers[0].innerHTML = `<span class="text-success">Account Created</span>`;
          registerSuccessful = true;
        }
      } catch (error) {
        reportError(error, ErrorContainers[0]);
      }
    }
  }

  //checks if form is login or signup state
  if (submitBtn.textContent === "Login" || registerSuccessful) {
    //--------------- Login --------------------
    if (emailCorrect && passwordCorrect) {
      try {
        const response = await login(bodyData);
        const loginDetails = await response.json();
        //check response, and send user to profile or return message on error
        if (response.ok) {
          setLocalItem("user", loginDetails);
          location.href = `/profile.html`;
        } else {
          ErrorContainers[0].innerHTML = loginDetails.message;
        }
      } catch (error) {
        reportError(error, ErrorContainers[0]);
      }
    }
  }
}

loginForm.addEventListener("submit", validateLoginSignUp);
