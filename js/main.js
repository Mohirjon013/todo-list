let elForm = document.querySelector(".todo-form")
let elInput = document.querySelector(".todo-input")
let elLIst = document.querySelector(".todo-list")

let elModalWrapper = document.querySelector(".modul-wrapper")
let elModalInner = document.querySelector(".modul-inner")

let elAllCount = document.querySelector(".all-count")
let elComplatedCount = document.querySelector(".complated-count")
let elUNcomplatedCount = document.querySelector(".uncomplated-count")
let elCountWrapper = elAllCount.parentElement.parentElement

let todos = JSON.parse(localStorage.getItem("todos")) || []





elCountWrapper.addEventListener("click", function(e){
    if(e.target.matches(".all-btn")){
        renderTodos(todos)
    }
    else if (e.target.matches(".complated-btn")) {
        const filteredArr = todos.filter(item => item.isComplated == true)
        renderTodos(filteredArr)
    }
    else if (e.target.matches(".uncomplated-btn")) {
        const filteredArr = todos.filter(item => item.isComplated != true)
        renderTodos(filteredArr)
    }
})


elForm.addEventListener("submit", function(e){
    e.preventDefault()
    const date = {
        id: todos.length +1,
        todoValue: elInput.value,
        isComplated: false,
        imgURL:e.target.chosenImg.files[0] ? URL.createObjectURL(e.target.chosenImg.files[0]) : null
    }
    console.log(date);
    
    
    e.target.reset()
    todos.push(date)
    renderTodos(todos)
    elUploadImg.src = "images/empty.png"
    localStorage.setItem("todos", JSON.stringify(todos))
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
                <div class=" flex items-center ">
                        
                    <span>${index + 1}</span>
                    <strong class = " ml-[10px]  ${item.isComplated? "line-through" : ""}">${item.todoValue}</strong>
                    
                    ${item.imgURL ? `<img class = "rounded-lg ml-[150px]" src="${item.imgURL}" alt="" width="50" height="50" >` : " "}
                </div>
            </div>
            <div class="flex items-center space-x-1">
                <button id = "${item.id}" class="delet-btn  p-[6px]  rounded-lg bg-red-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-red-500 hover:border-red-500 duration-300" type="button">Delete</button>
                <button onclick ="handleUpdateBtn(${item.id})" class=" update-btn p-[6px]  rounded-lg bg-green-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-green-500 hover:border-green-500 duration-300" type="button">Update</button>
            </div>
        `
        elLIst.appendChild(elItem)
    })
    
    
    elAllCount.textContent = todos.length
    elComplatedCount.textContent = todos.filter(item => item.isComplated == true).length
    elUNcomplatedCount.textContent = todos.filter(item => item.isComplated != true).length
}
renderTodos(todos)



// isComplated start
function handleComplatedBtn (id){
    const findObj = todos.find(item => item.id == id)
    findObj.isComplated =! findObj.isComplated
    renderTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
}
// isComplated end

// delete and update start
elLIst.addEventListener("click", function(e) {
    if(e.target.matches(".delet-btn")){
        elLIst.classList.remove("p-3")
        const findObj = todos.findIndex(item => item.id == e.target.id)
        todos.splice(findObj, 1)
        renderTodos(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    
})

function handleUpdateBtn(id){
    elModalWrapper.classList.remove("scale-0")
    const findObj = todos.find(item => item.id == id)
    elModalInner.innerHTML = `
        <form class ="update-form >
            <div class = "flex">
                <input class="modal-input  ml-[60px] p-2 rounded-lg outline-none focus:shadow-sm focus:shadow-blue-500" type="text" value="${findObj.todoValue}">
                
                <button class="p-[6px]  rounded-lg bg-green-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-green-500 hover:border-green-500 duration-300" type = "submit"  onclick="savedUpdateBtnClick(${findObj.id})">update</button>
            </div>
            <label class = "cursor-pointer">
                <input class="hidden update-file" type="file" >
                <img class = "update-img rounded-lg mx-auto mt-5 pb-[15px]" src="${findObj.imgURL}" alt="" width="50" height="50">
            </label>   
        </form>
         

    `

    let elUpdateFile = document.querySelector(".update-file")
    let elUpdateImg = document.querySelector(".update-img")
    
    elUpdateFile.addEventListener("change", function(e){
        elUpdateImg.src = URL.createObjectURL(e.target.files[0])
    
    })


    let elUpdateFrom = document.querySelector(".update-form")
    elUpdateFrom.addEventListener("submit", (e) => {
        e.preventDefault()
        findObj.todoValue = e.target[0].value
        findObj.imgURL = elUpdateImg.src 
        elModalWrapper.classList.add("scale-0")
        renderTodos(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    })
}
// delete and update end

// modul start
elModalWrapper.addEventListener("click",function(e) {
    if(e.target.id == "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})
// modul end


let elChosenImg = document.querySelector(".chosen-img")
let elUploadImg = document.querySelector(".upload-img")

elChosenImg.addEventListener("change", function(e){
    elUploadImg.src = URL.createObjectURL(e.target.files[0])
})