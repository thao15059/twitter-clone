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

postButton.addEventListener("click", () => {
  const content = postTextarea.value;

  fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
