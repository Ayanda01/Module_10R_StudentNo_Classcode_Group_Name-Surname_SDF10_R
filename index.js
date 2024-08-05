import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const appSettings = {
    databaseURL: "https://mobile-app-a9fd7-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

// Function to clear input field
function clearInputEl() {
    inputFieldEl.value = "";
}

// Function to append an item to the shopping list
function appendItemToShoppingListEl(item) {
    const itemID = item[0];
    const itemValue = item[1];

    const newEl = document.createElement("li");
    newEl.textContent = itemValue;

    shoppingListEl.append(newEl);
}

// Function to render the shopping list
function renderShoppingList(snapshot) {
    shoppingListEl.innerHTML = ""; // Clear the list before updating

    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val());

        itemsArray.forEach(item => {
            appendItemToShoppingListEl(item);
        });
    } else {
        shoppingListEl.innerHTML = "<li>No items in list... yet</li>";
    }
}

// Add button click event listener
addButtonEl.addEventListener("click", function() {
    const inputValue = inputFieldEl.value.trim();

    if (inputValue) {
        push(shoppingListInDB, inputValue);
        clearInputEl();
    }
});

// Firebase onValue listener
onValue(shoppingListInDB, renderShoppingList);
