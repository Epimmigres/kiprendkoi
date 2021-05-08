function createOnSubmit() {
    const eventObject = document.querySelector("#createForm").elements;
    console.log(eventObject);
    // event.preventDefault();
    return false;
}

function showEventModal(model) {
    const eventName = document.querySelector("#eventName").innerHTML
    // const eventDate = document.querySelector("#eventDate").children[0].innerHTML
    const eventLocation = document.querySelector("#eventLocation").children[0].innerHTML
    const eventDescription = document.querySelector("#eventDescription").children[0].innerHTML

    // const eventDate = '2000-02-23T12:34'

    document.body.innerHTML += `
        <div class="modal fade show" id="modalEvent">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modifier l'evenement</h5>
                        <button type="button" class="btn-close" onclick='removeModal()'></button>
                    </div>
                    <div class="modal-body">
                        <label>Nom</label>
                        <input id="eventNameInput" type="text" class="form-control" placeholder="Nom de l'evenement" value="${eventName}"/>
                        <label>Date</label>
                        <input id="eventDateInput" type="datetime-local" class="form-control" placeholder="Date de l'evenement" value=${eventDate} />
                        <label>Localisation</label>
                        <input id="eventLocalisationInput" type="text" class="form-control" placeholder="Localisation de l'evenement" value="${eventLocation}"/>
                        <label>Description</label>
                        <textarea id="eventDescriptionInput" rows="3" class="form-control" placeholder="Description de l'evenement">${eventDescription}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick='removeModal()'>Fermer</button>
                        <button type="button" class="btn btn-primary" onclick='editEvent(${model})'>Sauvegarder</button>
                    </div>
                </div>
            </div>
        </div>
`
    }

// <input id="eventDateInput" type="datetime-local" class="form-control" placeholder="Date de l'evenement" value=${eventDate} />

function editEvent(model) {
    const eventName = document.querySelector("#eventNameInput").value
    const eventLocation = document.querySelector("#eventLocalisationInput").value
    const eventDescription = document.querySelector("#eventDescriptionInput").value

    model.name = eventName;
    model.description = eventDescription;
    model.location = eventLocation;

    if (eventName == "") {
        alert("Le champ Nom ne doit pas être vide !");
        return;
    }

    const options = {
        method: "PATCH",
        body: JSON.stringify(model),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`/api/EventAPI/${model.id}`, options)
        .then(() => {
            removeModal();
            document.querySelector("#eventName").innerHTML = eventName;
            document.querySelector("#eventLocation").children[0].innerHTML = eventLocation;
            document.querySelector("#eventDescription").children[0].innerHTML = eventDescription;
        })
}

function removeModal() {
    document.querySelector("#modalEvent").remove();
}

    function appendNewCategory(eventId) {
        // TODO: Save button ?
        const name = document.getElementById("categoryInput").value;
        if (name.length == 0) {
            alert('Veuillez renseigner un nom pour votre categorie')
            return;
        }
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
                            <button type="button" class="btn btn-light" onclick="editCategory(this)">Éditer</button>
                            <button type="button" class="btn btn-light" onclick="deleteCategory(this, ${res.Id})">Supprimer</button>
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
        const inputValue = buttonNode.parentNode.parentNode.children[0].value;
        if (inputValue.length === 0) {
            alert('Veuillez renseigner un nom pour votre categorie')
            return ;
        }

        const buttonList = buttonNode.parentNode.children;

        buttonList[0].style = "display: inline";
        buttonList[1].style = "display: inline";
        buttonList[2].style = "display: none";
        buttonList[3].style = "display: none";

        const categoryObject = (typeof category == 'string') ? JSON.parse(category) : category;

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
        fetch(`/api/ItemAPI/${itemId}`, {
            method: "DELETE"
        })
            .then(() => buttonNode.parentNode.parentNode.remove())
    }

    function editItem(buttonNode, item) {
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

        if (quiInputValue.length === 0 || quoiInputValue.length === 0 || quantityInputValue.length === 0) {
            alert('Veuillez renseigner les champs manquants');
            return;
        }

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
                            <button type="button" class="btn btn-light" onclick='editItem(this, ${JSON.stringify(res)})'>Éditer</button>
                            <button type="button" class="btn btn-light" onclick="deleteItem(this, ${res.id})">Supprimer</button>
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
        const quiInputValue = buttonNode.parentNode.parentNode.children[0].children[0].value;
        const quoiInputValue = buttonNode.parentNode.parentNode.children[0].children[1].value;
        const quantityInputValue = buttonNode.parentNode.parentNode.children[0].children[2].value;

        if (quiInputValue.length === 0 || quoiInputValue.length === 0 || quantityInputValue.length === 0) {
            alert('Veuillez renseigner les champs manquants');
            return;
        }

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
                            <button type="button" class="btn btn-light" onclick='editItem(this, ${JSON.stringify(res)})'>Éditer</button>
                            <button type="button" class="btn btn-light" onclick="deleteItem(this, ${res.id})">Supprimer</button>
                        </div>

                    </div>
                `);
                buttonNode.parentNode.parentNode.remove();
            })
    }
