/**
 * Creates a reply tree from flat replies array
 * @param {Array} replyData the reply data array
 * @returns Array of primary replies to post, with nested replies to them and so on.
 */
export function createReplyTree(replyData){
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

// Looking at other function apparently filtering is bad for large data sets, O n^2
// const createDataTree = replyData => {
  //   function objectTemplate(reply){ 
  //     return Object.create(reply);
  //   };
  //   replyData.forEach(reply => objectTemplate[reply.id] = {...reply, replies: []});
  //   const dataTree = [];
  //   replyData.forEach(aData => {
  //     if(aData.replyToId) objectTemplate[aData.replyToId].replies.push(objectTemplate[aData.id])
  //     else dataTree.push(objectTemplate[aData.id])
  //   });
  //   return dataTree
  // };
