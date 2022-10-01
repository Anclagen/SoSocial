/**
 * Checks if string is a noroff email, returns error to error container if fails
 * @param {Input Element} email 
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * @example
 * console.log(isValidEmail("example@example.com"))
 * //False
 */
export function isValidEmail(email, errorContainer) {
  const emailRegEx = /^[\w\-.]+@(stud.)?noroff.no$/g;
  const validateEmail = emailRegEx.test(email.value);
  if (validateEmail){ 
    errorContainer.innerHTML = "";
    return true;
  } else {
    errorContainer.innerHTML = "Please enter a valid @stud.noroff.no or @noroff.no email address.";
    return false;
  }
}


/**
 * Checks if string is a valid username, returns error to error container if fails
 * @param {Input Element} username
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * @example
 * console.log(isValidUsername("Bob123"))
 * //True
 */
export function isValidUsername(username, errorContainer) {
  //probably a nicer way to build this regex
  //const userRegEx = /^[A-Za-z0-9_]{1,}$/g;
  const userRegEx = /^[\w]+$/g;
  const validateUser = userRegEx.test(username.value);
  if (validateUser){ 
    errorContainer.innerHTML = "";
    return true;
  } else {
    errorContainer.innerHTML = "Username must not contain punctuation symbols apart from underscore (_).";
    return false;
  }
}


/**
 * Checks input length, returns error message to error container if false.
 * @param {Input Element} input 
 * @param {Number} length 
 * @param {Element} errorContainer error message is displayed here.
 * @returns {Boolean}
 * @example
 * console.log(isValidInputLength(inputValue, 8, inputError))
 * //True or False
 */
export function isValidInputLength(input, length, errorContainer) {
  if (input.value.trim().length > length) {
    errorContainer.innerHTML = "";
    return true;
  } else {
    errorContainer.innerHTML = `Your ${input.id} needs to be at least ${length} characters long.`;
    return false;
  }
}

/**
 * Checks inputs values match and are a minimum length, returns error message to error container if false.
 * @param {Input Element} input1 
 * @param {Input Element} input2 
 * @param {Number} length 
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * @example 
 * const passwordInput = document.queryselector("#password");
 * const confirmPasswordInput = document.queryselector("#passwordConfirm");
 * const passError = document.queryselector("#passwordError");
 * console.log(hasMatchingPasswords(passwordInput, confirmPasswordInput, 8, PassError));
 * returns true or false
 */
export function hasMatchingPasswords(input1, input2, length, errorContainer){
  if(input1.value === input2.value && input1.value.length >= length){
    errorContainer.innerHTML = "";
    return true
  } else if(input1.value.length < length){
    errorContainer.innerText = `Your passwords must be more than 8 characters`
    return false
  } else {
    errorContainer.innerText = `Your passwords don't match.`
    return false
  }
}

/**
 * checks an image is an actual link to a valid image.
 * @param {String} link img url.
 * @returns {Boolean}
 */
export function isValidImgLink(link){
  const imgRegEx = /\.(jpg|jpeg|png|webp|avif|gif)(?=\?.+|$)/;
  return imgRegEx.test(link.toLowerCase());
}

