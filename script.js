document.addEventListener("DOMContentLoaded", function(){
    const burgerMenu=document.getElementById("bureger-menu");
    const navMenu=document.getElementById("nav-menu");

    burgerMenu.addEventListener("click", function(){
        navMenu.classList.toggle("active"); //добавляем/удаляем класс active, который делает меню видимым
    })
})

//закрывает меню при нажатии за его пределами
document.addEventListener("click", function(event){
    if(!navMenu.contains(event.target) && !burgerMenu.contains(event.target)){
        navMenu.classList.remove("active");
    }
})

//меняет значок при открытии меню
burgerMenu.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    burgerMenu.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
});

//изменяем текст по нажатию кнопки-переключателя с плавной анимацией
document.getElementById("changeButton").addEventListener("click", function(){
    let text=document.getElementById("text");
    text.style.opacity="0";
    setTimeout(() => {
        text.textContent=text.textContent ==="Это обычный текст."
        ? "Текст изменился!"
        : "Это обычный текст."
        text.style.opacity="1";
    }, 300);
})

//функция для сохранения списка задач в локальной памяти
function saveTasks(){
    let tasks=[];
    document.querySelectorAll("#taskList li").forEach(li=>{
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//загрузка списка задач из локальной памяти при перезагрузке страницы
function loadTasks(){
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText=>{
        let li=document.createElement("li");
        li.textContent=taskText;

        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="❌";
        deleteBtn.style.marginLeft="10px";
        deleteBtn.addEventListener("click", function(){
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);
    });
}

//динамический список задач
document.getElementById("addTask").addEventListener("click", function(){
    let input= document.getElementById("taskInput");
    let taskText= input.value.trim();

    if(taskText !== ""){
        let li= document.createElement("li");
        li.textContent= taskText;

        //кнопка для удаления задач
        let deleteBtn= document.createElement("button");
        deleteBtn.textContent="❌";
        deleteBtn.style.marginLeft="10px";
        deleteBtn.addEventListener("click", function(){
            li.remove(); //удаляет задачу при нажатии
            saveTasks();
        });

        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);
        input.value ="";
        saveTasks();
    }
});

window.addEventListener("load", loadTasks);