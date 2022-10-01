import { renderPosts } from "../render/post_cards.mjs";
import { API } from "../main.mjs";

const postFeedContainer = document.querySelector("#post-feed")

export async function getPosts(){
  const dataPosts = await API.getPosts(); 
  renderPosts(dataPosts, postFeedContainer);
}