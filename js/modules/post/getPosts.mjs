import { renderPosts } from "../render/post_cards.mjs";
import { API} from "../main.mjs";

const postFeedContainer = document.querySelector("#post-feed")

export async function getPosts(){
  const dataPosts = await API.getPosts(); 
  renderPosts(dataPosts, postFeedContainer);
}

export async function getUsersPosts(user){
  const dataPosts = await API.getPosts(); 
  const yourPosts = dataPosts.filter(post => post.author.name === user);
  renderPosts(yourPosts, postFeedContainer);
}