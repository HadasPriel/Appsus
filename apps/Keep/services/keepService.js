import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'

const KEY_KEEPS = 'keepsDB'
export const keepService = {
    query,
    remove
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
                url: '../apps/Keep/assets/img/flower.png',
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
                url: '../apps/Keep/assets/img/2021.png',
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

function _add(type) {
    const keepToAdd = {
        id: utilService.makeId(),
        ...type
    };
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

function getById(keepId) {
    const keep = gKeeps.find(keep => keep.id === keepId);
    return Promise.resolve(keep);
}