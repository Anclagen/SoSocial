/**
 * creates an invisible clone measures its height , deletes clone and returns height
 * https://frontendcoding.com/getting-the-height-of-a-hidden-element/
 * @param {Element} container element you want height of.
 * @returns Number
 */
function getHiddenHeight(container) {
  const clone = container.cloneNode(true);

  Object.assign(clone.style, {
    overflow: "visible",
    height: "auto",
    maxHeight: "none",
    opacity: "0",
    visibility: "hidden",
    display: "block",
  });

  container.after(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}

/**
 * toggles the displaying of an input, disables when hidden.
 * @param {input} container
 * @param {Number} height
 */
export function showInput(container, height) {
  const input = container.querySelector("input");
  if (container.classList.contains("hidden")) {
    container.classList.toggle("hidden");
    setTimeout(function () {
      container.classList.toggle("open");
      container.style.height = `${height}px`;
      input.removeAttribute("disabled");
    }, 20);
  } else {
    container.classList.toggle("open");
    container.style.height = `0px`;
    setTimeout(function () {
      container.classList.toggle("hidden");
      input.setAttribute("disabled", "");
    }, 500);
  }
}

/**
 * opens and closes a container.
 * @param {Element} container container to open/close
 */
export function showContainer(container) {
  if (container.classList.contains("hidden")) {
    container.classList.toggle("hidden");
    setTimeout(function () {
      container.classList.toggle("open");
      container.style.height = `${getHiddenHeight(container)}px`;
    }, 20);
  } else {
    container.classList.toggle("open");
    container.style.height = `0px`;
    setTimeout(function () {
      container.classList.toggle("hidden");
    }, 500);
  }
}
