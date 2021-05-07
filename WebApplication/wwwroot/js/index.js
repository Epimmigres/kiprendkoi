    function appendNewCategory() {
        // TODO: Save button ?
        const name = document.getElementById("categoryInput").value;
        if (name.length == 0)
            return ;
        document.getElementById("categoryInput").value = "";
        document.querySelector(".categories-container").innerHTML += `
            <div>
                <div class="alert alert-primary category-container">
                    <h3>${name}</h3>
                    <div>
                        <button type="button" class="btn btn-light" onclick="editCategory(this)">Edit</button>
                        <button type="button" class="btn btn-light" onclick="deleteCategory(this)">Delete</button>
                        <button type="button" class="btn btn-light" onclick="saveCategory(this)" style="display: none">Sauvegarder</button>
                        <button type="button" class="btn btn-light" onclick="cancelEditCategory(this)" style="display: none">Annuler</button>
                    </div>
                </div>
                <div class="items-container">
                    <button type="button" class="btn btn-primary" onclick="appendNewItem(this)">+</button>
                </div>
            </div>`
    }

    function deleteCategory(buttonNode) {
        // TODO: Take the id as a parameter and call the API
        buttonNode.parentNode.parentNode.parentNode.remove();
    }

    function editCategory(buttonNode, test) {
        console.log(test);
        const buttonList = buttonNode.parentNode.children;

        buttonList[0].style = "display: none";
        buttonList[1].style = "display: none";
        buttonList[2].style = "display: inline";
        buttonList[3].style = "display: inline";

        const categoryName = buttonNode.parentNode.parentNode.children[0].innerHTML;
        buttonNode.parentNode.parentNode.children[0].style = "display: none";
        buttonNode.parentNode.parentNode.insertAdjacentHTML('afterbegin', `
            <input type="text" class="form-control" placeholder="${categoryName}" />
        `);

        buttonNode.parentNode.parentNode.children[0].value = categoryName;
    }

    function cancelEditCategory(buttonNode) {
        const buttonList = buttonNode.parentNode.children;

        buttonList[0].style = "display: inline";
        buttonList[1].style = "display: inline";
        buttonList[2].style = "display: none";
        buttonList[3].style = "display: none";

        buttonNode.parentNode.parentNode.children[0].remove();
        buttonNode.parentNode.parentNode.children[0].style = "display: block";
    }

    function saveCategory(buttonNode) {
        // TODO: Take the id as a parameter and call the API

        const buttonList = buttonNode.parentNode.children;

        buttonList[0].style = "display: inline";
        buttonList[1].style = "display: inline";
        buttonList[2].style = "display: none";
        buttonList[3].style = "display: none";

        const inputValue = buttonNode.parentNode.parentNode.children[0].value;
        buttonNode.parentNode.parentNode.children[0].remove();
        buttonNode.parentNode.parentNode.children[0].style = "display: block";

        buttonNode.parentNode.parentNode.children[0].innerHTML = inputValue;
    }

    function deleteItem(buttonNode) {
        // TODO: Take the id as a parameter and call the API
        buttonNode.parentNode.parentNode.remove();
    }

    function editItem(buttonNode) {
        // TODO: Take the id as a parameter and call the API

    }

    function deleteNewItem(buttonNode) {
        buttonNode.parentNode.parentNode.remove();
    }

    function appendNewItem(buttonNode) {
        // TODO: Remove button Node

        buttonNode.insertAdjacentHTML('beforebegin', `
            <div class="alert alert-light item-container">
                <div style="display: flex">
                    <input id="categoryInput" type="text" class="form-control" placeholder="Qui" />
                    <input id="categoryInput" type="text" class="form-control" placeholder="Quoi" />
                    <input id="categoryInput" type="number" class="form-control" placeholder="Combien" />
                </div>
                <div>
                    <button type="button" class="btn btn-light" onclick="saveNewItem(this)">Sauvegarder</button>
                    <button type="button" class="btn btn-light" onclick="deleteNewItem(this)">Annuler</button>
                </div>
            </div>
        `);
    }

    function saveNewItem(buttonNode) {
        // TODO: Take the id as a parameter and call the API
        // TODO: Show again the add item button
        // TODO: Handle the number of item

        const quiInputValue = buttonNode.parentNode.parentNode.children[0].children[0].value;
        const quoiInputValue = buttonNode.parentNode.parentNode.children[0].children[1].value;
        
        buttonNode.parentNode.parentNode.insertAdjacentHTML('beforebegin', `
                    <div class="alert alert-light item-container">
                        <div>
                            <div>
                                Qui: <span>${quiInputValue}</span>
                            </div>
                            <div>
                                Quoi: <span>${quoiInputValue}</span>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-light">Edit</button>
                            <button type="button" class="btn btn-light" onclick="deleteItem(this)">Delete</button>
                        </div>

                    </div>
        `);

        buttonNode.parentNode.parentNode.remove();
    }
