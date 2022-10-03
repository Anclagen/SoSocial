const modalContainer = document.querySelector(".post-specific-modal")

/**
 * Creates a reply, as well as creating nested replies
 * when used with reply tree data.
 * @param {Array} repliesArray array of reply objects 
 * @returns Html to be appended to page.
 */
export function createAReply({body, owner, created, replies}){
  const replyContainer = document.createElement("div");
  replyContainer.classList = "bg-tertiary post-body text-white py-2 reply";
  
  const replyOwner = document.createElement("a");
  replyOwner.innerText = owner;
  replyOwner.setAttribute("href", `profile.html?profile=${owner}`);
  replyContainer.appendChild(replyOwner);
  
  const replyCreated = document.createElement("p");
  replyCreated.innerText = `Created: ${new Date(created).toLocaleString()}`;
  replyCreated.setAttribute("href", `profile.html?profile=${owner}`);
  replyContainer.appendChild(replyCreated);

  const replyBody = document.createElement("p");
  replyBody.classList = "py-1";
  replyBody.innerText = body;
  replyContainer.appendChild(replyBody);

  const replyToThisContainer = document.createElement("div");
  replyContainer.appendChild(replyToThisContainer);

  if(replies){
    replies.forEach(reply => {
      replyToThisContainer.append(createAReply(reply));
    });
  }

  return replyContainer
}

/**
 * Creates a reply tree from replies array
 * @param {Array} replyData the reply data array
 * @returns Array of
 */
function createReplyTree(replyData){
  const primaryReplies = []
  replyData.forEach(reply => {
    //checks all the replies against one reply and if reply id and id matches 
    reply.replies = replyData.filter(rep => rep.replyToId === reply.id);

    /** pushes the comments primary replies to an array */
    if(reply.replyToId === 0){
      primaryReplies.push(reply);
    }
  })
  
  return primaryReplies
}

/**
 * Sorts to newest, create reply tree array, all replies to element
 * @param {Array} replyData the replies to a post.
 * @param {Element} container where its all getting rendered
 */
export function renderReplies(replyData, container) {
  //sort by newest
  replyData.sort((a,b) => new Date(b.created) - new Date(a.created));
  const replyTree = createReplyTree(replyData);
  console.log(replyTree)
  replyTree.forEach(reply => {
    container.append(createAReply(reply));
  });
}