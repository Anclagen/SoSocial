import { renderPost } from "../render/post_cards.mjs";

/**
 * Displays first 25 posts and sets up the scrolling event listener to show more.
 * @param {Array} posts Array of posts
 * @param {Element} container place for posts to be rendered
 */
function limitPostRender(posts, container) {
  //displayed posts and stop boolean for when all results on page or filter change.
  let display = 0;
  let stopRendering = false;

  //only reliable way I found to stop instances of the scroll event listener overlapping when changing filter settings.
  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  postSorter.addEventListener("change", () => {
    stopRendering = true;
  });
  timeManipulator.addEventListener("change", () => {
    stopRendering = true;
  });

  /**
   * Adds 25 posts to the feed at a time.
   * @param {Array} posts Array of posts.
   * @param {Element} container Element to render html for posts.
   */
  function renderMorePosts(posts, container) {
    let count = display + 25;
    if (posts.length <= count) {
      count = posts.length;
      stopRendering = true;
    }
    for (let i = display; i < count; i++) {
      renderPost(posts[i], container, false);
    }
    display = display + 25;
  }

  //initial run to show first 25 posts
  renderMorePosts(posts, container);

  /**
   * Function to use in event listener on scroll if the bottom of the page is nearly reached loads more posts if all posts displayed removes the listener.
   */
  function getMorePost() {
    if (stopRendering) {
      //if all post showing or filter changed stops this instance of the listener.
      window.removeEventListener("scroll", getMorePost);
      console.log("Event Lister Removed");
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      renderMorePosts(posts, container);
    }
  }

  //sets up scroll listener to load more results
  window.addEventListener("scroll", getMorePost);
}

/**
 * renders an array of post objects to an element
 * @param {Object} postsData Post data object
 * @param {Element} container element to append Html to
 */
export function scrollingRenderPosts(postsData, container, reset) {
  container.innerHTML = "";
  limitPostRender(postsData, container, reset);
}
