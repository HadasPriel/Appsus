import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'

const KEY_KEEPS = 'keepsDB'
export const keepService = {
    query,
  
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
            type: 'NoteText',
            isPinned: true,
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            type: 'NoteImg',
            info: {
                url: 'http://some-img/me',
                title: 'Me playing Mi'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            type: 'NoteTodos',
            info: {
                label: 'How was it:',
                todos: [
                    { txt: 'Do that', doneAt: null },
                    { txt: 'Do this', doneAt: 187111111 }
                ]
            }
        }

    ];
    return keeps;
}