export function showInput(container, height){
  const input = container.querySelector("input")
  if(container.classList.contains("hidden")){
    container.classList.toggle('hidden')
    setTimeout(function () {
      container.classList.toggle('open');
      container.style.height = `${height}px`;
      input.removeAttribute('disabled')
      }, 20);
  } else {
    container.classList.toggle('open')
    container.style.height = `0px`;
    setTimeout(function () {
      container.classList.toggle('hidden');
      input.setAttribute('disabled', '')
      }, 500);
  }
}