import { renderPosts } from "../../render/post_cards.mjs";
import { scrollingRenderPosts } from "../../functionality/render_on_scroll.mjs";
import { API } from "../../main.mjs";
import { addLoader } from "../../render/loader.mjs";
import { sortPosts } from "../../sort_search_filter/sort.mjs";
import { loadPostSearch } from "../../sort_search_filter/search.mjs";

const postFeedContainer = document.querySelector("#post-feed");

/**
 * Gets all the posts sorts and filters the data as needed
 * and assigns listeners to the page for sorting.
 */
export async function getPostsFeed(search = false) {
  addLoader(postFeedContainer);
  const dataPosts = await API.getAllPosts();
  console.log(dataPosts);
  if (search) {
    loadPostSearch(dataPosts);
  }
  const sortedData = await sortPosts(dataPosts);
  scrollingRenderPosts(sortedData, postFeedContainer);

  /**
   * Listener function when using sort options
   */
  async function filterFeed() {
    const sortedData = await sortPosts(dataPosts);
    scrollingRenderPosts(sortedData, postFeedContainer);
  }

  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  postSorter.addEventListener("change", filterFeed);
  timeManipulator.addEventListener("change", filterFeed);
}

/**
 * Gets posts for a particular user and renders them on there profile feed
 * @param {String} user Username
 */
export async function getUsersPosts(user) {
  const dataPosts = await API.getAllPosts();
  const yourPosts = dataPosts.filter((post) => post.author.name === user);
  renderPosts(yourPosts, postFeedContainer);
}
