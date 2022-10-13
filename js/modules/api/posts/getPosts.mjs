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
 * @param {Boolean} search enable search, no search on profile page
 */
export async function getPostsFeed(search = false) {
  addLoader(postFeedContainer);
  const dataPosts = await API.getAllPosts();
  if (search) {
    loadPostSearch(dataPosts);
  }
  const sortedData = await sortPosts(dataPosts);
  scrollingRenderPosts(sortedData, postFeedContainer, dataPosts);

  /**
   * Listener function when using sort options
   */
  async function filterFeed() {
    const sortedData = await sortPosts(dataPosts);
    scrollingRenderPosts(sortedData, postFeedContainer, dataPosts);
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
  addLoader(postFeedContainer);
  const dataPosts = await API.getAllPosts();
  const yourPosts = dataPosts.filter((post) => post.author.name === user);
  postFeedContainer.innerHTML = "";
  renderPosts(yourPosts, postFeedContainer, dataPosts);
}
