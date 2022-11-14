/**
 * Creates a reply tree from flat replies array
 * @param {Array} replyData the reply data array
 * @returns Array of primary replies to post, with nested replies to them and so on.
 */
export function createReplyTree(replyData) {
  const primaryReplies = [];
  replyData.forEach((reply) => {
    //checks all the replies against one reply and if reply id and id matches
    reply.replies = replyData.filter((rep) => rep.replyToId === reply.id);

    /** pushes the comments primary replies to an array */
    if (reply.replyToId === 0) {
      primaryReplies.push(reply);
    }
  });
  return primaryReplies;
}
