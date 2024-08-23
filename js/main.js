let elForm = document.querySelector(".todo-form")
let elInput = document.querySelector(".todo-input")
let elLIst = document.querySelector(".todo-list")

let todos = []
elForm.addEventListener("submit", function(e){
    e.preventDefault()
    const date = {
        id: todos.length +1,
        todoValue: elInput.value,
        isComplated: false
    }
    e.target.reset()
    todos.push(date)
    renderTodos(todos)
})
function renderTodos(arr){
    elLIst.innerHTML = null
    arr.forEach((item, index) => {
        elLIst.classList.add("p-3")
        let elItem = document.createElement("li")
        elItem.className = `flex bg-white rounded-[30px] p-2 items-center justify-between ${item.isComplated? "opacity-70" : ""}`
        elItem.innerHTML = `
            <div class="flex items-center gap-[15px]">
                <div onclick = "handleComplatedBtn(${item.id})" class="w-[20px] h-[20px] relative cursor-pointer rounded-full border-[2px] border-black">
                    <div class="absolute inset-[2px] rounded-full ${item.isComplated ? "bg-blue-500" : ""}"></div>
                </div>
                <div class=" ">
                        
                    <span>${index + 1}</span>
                    <strong class = "${item.isComplated? "line-through" : ""}">${item.todoValue}</strong>
                </div>
            </div>
            <div class="flex items-center space-x-1">
                <button id = "${item.id}" class="delet-btn  p-[6px]  rounded-lg bg-red-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-red-500 hover:border-red-500 duration-300" type="button">Delete</button>
                <button id = "${item.id}" class=" update-btn p-[6px]  rounded-lg bg-green-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-green-500 hover:border-green-500 duration-300" type="button">Update</button>
            </div>
        `
        elLIst.appendChild(elItem)
    })
}

function handleComplatedBtn (id){
    const findObj = todos.find(item => item.id == id)
    findObj.isComplated =! findObj.isComplated
    renderTodos(todos)
}


// delete and update
elLIst.addEventListener("click", function(e) {
    if(e.target.matches(".delet-btn")){
        elLIst.classList.remove("p-3")
        const findObj = todos.findIndex(item => item.id == e.target.id)
        todos.splice(findObj, 1)
        renderTodos(todos)
    }
    else if(e.target.matches(".update-btn")){
        const findObj = todos.find(item => item.id == e.target.id)
        elModalWrapper.classList.remove("scale-0")
        elModalInner.innerHTML = `
            <input class="modal-input  ml-[60px] p-2 rounded-lg outline-none focus:shadow-sm focus:shadow-blue-500" type="text" value="${findObj.todoValue}">
            <button class="p-[6px]  rounded-lg bg-green-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-green-500 hover:border-green-500 duration-300" type = "submit"  onclick="savedUpdateBtnClick(${findObj.id})">update</button>
        `

        
    }
})


let elModalWrapper = document.querySelector(".modul-wrapper")
let elModalInner = document.querySelector(".modul-inner")
function savedUpdateBtnClick(id){
    elModalWrapper.classList.add("scale-0")
    let elModalInput = document.querySelector(".modal-input")
    const findObj = todos.find(item => item.id == id)
    findObj.todoValue = elModalInput.value
    renderTodos(todos)
}


// modul start
elModalWrapper.addEventListener("click",function(e) {
    if(e.target.id == "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})