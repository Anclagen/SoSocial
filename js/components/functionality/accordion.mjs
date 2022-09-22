export function showInput(input, height){
  if(input.classList.contains("hidden")){
    input.classList.toggle('hidden')
    setTimeout(function () {
      input.classList.toggle('open');
      input.style.height = `${height}px`;
      }, 20);
  } else {
    input.classList.toggle('open')
    input.style.height = `0px`;
    setTimeout(function () {
      input.classList.toggle('hidden');
      }, 500);
  }
}