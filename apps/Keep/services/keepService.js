import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'

const KEY_KEEPS = 'keepsDB'
export const keepService = {
    query,
    remove,
    getTemplateKeep,
    turnToToDos,
    getKeepById,
    add,
    update,
    addTodo,
    updateTodo,
    deleteTodo,
    getMail,
    turnToEmbedeVideo,
    turnToYouTubeVideo
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
            id: utilService.makeId(),
            type: 'NoteText',
            isPinned: true,
            info: {
                txt: 'Google - Best Friend I never had!'
            },
            style: {
                backgroundColor: '#E0BBE4'
            }
        },
        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/289323/pexels-photo-289323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                title: 'Air'
            },
            style: {
                backgroundColor: '#957DAD'
            }
        },
        {
            id: utilService.makeId(),
            type: 'NoteTodos',
            info: {
                label: 'How was it:',
                todos: [
                    { id: utilService.makeId(), txt: 'Do that', doneAt: null },
                    { id: utilService.makeId(), txt: 'Do this', doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: '#D291BC'
            }
        },

        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_1280.jpg',
                title: 'Purple Rulezzz'
            },
            style: {
                backgroundColor: '#FEC8D8'
            },

        },

        {
            id: utilService.makeId(),
            type: 'NoteTodos',
            info: {
                label: 'How was it:',
                todos: [
                    { id: utilService.makeId(), txt: 'Hadas studies', doneAt: null },
                    { id: utilService.makeId(), txt: 'Buzz sleeps', doneAt: 187111111 },
                    { id: utilService.makeId(), txt: 'Buzz woke up', doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: '#FFDFD3'
            }
        },
        {
            id: utilService.makeId(),
            type: 'NoteVideo',
            info: {
                url: 'https://www.youtube.com/embed/sdDGBF5jW6A',
                title: 'Puppy'
            },
            style: {
                backgroundColor: '#FEC8D8'
            },

        },

        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/6027785/pexels-photo-6027785.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                title: 'Happy New Year'
            },
            style: {
                backgroundColor: '#957DAD'
            }
        },
        {
            id: utilService.makeId(),
            type: 'NoteText',
            isPinned: true,
            info: {
                txt: 'How to CSS?'
            },
            style: {
                backgroundColor: '#E0BBE4'
            }
        },

        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'New Year'
            },
            style: {
                backgroundColor: '#957DAD'
            }
        },

        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/3397935/pexels-photo-3397935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                title: 'Me after this weekend'
            },
            style: {
                backgroundColor: '#957DAD'
            }
        },

        {
            id: utilService.makeId(),
            type: 'NoteImg',
            info: {
                url: 'https://images.pexels.com/photos/1882309/pexels-photo-1882309.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
                title: 'Happy Moments'
            },
            style: {
                backgroundColor: '#957DAD'
            }
        },

    ];
    return keeps;
}


function add(keep) {
    const keepToAdd = {
        id: utilService.makeId(),
        ...keep
    };

    if (keepToAdd.type === 'NoteTodos') {
        keepToAdd.info.todos = turnToToDos(keepToAdd.info.todos)
    }
    if (keepToAdd.type === 'NoteVideo') {
        keepToAdd.info.url = turnToEmbedeVideo(keepToAdd.info.url)
    }
    gKeeps = [keepToAdd, ...gKeeps];
    _saveKeepsToStorage();
    return Promise.resolve(keepToAdd);
}

function addTodo(txt, keepId) {
    const todoAdd = {
        id: utilService.makeId(),
        doneAt: null,
        txt: txt
    };
    const keepsCopy = [...gKeeps];
    const keepToUpdate = { ...keepsCopy.find(keep => keep.id === keepId) }
    const keepToUpdateIdx = keepsCopy.findIndex(keep => keep.id === keepToUpdate.id);
    keepToUpdate.info.todos = [...keepToUpdate.info.todos, todoAdd]
    keepsCopy[keepToUpdateIdx] = keepToUpdate;
    gKeeps = keepsCopy;
    _saveKeepsToStorage();
    return Promise.resolve(keepToUpdate);
}

function updateTodo(todo, keepId) {
    const todoToUpdate = { ...todo }
    const keepsCopy = [...gKeeps];
    const keepToUpdate = { ...keepsCopy.find(keep => keep.id === keepId) }
    const keepToUpdateIdx = keepsCopy.findIndex(keep => keep.id === keepToUpdate.id);
    const todosToUpdate = [...keepToUpdate.info.todos]
    const todoToUpdateIdx = todosToUpdate.findIndex(todo => todo.id === todoToUpdate.id);
    todosToUpdate[todoToUpdateIdx] = todoToUpdate
    keepsCopy[keepToUpdateIdx].info.todos = [...todosToUpdate]
    gKeeps = keepsCopy;
    _saveKeepsToStorage();
    return Promise.resolve(keepToUpdate);
}

function deleteTodo(todo, keepId) {
    const todoToDelete = { ...todo }
    const keepsCopy = [...gKeeps];
    const keepToUpdate = { ...keepsCopy.find(keep => keep.id === keepId) }
    const keepToUpdateIdx = keepsCopy.findIndex(keep => keep.id === keepToUpdate.id);
    const todosToUpdate = [...keepToUpdate.info.todos]
    const cleanTodos = todosToUpdate.filter(todo => todo.id !== todoToDelete.id)
    keepsCopy[keepToUpdateIdx].info.todos = [...cleanTodos]
    gKeeps = keepsCopy;
    _saveKeepsToStorage();
    return Promise.resolve(keepToUpdate);

}

function update(keep) {
    const keepToUpdate = {
        ...keep
    };
    const keepsCopy = [...gKeeps];
    const keepIdx = keepsCopy.findIndex(keep => keep.id === keepToUpdate.id);
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
                    },
                    style: {
                        backgroundColor: '#FFDFD3'
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
                        backgroundColor: '#FFDFD3'
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
                    },
                    style: {
                        backgroundColor: '#FFDFD3'
                    }
                },
                wellcomeMsg: 'Enter comma separated list',
                key: 'todos'
            }
            )
        case 'NoteVideo':
            return Promise.resolve({
                keep: {
                    type: 'NoteVideo',
                    info: {
                        url: '',
                        title: 'Video'
                    },
                    style: {
                        backgroundColor: '#FFDFD3'
                    }
                },
                wellcomeMsg: 'Enter YouTube URL',
                key: 'url'
            })
    }


}


function turnToToDos(input) {
    let todos = input.split(',')
    console.log(todos)
    let todosAsObj = todos.map(todo => {
        return {
            id: utilService.makeId(),
            txt: todo,
            doneAt: null
        }
    })
    console.log(todosAsObj)
    return todosAsObj
}


function turnToEmbedeVideo(input) {
    const embedUrl = 'https://www.youtube.com/embed/'
    const userUrl = input.slice(input.indexOf('=') + 1)
    const urlToUse = embedUrl + userUrl
    return urlToUse
}

function turnToYouTubeVideo(input) {
    const embedUrl = 'https://www.youtube.com/watch?v='
    const userUrl = input.slice(input.lastIndexOf('/') + 1)
    const urlToUse = embedUrl + userUrl
    return urlToUse
}

function getMail(mail) {
    const keepToAdd = {
        id: utilService.makeId(),
        type: 'NoteText',
        info: {
            txt: `${mail.subject}  ${mail.body}`
        },
        style: {
            backgroundColor: '#FFDFD3'
        }

    }

    gKeeps = [keepToAdd, ...gKeeps];
    _saveKeepsToStorage();

}
