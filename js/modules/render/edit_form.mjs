
/**
 * 
 * @param {Number} id 
 * @param {String} title 
 * @param {String} body 
 * @param {String} media 
 * @param {Array} tags 
 * @returns 
 */
export function createEditForm(id, title, body, media, tags){
  const editForm = document.createElement("form");
  editForm.setAttribute("data-postID", id);
  editForm.classList = "mx-2 closing hidden";
  
  const editFormHeading = document.createElement("h3");
  editFormHeading.classList = "pt-2 pb-1";
  editFormHeading.innerText = "Edit Your Post";
  editForm.appendChild(editFormHeading);

  const formBody = document.createElement("div");
  formBody.classList = "d-flex flex-column";
  editForm.appendChild(formBody);

  const titleEditLabel = document.createElement("label");
  titleEditLabel.innerText = "Title";
  titleEditLabel.classList = "text-white ms-2 pt-2";
  titleEditLabel.setAttribute("for", "title");
  formBody.appendChild(titleEditLabel);

  const titleEditInput = document.createElement("input");
  titleEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
  titleEditInput.setAttribute("name", "title");
  titleEditInput.setAttribute("type", "text");
  titleEditInput.value = title;
  formBody.appendChild(titleEditInput);

  const bodyEditLabel = document.createElement("label");
  bodyEditLabel.innerText = "Body";
  bodyEditLabel.classList = "text-white ms-2 pt-2";
  bodyEditLabel.setAttribute("for", "body");
  formBody.appendChild(bodyEditLabel);

  const bodyEditInput = document.createElement("textarea");
  bodyEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
  bodyEditInput.setAttribute("name", "body");
  bodyEditInput.setAttribute("type", "text");
  bodyEditInput.value = body;
  formBody.appendChild(bodyEditInput);

  const mediaEditLabel = document.createElement("label");
  mediaEditLabel.innerText = "Image";
  mediaEditLabel.classList = "text-white ms-2 pt-2";
  mediaEditLabel.setAttribute("for", "media");
  formBody.appendChild(mediaEditLabel);

  const mediaEditInput = document.createElement("input");
  mediaEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
  mediaEditInput.setAttribute("name", "media");
  mediaEditInput.setAttribute("type", "url");
  mediaEditInput.value = media;
  formBody.appendChild(mediaEditInput);

  const tagsEditLabel = document.createElement("label");
  tagsEditLabel.innerText = "Tags";
  tagsEditLabel.classList = "text-white ms-2 pt-2";
  tagsEditLabel.setAttribute("for", "tags");
  formBody.appendChild(tagsEditLabel);

  const tagsEditInput = document.createElement("input");
  tagsEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
  tagsEditInput.setAttribute("name", "tags");
  tagsEditInput.setAttribute("type", "text");
  tagsEditInput.value = tags;
  formBody.appendChild(tagsEditInput);

  const submitEditFormBtn = document.createElement("input");
  submitEditFormBtn.classList = "btn btn-success d-block mt-2 ms-auto";
  submitEditFormBtn.value = "Update Post";
  submitEditFormBtn.setAttribute("type", "submit");
  formBody.appendChild(submitEditFormBtn);

  return editForm;
}