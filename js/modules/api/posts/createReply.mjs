import { API } from "../../main.mjs";

export async function createNewReply(submit) {
  const id = submit.target.getAttribute('data-postID');
  submit.preventDefault()
  const formData = new FormData(submit.target);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.replyToPost(id, JSON.stringify(bodyData));
  console.log(response)
  submit.target.reset()
  //close form
  submit.target.parentNode.classList.remove("open")
  submit.target.parentNode.style.height = 0;
  setTimeout(function () {
    submit.target.parentNode.classList.toggle('hidden');
    }, 500);
}
