var treeHtml;
const innerClassStr = 'inner'
const liTree = 'liTree'

document.addEventListener('DOMContentLoaded', function () {
    // create tree and show root element
    treeHtml = document.getElementById('treeDeparts')
    let InstanceRoot = loadRootDepartment()
    let instanceRootId = showRootElement(InstanceRoot)

    // add listener to open branch
    let allLiInTree = document.getElementsByClassName(liTree)
    for(li of allLiInTree){
        li.addEventListener('click', (event) => openBranch(event))
    }

    // var details = document.querySelector('details')
    // details.addEventListener("toggle", function(event) {
    //     console.log("toggle")
    // })

    // change condition and icon
    document.addEventListener('click', function (event) {
        if (event.target.tagName.toUpperCase() == 'IMG' && event.target.classList.contains('treeImg')) {
            let entryHtml = event.target.parentElement
            let condition = entryHtml.lastElementChild.value
            let id = htmlGetId(event.target)
            changeConditionAndIcon(condition, id)
        }
    })

})

function openBranch(event){
    console.log('openBranch()')
    if(event.currentTarget.classList.contains('parent'))  {
        if(event.currentTarget.childNodes[0].childNodes.length == 1){
            let id = event.currentTarget.id
            let departs = loadChildren1(id)
            createBrunch(id, departs)
        }
    }   else {
        // li does not contains children
    }
}

function htmlGetId(elementHtml) {
    return elementHtml.id.slice(3)
}

function changeConditionAndIcon(currentCondition, id) {
    whichIcon(currentCondition, id)
    whichCondition(currentCondition, id)
}

function whichIcon(currentCondition, id) {
    if (currentCondition == 0) {
        changeIcon(id, 'treeIcons/add.png')
    } else if (currentCondition == 1) {
        changeIcon(id, 'treeIcons/delete.png')
    } else if (currentCondition == 2) {
        changeIcon(id, 'treeIcons/empty.gif')
    } else if (currentCondition == 3) {
        changeIcon(id, 'treeIcons/accept.png')
    }
}

function whichCondition(currentCondition, id) {
    if (currentCondition == 0) {
        changeCondition(id, 2)
    } else if (currentCondition == 1) {
        changeCondition(id, 3)
    } else if (currentCondition == 2) {
        changeCondition(id, 0)
    } else if (currentCondition == 3) {
        changeCondition(id, 1)
    }
}

function changeCondition(id, newCondition) {
    let realId = 'inputId' + id
    let input = document.getElementById(realId)
    input.value = newCondition
}

function changeIcon(id, src) {
    let realId = 'img' + id
    let img = document.getElementById(realId)
    img.src = src;
}

function buildEntry(department) {
    let defaultSrc = 'treeIcons/empty.gif'
    let entry = document.createElement('span')
    entry.classList.add('entry', innerClassStr)
    let img = document.createElement('img')
    img.src = defaultSrc
    img.id = 'img' + department.id
    img.classList.add('treeImg', innerClassStr)
    let text = document.createElement('span')
    text.classList.add(innerClassStr)
    text.innerText = crateText(department)
    let input = createInput(department)
    input.classList.add(innerClassStr)
    entry.appendChild(img)
    entry.appendChild(text)
    entry.appendChild(input)
    return entry;
}

function crateText(element) {
    return element.name + ' ' + element.number + ' ' + element.hasChildren
}

function createInput(department) {
    let input = document.createElement('input')
    input.value = department.condition
    input.name = 'inputId' + department.id
    input.id = 'inputId' + department.id
    input.setAttribute("type", "hidden");
    return input
}

function showRootElement(InstanceRoot) {
    let ul = createUl()
    ul.className = 'tree'
    let rootLi = createSubRoot(InstanceRoot)
    ul.appendChild(rootLi)
    treeHtml.appendChild(ul)
    return InstanceRoot.id
}

function createUl() {
    let ul = document.createElement('ul')
    return ul;
}

function createLi(instanseDepart) {
    let li = document.createElement('li')
    li.classList.add(liTree)
    li.id = instanseDepart.id
    return li;
}


function createBrunch(elementId, departs) {
    let parentLi = document.getElementById(elementId)
    let ul = createUl()
    departs.forEach(element => {
        let li
        if (isElementHasChildren(element)) {
            // create subRoot
            console.log("subRoot");
            
            li = createSubRoot(element)
        } else {
            //create simple li
            li = createNotRootElement(element);
        }
        if(li){
            ul.appendChild(li)
        }
    });
    parentLi.lastChild.lastChild.appendChild(ul)
}

function isElementHasChildren(element) {
    return element.hasChildren == true ? true : false;
}

function createSubRoot(instanseDepart) {
    let li = createLi(instanseDepart)
    li.classList.add('parent')
    let details = document.createElement('details')
    let summary = document.createElement('summary')
    summary.id = 'SUM' + instanseDepart.id
    let entryHtml = buildEntry(instanseDepart)
    summary.appendChild(entryHtml)
    details.appendChild(summary)
    li.appendChild(details)
    return li
}

function createNotRootElement(element) {
    let li = createLi(element)
    let entry = buildEntry(element)
    li.appendChild(entry)
    return li
}