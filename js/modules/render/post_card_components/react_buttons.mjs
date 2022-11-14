import { API } from "../../main.mjs";

/**
 * Returns like and dislike buttons for post
 * @param {Number} id Posts id
 * @param {Array} reactions an array of reactions, with their counts.
 * @returns return html containing reaction buttons.
 */
export function createReactionButtons(id, reactions) {
  const reactionCounterContainer = document.createElement("div");
  reactionCounterContainer.classList = "pt-1";

  let likes = 0;
  let dislikes = 0;
  if (reactions.length > 0) {
    reactions.forEach((entry) => {
      if (entry.symbol.includes("👍")) {
        likes = entry.count;
      }
      if (entry.symbol.includes("👎")) {
        dislikes = entry.count;
      }
    });
  }

  const likeReactBtn = document.createElement("button");
  likeReactBtn.classList = "p-1 btn bg-tertiary border-rounded text-white";
  likeReactBtn.innerText = `Likes: 👍 (${likes})`;
  likeReactBtn.setAttribute("type", "button");
  reactionCounterContainer.appendChild(likeReactBtn);

  async function likePost() {
    const response = await API.likePost(id);
    likeReactBtn.innerText = `Likes: 👍 (${response.count})`;
  }

  likeReactBtn.addEventListener("click", likePost);

  const dislikeReactBtn = document.createElement("button");
  dislikeReactBtn.classList = "p-1 ms-2 btn bg-tertiary border-rounded text-white";
  dislikeReactBtn.innerText = `Dislikes: 👎 (${dislikes})`;
  dislikeReactBtn.setAttribute("type", "button");
  reactionCounterContainer.appendChild(dislikeReactBtn);

  async function dislikePost() {
    const response = await API.dislikePost(id);
    dislikeReactBtn.innerText = `Dislikes: 👎 (${response.count})`;
  }

  dislikeReactBtn.addEventListener("click", dislikePost);

  return reactionCounterContainer;
}
