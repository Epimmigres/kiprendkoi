    function appendNewCategory(eventId) {
        // TODO: Save button ?
        const name = document.getElementById("categoryInput").value;
        if (name.length == 0)
            return;
        const category = { name: name, eventId: eventId };
        const options = {
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // TODO; Catch error and alert user
        fetch("/api/CategoryAPI", options)
            .then(res => res.json())
            .then(res => {
                const test = JSON.stringify(res);
                document.getElementById("categoryInput").value = "";
                document.querySelector(".categories-container").innerHTML += `
                <div>
                    <div class="alert alert-primary category-container">
                        <h3>${name}</h3>
                        <div>
                            <button type="button" class="btn btn-light" onclick="editCategory(this)">Edit</button>
                            <button type="button" class="btn btn-light" onclick="deleteCategory(this, ${res.Id})">Delete</button>
                            <button type="button" class="btn btn-light" onclick='saveCategory(this, ${test})' style="display: none">Sauvegarder</button>
                            <button type="button" class="btn btn-light" onclick="cancelEditCategory(this)" style="display: none">Annuler</button>
                        </div>
                    </div>
                    <div class="items-container">
                        <button type="button" class="btn btn-primary" onclick="appendNewItem(this, ${res.id})">+</button>
                    </div>
                </div>`
            })
        
    }

    function deleteCategory(buttonNode, categoryId) {
        // TODO: Catch error and alert user
        fetch(`/api/CategoryAPI/${categoryId}`, {
            method: "DELETE"
        })
            .then(() => buttonNode.parentNode.parentNode.parentNode.remove());
    }

    function editCategory(buttonNode) {
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

    function saveCategory(buttonNode, category) {
        const buttonList = buttonNode.parentNode.children;

        buttonList[0].style = "display: inline";
        buttonList[1].style = "display: inline";
        buttonList[2].style = "display: none";
        buttonList[3].style = "display: none";

        const categoryObject = (typeof category == 'string') ? JSON.parse(category) : category;

        const inputValue = buttonNode.parentNode.parentNode.children[0].value;
        categoryObject.name = inputValue;
        const options = {
            method: 'PATCH',
            body: JSON.stringify(categoryObject),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // TODO: Catch Error and Alert User
        fetch(`/api/CategoryAPI/${categoryObject.id}`, options)
            .then(() => {
                buttonNode.parentNode.parentNode.children[0].remove();
                buttonNode.parentNode.parentNode.children[0].style = "display: block";

                buttonNode.parentNode.parentNode.children[0].innerHTML = inputValue;
            })
        
    }

    function deleteItem(buttonNode, itemId) {
        // TODO: Catch Fetch Error
        fetch(`/api/ItemAPI/${itemId}`, {
            method: "DELETE"
        })
            .then(() => buttonNode.parentNode.parentNode.remove())
    }

    function editItem(buttonNode, item) {
        // TODO: Take the id as a parameter and call the API
        const who = buttonNode.parentNode.parentNode.children[0].children[0].children[0].innerHTML;
        const what = buttonNode.parentNode.parentNode.children[0].children[1].children[0].innerHTML;
        const quantity = buttonNode.parentNode.parentNode.children[0].children[2].children[0].innerHTML;

        buttonNode.parentNode.parentNode.insertAdjacentHTML('beforebegin', `
            <div class="alert alert-light item-container">
                <div style="display: flex">
                    <input type="text" class="form-control" value="${who}" placeholder="Qui"/>
                    <input type="text" class="form-control" value="${what}" placeholder="Quoi"/>
                    <input id="combien" type="number" class="form-control" value="${quantity}" placeholder="Combien" />
                </div>
                <div>
                    <button type="button" class="btn btn-light" onclick='saveEditItem(this, ${JSON.stringify(item)})'>Sauvegarder</button>
                    <button type="button" class="btn btn-light" onclick="cancelEditItem(this)">Annuler</button>
                </div>
            </div>
        `);

        buttonNode.parentNode.parentNode.style = "display: none;";

}

    function saveEditItem(buttonNode, item) {
        const quiInputValue = buttonNode.parentNode.parentNode.children[0].children[0].value;
        const quoiInputValue = buttonNode.parentNode.parentNode.children[0].children[1].value;
        const quantityInputValue = buttonNode.parentNode.parentNode.children[0].children[2].value;

        const itemObject = (typeof item == 'string') ? JSON.parse(item) : item;

        itemObject.who = quiInputValue;
        itemObject.what = quoiInputValue;
        itemObject.quantity = quantityInputValue;

        const options = {
            method: 'PATCH',
            body: JSON.stringify(itemObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`/api/ItemAPI/${itemObject.id}`, options)
            .then(res => res.json())
            .then(res => {
                buttonNode.parentNode.parentNode.nextElementSibling.remove();
                buttonNode.parentNode.parentNode.insertAdjacentHTML('beforebegin', `
                    <div class="alert alert-light item-container">
                        <div>
                            <div>
                                Qui: <span>${quiInputValue}</span>
                            </div>
                            <div>
                                Quoi: <span>${quoiInputValue}</span>
                            </div>
                            <div>
                                Quantité: <span>${quantityInputValue}</span>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-light" onclick='editItem(this, ${JSON.stringify(res)})'>Edit</button>
                            <button type="button" class="btn btn-light" onclick="deleteItem(this, ${res.id})">Delete</button>
                        </div>

                    </div>
                `);
                buttonNode.parentNode.parentNode.remove();
            })
    }

    function cancelEditItem(buttonNode) {
        const nextNode = buttonNode.parentNode.parentNode.nextElementSibling
        buttonNode.parentNode.parentNode.remove();
        nextNode.style = "display: flex;";
    }

    function deleteNewItem(buttonNode) {
        buttonNode.parentNode.parentNode.remove();
    }

    function appendNewItem(buttonNode, categoryId) {
        // TODO: Remove button Node

        buttonNode.insertAdjacentHTML('beforebegin', `
            <div class="alert alert-light item-container">
                <div style="display: flex">
                    <input id="categoryInput" type="text" class="form-control" placeholder="Qui" />
                    <input id="categoryInput" type="text" class="form-control" placeholder="Quoi" />
                    <input id="categoryInput" type="number" class="form-control" placeholder="Combien" />
                </div>
                <div>
                    <button type="button" class="btn btn-light" onclick="saveNewItem(this, ${categoryId})">Sauvegarder</button>
                    <button type="button" class="btn btn-light" onclick="deleteNewItem(this)">Annuler</button>
                </div>
            </div>
        `);
    }

    function saveNewItem(buttonNode, categoryId) {
        // TODO: Take the id as a parameter and call the API
        // TODO: Show again the add item button
        // TODO: Handle the number of item

        const quiInputValue = buttonNode.parentNode.parentNode.children[0].children[0].value;
        const quoiInputValue = buttonNode.parentNode.parentNode.children[0].children[1].value;
        const quantityInputValue = buttonNode.parentNode.parentNode.children[0].children[2].value;

        const itemObject = { "who": quiInputValue, "what": quoiInputValue, "quantity": quantityInputValue, "categoryId": categoryId };
        const options = {
            method: 'POST',
            body: JSON.stringify(itemObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("/api/ItemAPI/", options)
            .then(res => res.json())
            .then(res => {
                buttonNode.parentNode.parentNode.insertAdjacentHTML('beforebegin', `
                    <div class="alert alert-light item-container">
                        <div>
                            <div>
                                Qui: <span>${quiInputValue}</span>
                            </div>
                            <div>
                                Quoi: <span>${quoiInputValue}</span>
                            </div>
                            <div>
                                Quantité: <span>${quantityInputValue}</span>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-light" onclick='editItem(this, ${JSON.stringify(res)})'>Edit</button>
                            <button type="button" class="btn btn-light" onclick="deleteItem(this, ${res.id})">Delete</button>
                        </div>

                    </div>
                `);
                buttonNode.parentNode.parentNode.remove();
            })
    }
