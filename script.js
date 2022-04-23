
import  {months} from "./months.js";

// grab the elements of the dom.
const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box");
const cancelBtn=document.querySelector(".content header i");
const addBtn=document.querySelector("#addBtn");
const title=document.querySelector("form input");
const desc=document.querySelector("#textarea");

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
            month:dateObj.getMonth(),
            day:dateObj.getMonth(),
            year:dateObj.getFullYear()
        }
      
        // saving to the local storage.
        let notes=[];

        if(!notes){
            notes=[];
         
        }else{
            const noteInfo={
                title:titleInfo,
                desc:descInfo,
                dateInfo:dateInfo
        
            };
            notes.push(noteInfo);
            localStorage.setItem("notearray",JSON.stringify(notes));
    
        };
        
      
    }
    showNotes();


    


    
})
