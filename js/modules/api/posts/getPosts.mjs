import { renderPosts } from "../../render/post_cards.mjs";
import { API} from "../../main.mjs";
import { addLoader } from "../../render/loader.mjs";
import { sortPosts } from "../../sort_search_filter/sort.mjs";

const postFeedContainer = document.querySelector("#post-feed")

export async function getPostsFeed(){
  addLoader(postFeedContainer);
  const dataPosts = await API.getAllPosts(); 
  const sortedData = await sortPosts(dataPosts);
  console.log(sortedData);
  renderPosts(sortedData, postFeedContainer);

  async function filterFeed(){
    console.log(dataPosts)
    const sortedData =  await sortPosts( dataPosts);
    console.log(sortedData)
    renderPosts(sortedData, postFeedContainer);
  }

  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  postSorter.addEventListener("change", filterFeed)
  timeManipulator.addEventListener("change", filterFeed)
}

export async function getUsersPosts(user){
  const dataPosts = await API.getPosts(); 
  const yourPosts = dataPosts.filter(post => post.author.name === user);
  renderPosts(yourPosts, postFeedContainer);
}