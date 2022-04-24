


// grab the elements of the dom.
const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box");
const cancelBtn=document.querySelector(".content header i");
const addBtn=document.querySelector("#addBtn");
const titleTag=document.querySelector("form input");
const descTag=document.querySelector("#textarea");
const popupTitle=document.querySelector(".content header p")
const months=["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

let isUpdated=false;
let updateId;
// parsing the array if it already exist or passing an empty array.

const notes=JSON.parse(localStorage.getItem("notes")||("[]"));
// showNotes function
// add event listner for the popup.
addBox.addEventListener("click", (e)=>{
    // console.log(e.target);
    titleTag.focus();
    popupTitle.innerText="Add a new Note";
    addBtn.innerText="Add Note";
    
    popupBox.classList.add("show");
})

function showNotes(){
    // let li="";
    if(!notes) return;
    document.querySelectorAll(".note").forEach(note=>note.remove());
    notes.forEach((note,id)=>{
        // let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag=  `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>
                    ${note.description}
                </span>
            </div>
            <footer class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${id},'${note.title}', '${note.description}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
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
    const confirmDel=confirm("Are you sure you want to delete?");
    if(!confirmDel) return;
    notes.splice(noteId,1);
    // update the notes array too.
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, description){
    isUpdated=false;
    updateId=noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
    

}


// add event listener to the cancel btn.
cancelBtn.addEventListener("click", ()=>{
    // make the inputs clear when the user closes the btn.
    titleTag.value="";
    descTag.value="";
    popupBox.classList.remove("show");
});

// add event listener to the add note button.
// here the noteinfo will be stored in the localstorage as a notes object
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const title=titleTag.value.trim();
    const description=descTag.value.trim();
    
    if(title || description){

        const dateObj=new Date();
    
        
        const month=months[dateObj.getMonth()];
         const day=dateObj.getDate();
          const year=dateObj.getFullYear();
        
      
        // saving to the local storage.
     

    
            const noteInfo={
                title,
                description,
                date:`${month} ${day}, ${year}`
        
            };
            if(!isUpdated){
                notes.push(noteInfo);
                // console.log(isUpdated);
            }else{
                
                notes[updateId]=noteInfo; //updating specified note.
                console.log(isUpdated);
                isUpdated=false;

                
            }
           
            localStorage.setItem("notes",JSON.stringify(notes));
    
            console.log(notes);
            // onclicking add note, the popup box closes.
            cancelBtn.click();
      
    }
    
   
    showNotes();


    


    
})
