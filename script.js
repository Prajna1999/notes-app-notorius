


// grab the elements of the dom.
const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box");
const cancelBtn=document.querySelector(".content header i");
const addBtn=document.querySelector("#addBtn");
const titleInfo=document.querySelector("form input");
const desc=document.querySelector("#textarea");
const popupTitle=document.querySelector(".content header p")
const months=["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

// parsing the array if it already exist or passing an empty array.

const notes=JSON.parse(localStorage.getItem("notes")||("[]"));
// showNotes function


function showNotes(){
    // let li="";
    if(!notes) return;
    document.querySelectorAll(".note").forEach(note=>note.remove());
    notes.forEach((note,id)=>{
      
        let liTag=  `<li class="note">
            <div class="details">
                <p>${note.titleInfo}</p>
                <span>
                    ${note.descInfo}
                </span>
            </div>
            <footer class="bottom-content">
                <span>${note.dateInfo}</span>
                <div class="settings">
                    
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${id},'${note.titleInfo}', '${note.descInfo}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                        <li onclick="deleteNote(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                    </ul>
                </div>
            </footer>
        </li>`;

        addBox.insertAdjacentHTML("afterend", liTag);
    });

    

}
showNotes();
function showMenu(elem){
    // console.log(elem.parentElement);
    elem.parentElement.classList.add("show");

    document.addEventListener("click", (e)=>{
        if(e.target.tagName!=="I" || e.target!==elem){
            elem.parentElement.classList.remove("show");
        }
    })
}

function deleteNote(noteId){
    notes.splice(noteId,1);
    // update the notes array too.
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, description){
    addBox.click();
    title.value = title;
    desc.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";

}
// add event listner for the popup.
addBox.addEventListener("click", (e)=>{
    // console.log(e.target);
    popupBox.classList.add("show");
})

// add event listener to the cancel btn.
cancelBtn.addEventListener("click", ()=>{
    // make the inputs clear when the user closes the btn.
    titleInfo.value="";
    desc.value="";
    popupBox.classList.remove("show");
});

// add event listener to the add note button.
// here the noteinfo will be stored in the localstorage as a notes object
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const titleInfo=titleInfo.value.trim();
    const descInfo=desc.value.trim();
    
    if(titleInfo || descInfo){

        const dateObj=new Date();
    
        const dateInfo={
            month:months[dateObj.getMonth()],
            day:dateObj.getDate(),
            year:dateObj.getFullYear()
        }
      
        // saving to the local storage.
     

    
            const noteInfo={
                titleInfo,
                descInfo,
                dateInfo:`${dateInfo.month} ${dateInfo.day}, ${dateInfo.year}`
        
            };
            notes.push(noteInfo);
            localStorage.setItem("notes",JSON.stringify(notes));
    
            console.log(notes);
            // onclicking add note, the popup box closes.
            cancelBtn.click();
      
    }
    
   
    showNotes();


    


    
})
