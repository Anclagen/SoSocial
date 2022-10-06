export function reportError(error, output){
  if(error.response){
    output.innerText = error.message;
  } else {
    output.innerText = "An error occurred please refresh and try again.";
  }
}