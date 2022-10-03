import {isDateAfter} from "./dates.mjs"

/**
 * The great filter! sorts and filters based on drop down values
 * @param {Array} postData array of posts
 * @returns Array of filtered and sorted results
 */
export async function sortPosts(postData){
  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  const newArray = [...postData]
  //great filter!
  let filteredData = [];
  let sortedData = [];

  switch (timeManipulator.value){
    case "All":
      filteredData = newArray;
    break;
    case "Yesterday":
      filteredData = newArray.filter(
        (post) => isDateAfter(post, 1),
        );
    break;
    case "7days":
      filteredData = newArray.filter(
        (post) => isDateAfter(post, 7),
        );
    break;
    case "14days":
      filteredData = newArray.filter(
        (post) => isDateAfter(post, 14),
        );
    break;
    case "30days":
      filteredData = newArray.filter(
        (post) => isDateAfter(post, 30),
        );
    break;
  }

  switch (postSorter.value){
    case "Newest":
      sortedData = filteredData;
    break;
    case "Oldest":
      sortedData = filteredData.sort((a,b) => new Date(a.created) - new Date(b.created));
    break;
    case "Reacted":
      sortedData = filteredData.sort((a,b) => (b._count.reactions) - (a._count.reactions));
    break;
    case "Commented":
      sortedData = filteredData.sort((a,b) => (b._count.comments) - (a._count.comments));
    break;
    case "TitleAZ":
      sortedData = filteredData.sort((a,b) => (a.title) > (b.title));
    break;
    case "TitleZA":
      sortedData = filteredData.sort((a,b) => (a.title) < (b.title));
    break;
    case "AuthorAZ":
      sortedData = filteredData.sort((a,b) => (a.author.name) > (b.author.name));
    break;
    case "AuthorZA":
      sortedData = filteredData.sort((a,b) => (a.author.name) < (b.author.name));
    break;

    console.log(filteredData);
    console.log(sortedData);
  }

  return sortedData
}