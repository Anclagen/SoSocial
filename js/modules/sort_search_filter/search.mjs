
// ------------------- Search Followers ------------------------
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
function searchUsers(input, data){
  const query = input.value.toLowerCase();
  const filteredUsers = data.filter((user) =>{
    const userLower = user.name.toLowerCase();
    if(userLower.startsWith(query.toLowerCase())){
      return true;
    }
  });

  return filteredUsers;
}
  

const userContainer = document.querySelector("#search-users-results");
const searchUsersInput = document.querySelector("#search-users");

export async function getFollowers(){
  const dataProfiles = await API.getProfiles(); 
  const peopleYouKnow = getYourFollowing(dataProfiles, API.name);
  let peopleYouMightKnow = getPeopleYouMightKnow(peopleYouKnow, API);
  peopleYouMightKnow.forEach(person => {
    mightKnowContainer.innerHTML += createAvatar(person);
  })

  function search(){
    const results = searchUsers(searchUsersInput, dataProfiles);
    console.log(results)
    
    // results.forEach(user => {
    //   userContainer.innerHTML += createAvatar(user);
    // });
    userContainer.innerHTML = "";
    let count = 10
    if(results.length < 10){
      count = results.length
    }
    for(let i = 0; i < count; i++){
      userContainer.innerHTML += createAvatar(results[i]);
    }
    if(searchUsersInput.value.length === 0){
      userContainer.innerHTML = "";
    }};

  searchUsersInput.addEventListener("keyup", search);
}