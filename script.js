// let num = 1 + "2";
// console.log(typeof num)//string

// js essari kam garxa:xeu ko output ho
// console.log(1 + "2")//12
// console.log("1" + 23)//123
// console.log("1" + 2 + 2)//122
// console.log(1 + 2 + "2")//32



// maile lekheko code hoo jun completer xaina local storage ko problem le garda tala chatgpt le milako codexa


//clicking btn box to get input box

document.getElementsByClassName("btn btn-outline-warning")[0].addEventListener('click', () => {

    document.getElementsByClassName("btn btn-outline-warning")[0].disabled = "true"

    //creating input box and container for keeping input boxes
    const container = document.createElement('div');
    container.setAttribute("id", "input_box_container");
    //   /  container.setAttribute("class", "input_container");

    //input create
    const input_box_topic = document.createElement('textarea');
    const input_box_context = document.createElement('textarea');

    //attribute set garekko input box ra container ko
    container.setAttribute("class", "container_div")
    input_box_topic.setAttribute("class", "input_topic")
    input_box_context.setAttribute("class", "input_context")

    // placeholder for topic input box
    input_box_topic.placeholder = "Subject"
    input_box_context.placeholder = "Context"


    //Append the container to the body
    document.body.appendChild(container);

    //  input_box.setAttribute("class", "input_writing")
    container.appendChild(input_box_topic)
    container.appendChild(input_box_context)

    //enter and remove button
    const save_img = document.createElement("img");
    const remove_img = document.createElement("img");

    save_img.src = "check-mark.png";
    remove_img.src = "delete.png"
    //image lai haleko input context ma
    container.appendChild(save_img)
    container.appendChild(remove_img)

    //class halya image ma
    save_img.setAttribute("class", "save_inp_img")
    remove_img.setAttribute("class", "remove_inp_img")


    // remove ko img thichda hunne kura
    remove_img.addEventListener("click", () => {
        container.remove();
        document.getElementsByClassName("btn btn-outline-warning")[0].removeAttribute('disabled');
        removeFromStorage()
    })


    /*ya xaa save paxii ko*/

    //add onclick function to img for savind and deleting
    save_img.addEventListener("click", () => {

        setTimeout(() => {
            window.location.reload()
        }, 1);
        // local storage ma save
        store(input_box_topic.value, input_box_context.value)

        container.remove();

        // naya note banauna na milne btn lai able banako
        document.getElementsByClassName("btn btn-outline-warning")[0].removeAttribute('disabled')
        createSavedNote();
        setTimeout(() => {
            window.location.reload()
        }, 1);
        /*
        
                //creating new note
                const save_container = document.createElement('div');
        
                //   /  container.setAttribute("class", "input_container");
        
                //attribute haru mila ko save gareko bela milna
                save_container.setAttribute("class", "save_container");
        
        
                //input create for saved data
                const input_box_topic_save = document.createElement('textarea');
                const input_box_context_save = document.createElement('textarea');
        
                //attribute set garekko input box ra container ko
                input_box_topic_save.setAttribute("class", "input_topic_save")
                input_box_context_save.setAttribute("class", "input_context_save")
        
                // text ma saved value halya
                input_box_topic_save.textContent = input_box_topic.value
                input_box_context_save.textContent = input_box_context.value;
        
        
        
                // naya baneko data lai milako
                document.body.appendChild(save_container)
        
                save_container.appendChild(input_box_topic_save);
                save_container.appendChild(input_box_context_save);
        
        
                // hover garda contexxt part visible parna
                save_container.addEventListener("mouseenter", () => {
                    input_box_context_save.style.visibility = "visible"
                })
        
                save_container.addEventListener("mouseleave", () => {
                    input_box_context_save.style.visibility = "hidden"
                })
        
        
        
                // saved data ma save ra remove img halne
                const saved_img = document.createElement("img");
                const removed_img = document.createElement("img");
        
                saved_img.src = "check-mark.png";
                removed_img.src = "delete.png"
        
                //image lai haleko input context ma
                save_container.appendChild(saved_img)
                save_container.appendChild(removed_img)
        
                //class halya image ma
                saved_img.setAttribute("class", "saved_inp_img")
                removed_img.setAttribute("class", "removed_inp_img")
        
        
                // save ko img ma click garda
                saved_img.addEventListener("click", () => {
        
                    store(input_box_topic_save.value, input_box_context_save.value)
                    localStorage.removeItem(input_box_topic)
        
                })
        
                // remove ko img thichda hunne kura
                removed_img.addEventListener("click", () => {
                    save_container.remove();
        
                })
        
        */
    })

})

// local storage-store
function store(save_key, save_cxt) {
    // jun kura notes vanne key ma xa storage ma teslai linxaa ra array ma halxa local storage mai
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // array ma add garo
    notes.push({ save_key, save_cxt })
    localStorage.setItem('notes', JSON.stringify(notes));

}
function loadsavedData() {
    // refresh garda sab note haru lai convert garna taneko
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createSavedNote(note.save_key, note.save_cxt)
    });
}

// creating saved notes on refresh


/*user le deko value nabai lekheko kura lai hami localstorage ma nabai 
yei pani object ko form ma store garna sakxam?
const obj=[
 obj=1[{kdf}]
]
*/
// chat gpt modified code

const createNoteButton = document.getElementById("note_create");

document.addEventListener("DOMContentLoaded", () => {
    // Load saved data from localStorage
    loadSavedData();



    // Event listener for "Create Note" button
    createNoteButton.addEventListener("click", () => {
        createInputBox();
        createNoteButton.disabled = true; // Disable the button after creating an input box
    });
});

// Function to create input box
function createInputBox() {
    // Create input box and container
    /*
    const container = document.createElement('div');
    container.setAttribute("id", "input_box_container");
 
    // Create input fields
    const input_box_topic = document.createElement('textarea');
    const input_box_context = document.createElement('textarea');
 
    // Set attributes
    container.setAttribute("class", "container_div");
    input_box_topic.setAttribute("class", "input_topic");
    input_box_context.setAttribute("class", "input_context");
 
    // Set placeholders
    input_box_topic.placeholder = "Subject";
    input_box_context.placeholder = "Context";
 
    // Append the container to the body
    document.body.appendChild(container);
    container.appendChild(input_box_topic);
    container.appendChild(input_box_context);
 
    // Create save and remove buttons
    const save_img = document.createElement("img");
    const remove_img = document.createElement("img");
 
    save_img.src = "check-mark.png";
    remove_img.src = "delete.png";
 
    container.appendChild(save_img);
    container.appendChild(remove_img);
 
    // Set classes for images
    save_img.setAttribute("class", "save_inp_img");
    remove_img.setAttribute("class", "remove_inp_img");
 
    // Save button functionality
    save_img.addEventListener("click", () => {
        createSavedNote(input_box_topic.value, input_box_context.value);
        container.remove(); // Remove the input box after saving
        createNoteButton.disabled = false; // Re-enable the button for new note
    });
 
    // Remove button functionality
    remove_img.addEventListener("click", () => {
        container.remove();
        createNoteButton.disabled = false; // Re-enable the button for new note
    });
    */
}
// Store data in localStorage
function store(topic, context) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ topic, context });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load saved data from localStorage
function loadSavedData() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createSavedNote(note.topic, note.context);
        console.log(JSON.stringify(notes[0]))
    });
}

// Create a saved note
function createSavedNote(topic, context) {

    const save_container = document.createElement('div');
    save_container.setAttribute("class", "save_container");

    const input_box_topic_save = document.createElement('textarea');
    const input_box_context_save = document.createElement('textarea');

    input_box_topic_save.setAttribute("class", "input_topic_save");
    input_box_context_save.setAttribute("class", "input_context_save");

    input_box_topic_save.textContent = topic;
    input_box_context_save.textContent = context;

    document.body.appendChild(save_container);
    save_container.appendChild(input_box_topic_save);
    save_container.appendChild(input_box_context_save);

    // Visibility toggle for context
    save_container.addEventListener("mouseenter", () => {
        input_box_context_save.style.visibility = "visible";
    });
    save_container.addEventListener("mouseleave", () => {
        input_box_context_save.style.visibility = "hidden";
    });

    // Create save and remove images
    const saved_img = document.createElement("img");
    const removed_img = document.createElement("img");

    saved_img.src = "check-mark.png";
    removed_img.src = "delete.png";

    save_container.appendChild(saved_img);
    save_container.appendChild(removed_img);

    saved_img.setAttribute("class", "saved_inp_img");
    removed_img.setAttribute("class", "removed_inp_img");

    // Event for saved image
    saved_img.addEventListener("click", () => {
        store(input_box_topic_save.value, input_box_context_save.value);
        setTimeout(() => {
            window.location.reload()
        }, 1);
    });

    // Event for remove image
    removed_img.addEventListener("click", () => {
        save_container.remove();
        // Remove from local storage
        removeFromStorage(input_box_topic_save.value);
    });
}



// Remove a note from localStorage
function removeFromStorage(topic) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note.topic !== topic);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}
