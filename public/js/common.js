const postTextarea = document.querySelector("#postTextarea");
const postButton = document.querySelector("#submitPostButton");

postTextarea.addEventListener("keyup", (e) => {
  const content = e.target.value.trim();

  if (!content) {
    postButton.setAttribute("disabled", "");
    return;
  }

  postButton.removeAttribute("disabled");
});
