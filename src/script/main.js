const url = "http://localhost:8080/api/todo";

getList();

function showList(toDoList) {
    const extContainer = document.getElementById("list");
    extContainer.innerHTML = "";
    const ul = document.createElement("ul");
    toDoList.forEach((task) => {
        const text = task.completed
            ? document.createElement("del")
            : document.createElement("p");
        text.innerHTML = task.description;
        text.setAttribute("onclick", `toggleCompleted(${task.id})`)
        text.className
        const img = document.createElement("img");
        img.src = "src/img/trash-icon.png";
        img.width = 20;
        img.alt = "trashcan icon";
        img.setAttribute("onclick", `deleteItem(${task.id})`);

        const li = document.createElement("li");
        li.id = task.id;
        li.appendChild(text);
        li.appendChild(img);
        ul.appendChild(li);
    });

    extContainer.appendChild(ul);
}

function getList() {
    axios
        .get(url)
        .then((response) => {
            showList(response.data);
        })
        .catch((err) => console.log(err));
}
function deleteItem(id) {
    axios
        .delete(url + `/delete/${id}`)
        .then(getList())
        .catch((err) => console.log(err));
}
function toggleCompleted(id) {
    axios
        .put(url + "/togglecompleted/" + id)
        .then(getList())
        .catch((err) => console.log(err));
}
function addItem() {
    let description = document.getElementById("description").value;
    let newItem = {
        "description": description
    }
    
    axios
        .post(url + "/new", newItem)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
}