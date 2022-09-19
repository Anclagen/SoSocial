/**
 * Checks if string is an email
 * @param {Input Element} email 
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * @example
 * console.log(isValidEmail("example@example.com"))
 * //True
 */
export function isValidEmail(email, errorContainer) {
  //probably a nicer way to build this regex
  const emailRegEx = /^[A-Za-z0-9_\.\+-]+@([noroff]+\.[no]{2})|^[A-Za-z0-9_\.\+-]+@(([stud]+\.[noroff]+\.[no]{2}))/g;
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
 * Checks if string is an email
 * @param {Input Element} username
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * @example
 * console.log(isValidUsername("Bob123"))
 * //True
 */
export function isValidUsername(username, errorContainer) {
  //probably a nicer way to build this regex
  const userRegEx = /^[A-Za-z0-9_]{1,}$/g;
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
 * 
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
    errorContainer.innerHTML = `Your ${input.id} needs to be 8 characters long.`;
    return false;
  }
}


/**
 * 
 * @param {Input Element} input1 
 * @param {Input Element} input2 
 * @param {Number} length 
 * @param {Element} errorContainer error message is displayed here.
 * @returns {boolean}
 * 
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

