import { makeAPostListener, getPostsFeed, getFollowersAddSearch, API } from "./modules/main.mjs";
const avatar = document.querySelector(".avatar");
const headings = document.querySelectorAll(".heading");
/**
 * initialising the page.
 */
async function createPage() {
  if (API) {
    try {
      avatar.src = !API.avatar ? "" : API.avatar;
      headings.forEach((heading) => (heading.innerText += " " + API.name));
      makeAPostListener();
      getPostsFeed(true);
      getFollowersAddSearch();
    } catch (error) {
      console.log(error);
    }
  }
}

createPage();
