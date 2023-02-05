const addBtn = document.querySelector("#add");

const listItems = document.querySelector("#list-container");

localStorage.removeItem("items");

const items = JSON.parse(localStorage.getItem("items")) || [];

addBtn.addEventListener("click", function () {
  const item = document.querySelector("#item").value;
  document.querySelector("#item").value = "";
  const newItem = document.createElement("li");

  newItem.setAttribute("data-index", items.length);
  newItem.textContent = item;
  newItem.className = "list-group-item";

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "btn btn-danger float-end";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-info float-end";

  newItem.appendChild(delBtn);
  newItem.appendChild(editBtn);

  listItems.appendChild(newItem);

  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));

  delBtn.addEventListener("click", function () {
    const index = newItem.getAttribute("data-index");
    newItem.remove();
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    updateLocalStorage();
  });

  editBtn.addEventListener("click", function () {
    const index = newItem.getAttribute("data-index");
    const updatedItem = prompt("Enter");
    newItem.firstChild.textContent = updatedItem;
    items[index] = updatedItem;
    localStorage.setItem("items", JSON.stringify(items));
    updateLocalStorage();
    editBtn.classList.add("reset-shadow");
  });
  addBtn.classList.add("reset-shadow");
});

function updateLocalStorage() {
  const listItems = document.querySelectorAll("li");
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].setAttribute("data-index", i);
  }
  localStorage.setItem("items", JSON.stringify(items));
}
