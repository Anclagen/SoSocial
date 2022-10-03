import {initialiseAPIHandler, setLocalItem, login, register,isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords} from "./modules/main.mjs"

let API = initialiseAPIHandler();
// const logout = document.querySelector("#logout");
// logout.addEventListener("click", API.logout);

//Page element grabs
const loginForm = document.querySelector("#login-form");
const loginFormError = document.querySelector("#login-form-error");
const usersName = document.querySelector("#username");
const usersNameError = document.querySelector("#username-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");
const passwordConfirm = document.querySelector("#password-confirm");
const submitBtn = document.querySelector("#submit-btn");
const toggleText = document.querySelector("#toggle-text");
const toggleBtn = document.querySelector("#toggle-btn");
const signUpInputs = document.querySelectorAll(".signup");
console.log(loginForm.email)
/**
 * Toggles between login and signup forms.
 */
function toggleForm(){
  if(submitBtn.innerText === "Sign Up"){
    submitBtn.innerText = "Login";
    toggleText.innerText = "Not a member?"
    toggleBtn.innerText = "Sign Up"
  } else {
    submitBtn.innerText = "Sign Up"
    toggleText.innerText = "Already have an account?"
    toggleBtn.innerText = "Login"
  }
  signUpInputs.forEach(input => {
    input.classList.toggle("hidden");
  });
}

toggleBtn.addEventListener("click", toggleForm);


async function validateLoginSignUp(submit){
  submit.preventDefault();
  //validate email and password
  
  const emailCorrect = isValidEmail(email, emailError);
  const passwordCorrect = isValidInputLength(password, 8, passwordError);
   //checks if form is login or sign up
  if(submitBtn.textContent === "Login"){
      if(emailCorrect && passwordCorrect){
        try{
          const response = await login(email.value, password.value);
          const loginDetails = await response.json();
          if(response.ok){
            setLocalItem("user", loginDetails);
            location.href = `/profile.html`
          } else {
            loginFormError.innerHTML = loginDetails.message;
          }
        } catch (error){
          console.log(error.message);
        }
      }
  } else if(submitBtn.textContent === "Sign Up"){
    const usersNameCorrect = isValidUsername(usersName, usersNameError);
    const passwordConfirmed = hasMatchingPasswords(password, passwordConfirm, 8, passwordError);
      if(emailCorrect && passwordCorrect && usersNameCorrect && passwordConfirmed){
        loginFormError.innerText = "";
        try{
          const response = await register(usersName.value, email.value, password.value)
          if(response.statusCode === 400){
            loginFormError.innerText = response.message;
          } else {
            loginFormError.innerHTML = `<span class="text-success">Account Created</span>`
            loginForm.reset();
            email.value = response.email;
            toggleForm()
          }
          
        } catch (error){
          console.log(error.message);
        }
      }
  }
}

loginForm.addEventListener("submit", validateLoginSignUp)

