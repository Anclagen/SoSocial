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

export function showContainer(container, height){
  if(container.classList.contains("hidden")){
    container.classList.toggle('hidden')
    setTimeout(function () {
      container.classList.toggle('open');
      container.style.height = `${height}px`;
      }, 20);
  } else {
    container.classList.toggle('open')
    container.style.height = `0px`;
    setTimeout(function () {
      container.classList.toggle('hidden');
      }, 500);
  }
}

//testing no height needed 

//https://frontendcoding.com/getting-the-height-of-a-hidden-element/
function getHiddenHeight(container) {
  const clone = container.cloneNode(true);

  Object.assign(clone.style, {
      overflow: 'visible',
      height: 'auto',
      maxHeight: 'none',
      opacity: '0',
      visibility: 'hidden',
      display: 'block',
  });

  container.after(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}


export function showContainerNoHeight(container){
  if(container.classList.contains("hidden")){
    container.classList.toggle('hidden')
    setTimeout(function () {
      container.classList.toggle('open');
      container.style.height = `${getHiddenHeight(container)}px`;
      }, 20);
  } else {
    container.classList.toggle('open')
    container.style.height = `0px`;
    setTimeout(function () {
      container.classList.toggle('hidden');
      }, 500);
  }
}