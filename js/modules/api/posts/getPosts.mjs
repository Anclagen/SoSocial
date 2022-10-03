import { renderPosts } from "../../render/post_cards.mjs";
import { API} from "../../main.mjs";
import { addLoader } from "../../render/loader.mjs";
import { sortPosts } from "../../sort_search_filter/sort.mjs";

const postFeedContainer = document.querySelector("#post-feed")

/**
 * Gets all the posts sorts and filters the data as needed
 * and assigns listeners to the page for sorting.
 */
export async function getPostsFeed(){
  addLoader(postFeedContainer);
  const dataPosts = await API.getAllPosts(); 
  const sortedData = await sortPosts(dataPosts);
  renderPosts(sortedData, postFeedContainer, false);

  /**
   * Listener function when using sort options
   */
  async function filterFeed(){
    const sortedData =  await sortPosts(dataPosts);
    renderPosts(sortedData, postFeedContainer, false);
  }

  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  postSorter.addEventListener("change", filterFeed)
  timeManipulator.addEventListener("change", filterFeed)
}

/**
 * Gets posts for a particular user and renders them on there profile feed
 * @param {String} user Username
 */
export async function getUsersPosts(user){
  const dataPosts = await API.getAllPosts(); 
  const yourPosts = dataPosts.filter(post => post.author.name === user);
  renderPosts(yourPosts, postFeedContainer);
}