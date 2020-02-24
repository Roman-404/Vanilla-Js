const addUser = document.getElementById('add-user');
const table = document.getElementById('table');
const users = [
    {
        name: {
            name: 'name',
            value: 'Boris',
        },
        phone_number: {
            name: 'phone_number',
            value: '+7-495-592-10-66'
        }
    },
    {
        name: {
            name: 'name',
            value: 'John Smith'
        },
        phone_number: {
            name: 'phone_number',
            value: '+43-1234567890'
        }
    },
    {name: { name: 'name', value: 'Ellen Ripley' }, phone_number: { name: 'phone_number', value: '+880-123456789' }},
    {name: { name: 'name', value: 'R2-D2' }, phone_number: { name: 'phone_number', value: '+1268 12345678' }},
    {name: { name: 'name', value: 'Luke Skywalker' }, phone_number: { name: 'phone_number', value: '+1441-12345678' }}
];

window.onload = () => {
    users.forEach(user => createUser(user.name, user.phone_number))
};

addUser.onclick = event => {
    event.preventDefault()
    let user_name = document.getElementById('input_name_main')
    let phone_number = document.getElementById('input_phone_number_main')
    if (validate(user_name, phone_number)) {
        let form = document.querySelector('form')
        let user_name = form.elements['name'];
        let phone_number = form.elements['phone_number'];
        form.elements['name'].value = form.elements['phone_number'].value = createUser(user_name, phone_number)
    };
};

createItem = item => {
    let td = document.createElement('td')
    let element = document.createTextNode(item.value)
    td.id = td.className = item.name
    td.appendChild(element)
    return td;
};

createUser = (name, phone_number) => {
    let tr = document.createElement('tr')
    tr.appendChild(createItem(name))
    tr.appendChild(createItem(phone_number))
    tr.appendChild(createButton('edit'))
    tr.appendChild(createButton('del'))
    table.appendChild(tr)
    return null;
};

createButton = (value) => {
    let span = document.createElement('span')
    let element = document.createTextNode(value)
    span.className = value
    span.appendChild(element)
    return span;
};

table.onclick = event => {
    switch (event.target.className) {
        case 'del':
            event.target.parentNode.remove()
            break;
        case 'edit':
            let element = event.target.parentNode
            editMode = !element.classList.contains('editMode')
            if (onEdit(element)) {
                editMode ? event.target.innerText = 'save' : event.target.innerText = 'edit'
                element.classList.toggle('editMode')
            }
            else {
                element.classList.toggle('editMode')
            }
            break;
        default:
            break;
    };
};

onEdit = (element) => {
    let input_name = element.querySelector('.input_name_sub') ? element.querySelector('.input_name_sub') : document.createElement('input')
    let label_name = element.querySelector('#name')
    let input_phone_number = element.querySelector('.input_phone_number_sub') ? element.querySelector('.input_phone_number_sub') : document.createElement('input')
    let label_phone_number = element.querySelector('#phone_number')
    let isValid = handleFieldEdit(input_name, label_name, input_phone_number, label_phone_number)
    return isValid
};

updateLabel = (label, input) => {
    input.id = input.className = `input_${label.id}_sub`
    input.value += label.innerText
    label.innerText = null
    label.appendChild(input)
    input.focus()
}

saveLabel = (input, label) => {
    label.innerText = input.value
    input.value = null
}

handleFieldEdit = (input_name, label_name, input_phone_number, label_phone_number) => {
    if (editMode) {
        updateLabel(label_name, input_name)
        updateLabel(label_phone_number, input_phone_number)
    }
    else {
        if (validate(input_name, input_phone_number)) {
            saveLabel(input_name, label_name)
            saveLabel(input_phone_number, label_phone_number)
            return true
        }
        else {
            return false
        }
    };
    return true
};

validate = (user_name, phone_number) => {

    if (!user_name.value) {
        user_name.className = 'invalid'
        user_name.type = 'error'
        user_name.placeholder = 'Empty field!'
        return false
    }

    else if (!phone_number.value) {
        phone_number.className = 'invalid'
        phone_number.type = 'error'
        phone_number.placeholder = 'Empty field!'
        return false
    }
    else {
        re = /^\+?\d[\d\(\)\ -]{4,14}\d$/;
        if (!re.test(phone_number.value)) {
            phone_number.className = 'invalid'
            phone_number.type = 'error'
            output = 'Incorrect phone number format!'
            phone_number.classList.add('invalid');
            error.innerHTML = output
            return false
        }
    }

    phone_number.classList.remove('invalid');
    error.innerHTML = "";
    user_name.classList.remove('invalid')
    phone_number.classList.remove('invalid')
    user_name.type = phone_number.type = 'text'
    user_name.placeholder = 'Enter username'
    phone_number.placeholder = 'Enter phone number'
    return true
};