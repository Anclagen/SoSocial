import {API, defineUser} from "../main.mjs";
import {createAvatar } from "../render/user_avatar.mjs";

const followersContainer = document.querySelector("#followers");
const followingContainer = document.querySelector("#following");


/**
 * Creates avatars and fills the follower/following containers
 * @param {*} data API profile response, takes followers/following arrays
 */
export function renderFollowers({following, followers}){ //might reuse on other pages good to have containers
  followingContainer.innerHTML = "";
  followersContainer.innerHTML = "";
    following.forEach(following => {
      followingContainer.innerHTML += (createAvatar(following))
    })
    followers.forEach(follower => {
      followersContainer.innerHTML += (createAvatar(follower))
    })
}

/**
 * follows or unfollows the user depending on the button state.
 * On the profile page.
 */
 export async function followUserBtn(){
  const user = defineUser();
  try{
    if(this.innerText === "Follow"){
      await API.followProfile(user);
      this.innerText = "Unfollow";
    } else {
      await API.unfollowProfile(user);
      this.innerText = "Follow";
    }
    const newFollowers = await API.getProfile(user);
    renderFollowers(newFollowers);
  } catch(error){
    console.log(error);
  }
}