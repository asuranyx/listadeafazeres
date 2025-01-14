const formEl = document.querySelector(".form"); //colocando o nome das classes que chamamos no html
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
list.forEach(task=>{
    toDolist(task)
})


formEl.addEventListener("submit", (event)=>{ //evento que vai acontecer ao enviar
    event.preventDefault(); //previne a pagina de dar refresh
    toDolist();
});

function toDolist(task){ //para aparecer o novo conteudo que foi escrito
    let newTask = inputEl.value;
    if(task){ //salvar o input do refresh 
        newTask = task.name;
    }


    const liEl = document.createElement("li");
    if(task && task.checked){ //salvar o input ja checked do refresh
        liEl.classList.add("checked");
    }
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    inputEl.value = "";
    const checkBtnEl = document.createElement ("div"); //colocar o checkmark do lado de cada input
    checkBtnEl.innerHTML = `<i class="fa-solid fa-check"</i>`;

    liEl.appendChild(checkBtnEl); //colocar a lixeira do lado de cada input
    const trashBtnEl = document.createElement ("div");
    trashBtnEl.innerHTML =  `<i class="fa-solid fa-trash"</i>`;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", ()=>{ //clica no checkmark e fica marcado como já feito
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", ()=>{ //clica na lixeira e desaparece
        liEl.remove();
        updateLocalStorage();
    });
    updateLocalStorage()
};


function updateLocalStorage(){ //para salvar o input que foi colocado apos dar refresh
    const liEls = document.querySelectorAll("li")
    list = [];
    liEls.forEach(liEl=>{
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.
            contains("checked")
        })
    })
    localStorage.setItem("list", JSON.stringify(list))
}