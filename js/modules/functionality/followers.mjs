import { API } from "../main.mjs";
import { createAvatar } from "../render/user_avatar.mjs";

/**
 * Creates avatars and fills the follower/following containers
 * @param {*} data API profile response, takes followers/following arrays
 * @param {*} followersContainer followers output div for created avatars
 * @param {*} followingContainer following output div for created avatars
 */
export function renderFollowers({following, followers}, followersContainer, followingContainer ){ //might reuse on other pages good to have containers
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
 */
 export async function followUserBtn(){
  try{
    if(this.innerText === "Follow"){
      await API.followProfile(user);
      this.innerText = "Unfollow";
    } else {
      await API.unfollowProfile(user);
      this.innerText = "Follow";
    }
    const newFollowers = await API.getProfile(user);
    renderFollowers(newFollowers, followersContainer, followingContainer);
  } catch(error){
    console.log(error);
  }
}