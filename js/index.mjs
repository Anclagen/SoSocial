import {makeAPostListener, loadPostSearch, getPostsFeed, getFollowersAddSearch, API} from "./modules/main.mjs"
const avatar = document.querySelector(".avatar");
const headings = document.querySelectorAll(".heading");
/**
 * initialising the page.
 */
async function createPage(){
  if(API){
    try{
      avatar.src = API.avatar
      headings.forEach(heading=> heading.innerText += " " + API.name);
      makeAPostListener();
      getPostsFeed();
      getFollowersAddSearch();
      loadPostSearch()
    } catch(error) {
      console.log(error)
    }
  }
};

createPage()