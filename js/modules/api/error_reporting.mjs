/**
 * checks for response in error and gives message, or generic message if noting provided
 * @param {Object} error error message response
 * @param {Element} output container for error message to be displayed.
 */
export function reportError(error, output) {
  if (error.response) {
    output.innerText = error.message;
  } else {
    output.innerText = "An error occurred please refresh and try again.";
  }
}

/**
 * creates an error message to add to page
 * @param {String} Text error message to be give to user
 * @returns
 */
export function createAnErrorMessage(Text = "An error had occurred, please refresh page") {
  const errorMessage = document.createElement("p");
  errorMessage.classList = "text-danger p-1 bg-white";
  errorMessage.innerHTML = Text;

  return errorMessage;
}
