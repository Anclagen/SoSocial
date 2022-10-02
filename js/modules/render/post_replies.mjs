
export function createAReply({body, owner, created}){
  const replyContainer = document.createElement("div");
  replyContainer.classList = "bg-tertiary post-body py-2 reply";
  
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

  return replyContainer
}

export function renderReplies(replyData, container) {
  container.append(...replyData.map(createAReply));
}