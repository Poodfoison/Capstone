let contacts = [];

const addContact = (ev) => {
    ev.preventDefault();
    let contact = {
        name: document.getElementById('fname').value,
        email: document.getElementById('email').value,
        number: document.getElementById('contact').value,
        message: document.getElementById('message').value,
    };

    console.table(contact);
    contacts.push(contact);
    document.getElementById("myForm").reset();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addContact)
})