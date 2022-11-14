/**
 * Adds loader to container
 * @param {Element} container
 */
export function addLoader(container) {
  container.innerHTML = `<div class="loader">
                          <div class="outer-loader"></div>
                          <div class="inner-loader"></div>
                          <p>Getting posts, please wait...</p>
                        </div>`;
}
