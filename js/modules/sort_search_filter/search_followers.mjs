import { API } from "../main.mjs";
import { createAvatar } from "../render/user_avatar.mjs";

/**
 * Filters the profiles for people your following
 * @param {Array} data all the profile data
 * @param {String} yourName your username
 * @returns {Array} returns an array of people your following.
 */
export function getYourFollowing(data, yourName){
  return data.filter((user) => user.followers.map((follower) => follower.name).includes(yourName));
}

/**
 * Creates a list of people you might know from people
 * your followings followers/following
 * @param {Array} peopleYouKnow an array of people your following 
 * @param {API Class} API API handler class. 
 * @returns {Array} an array of profile objects.
 */
export function getPeopleYouMightKnow(peopleYouKnow, API){
  const names = peopleYouKnow.map((follower) => follower.name);
  let peopleYouMightKnow = [];
  peopleYouKnow.forEach((follower) => {

    follower.following.forEach(follower => {
    if(!names.includes(follower.name) && follower.name !== API.name && !peopleYouMightKnow.map((person) => person.name).includes(follower.name)) {
      peopleYouMightKnow.push(follower);
    }})

    follower.followers.forEach(follower => {
      if(!names.includes(follower.name) && follower.name !== API.name && !peopleYouMightKnow.map((person) => person.name).includes(follower.name)) {
        peopleYouMightKnow.push(follower);
      }})
  });

  return peopleYouMightKnow;
}

/**
 * Searches profiles for profiles matching your query
 * @param {Input} input search input
 * @param {Array} data array of profile objects
 * @returns {Array} filtered array
 * @example
 * function search(){
 *  const results = searchUsers(searchUsersInput, dataProfiles);
 *  results.forEach(user => {
 *  userContainer.innerHTML += createAvatar(user);
 *  });}
 * searchUsersInput.addEventListener("keyup", search);
 */
export function searchUsers(input, data){
  const query = input.value.toLowerCase();
  const filteredUsers = data.filter((user) =>{
    const userLower = user.name.toLowerCase();
    if(userLower.startsWith(query.toLowerCase())){
      return true;
    }
  });

  return filteredUsers;
}
  
/**
 * Sets up the home pages search functionality and
 * renders a list of people you might know on the page.
 */
export async function getFollowersAddSearch(){
  const userContainer = document.querySelector("#search-users-results");
  const searchUsersInput = document.querySelector("#search-users");
  const mightKnowContainer = document.querySelector("#you-might-know");
  searchUsersInput.setAttribute("disabled", true);
  const dataProfiles = await API.getAllProfiles(); 
  searchUsersInput.removeAttribute("disabled");

  const peopleYouKnow = getYourFollowing(dataProfiles, API.name);

  let peopleYouMightKnow = getPeopleYouMightKnow(peopleYouKnow, API);
  peopleYouMightKnow.forEach(person => {
    mightKnowContainer.innerHTML += createAvatar(person);
  })

  function search(){
    const results = searchUsers(searchUsersInput, dataProfiles);
    userContainer.innerHTML = "";
    let count = 10
    if(results.length < 10){
      count = results.length
    }

    for(let i = 0; i < count; i++){
      userContainer.innerHTML += createAvatar(results[i]);
    }
    if(results.length === 0){
      userContainer.innerHTML = "<span>No Results</span>"
    }
    if(searchUsersInput.value.length === 0){
      userContainer.innerHTML = "";
    }};

  searchUsersInput.addEventListener("keyup", search);
}