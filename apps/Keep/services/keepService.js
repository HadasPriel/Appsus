import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'

const KEY_KEEPS = 'keepsDB'
export const keepService = {
    query,
    remove,
    getTemplateKeep,
    save,
    turnToToDos,
    getKeepById
};
var gKeeps;
_createKeeps();

function _createKeeps() {
    gKeeps = storageService.load(KEY_KEEPS);
    if (!gKeeps || !gKeeps.length) {
        gKeeps = _getDemoKeeps()
        _saveKeepsToStorage();
    }
}


function query() {
    return Promise.resolve(gKeeps);
}


function _saveKeepsToStorage() {
    storageService.save(KEY_KEEPS, gKeeps)
}

function _getDemoKeeps() {
    const keeps = [

        {
            id: 'i352224',
            type: 'NoteText',
            isPinned: true,
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'i774724',
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/289323/pexels-photo-289323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                title: 'Me playing Mi'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'i654524',
            type: 'NoteTodos',
            info: {
                label: 'How was it:',
                todos: [
                    { txt: 'Do that', doneAt: null },
                    { txt: 'Do this', doneAt: 187111111 }
                ]
            }
        },

        {
            id: 'i452524',
            type: 'NoteImg',
            info: {
                url: 'https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_1280.jpg',
                title: 'Me playing Mi'
            },
            style: {
                backgroundColor: '#00d'
            }
        },

        {
            id: 'i654574',
            type: 'NoteTodos',
            info: {
                label: 'How was it:',
                todos: [
                    { txt: 'Hadas studies', doneAt: null },
                    { txt: 'Buzz sleeps', doneAt: 187111111 },
                    { txt: 'Buzz woke up', doneAt: 187111111 }
                ]
            }
        }

    ];
    return keeps;
}



function save(keep) {
 
    if (keep.id) {
        return _update(keep);
    } else {
        return _add(keep);
    }
}

function _add(keep) {
    
    const keepToAdd = {
        id: utilService.makeId(),
        ...keep
    };

    if (keepToAdd.type === 'NoteTodos'){
        keepToAdd.info.todos= turnToToDos(keepToAdd.info.todos)
    }
    gKeeps = [keepToAdd, ...gKeeps];
    _saveKeepsToStorage();
    return Promise.resolve(keepToAdd);
}

function _update(keep) {
    const keepToUpdate = {
        ...keep
    };
    const keepsCopy = [...gKeeps];
    const keepIdx = keepsCopy.findIndex(keep => keep.id === keep.id);
    keepsCopy[keepIdx] = keepToUpdate;
    gKeeps = keepsCopy;
    _saveKeepsToStorage();
    return Promise.resolve(keepToUpdate);
}

function remove(keepId) {
    gKeeps = gKeeps.filter(keep => keep.id !== keepId);
    _saveKeepsToStorage();
    return Promise.resolve();
}

function getKeepById(keepId) {
    const keep = gKeeps.find(keep => keep.id === keepId);
    return Promise.resolve(keep);
}

function getTemplateKeep(type) {

    switch (type) {
        case 'NoteText':
            return Promise.resolve({
                keep: {
                    type: 'NoteText',
                    info: {
                        txt: ''
                    }
                },
                wellcomeMsg: 'What is on your mind',
                key: 'txt'
            })
        case 'NoteImg':
            return Promise.resolve({
                keep: {
                    type: 'NoteImg',
                    info: {
                        url: '',
                        title: 'Image'
                    },
                    style: {
                        backgroundColor: '#00d'
                    }
                },
                wellcomeMsg: 'Enter image URL',
                key: 'url'
            })
        case 'NoteTodos':
            return Promise.resolve({
                keep: {
                    type: 'NoteTodos',
                    info: {
                        label: 'List',
                        todos: []
                    }
                },
                wellcomeMsg: 'Enter comma separated list',
                key: 'todos'
            }
            )
    }


}


function turnToToDos(input) {
    let todos = input.split(',')
    console.log(todos)
    let todosAsObj = todos.map(todo => {
        return {
            txt: todo,
            doneAt: null
        }
    })
    console.log(todosAsObj)
    return todosAsObj
}