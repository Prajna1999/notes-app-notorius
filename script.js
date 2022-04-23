
import  {months} from "./months.js";

// grab the elements of the dom.
const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box");
const cancelBtn=document.querySelector(".content header i");
const addBtn=document.querySelector("#addBtn");
const title=document.querySelector("form input");
const desc=document.querySelector("#textarea");

const notesArray=JSON.parse(localStorage.getItem("notesArray"));
// add event listner for the popup.
addBox.addEventListener("click", (e)=>{
    // console.log(e.target);
    popupBox.classList.add("show");
})

// add event listener to the cancel btn.
cancelBtn.addEventListener("click", ()=>{
    popupBox.classList.remove("show");
});

// add event listener to the add note button.
// here the noteinfo will be stored in the localstorage as a notes object
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const titleInfo=title.value.trim();
    const descInfo=desc.value.trim();
    
    if(titleInfo || descInfo){

        const dateObj=new Date();
    
        const dateInfo={
            month:months[dateObj.getMonth()],
            day:dateObj.getMonth(),
            year:dateObj.getFullYear()
        }
      
        // saving to the local storage.
        let notes=[];

    
            const noteInfo={
                titleInfo,
                descInfo,
                dateInfo:`${dateInfo.month} ${dateInfo.day}, ${dateInfo.year}`
        
            };
            notes.push(noteInfo);
            localStorage.setItem("notesArray",JSON.stringify(notes));
    
        
        
      
    }
    showNotes();


    


    
})
