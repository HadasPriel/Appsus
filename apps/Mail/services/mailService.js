import { utilService } from '../../../services/utilService.js';
import { storageService } from '../../../services/storageService.js';

export const mailService = {
    query,
    remove,
    getById,
    getNextPrev,
    markAsRead,
    toggleMark,
    getReadPercentage,
    save,
    getKeep
}

const KEY = 'mailStorage'

var gMails
_createMails()

function _createMails() {
    // Try loading from localStorage
    gMails = storageService.load(KEY)
    if (!gMails || !gMails.length) {
        // Nothing in localStorage, use demo data
        gMails = _getDemoMails()
        _saveMailsToStorage()
    }
}

function query() {
    return Promise.resolve(gMails)
}

function remove(mailId) {
    gMails = gMails.filter(mail => mail.id !== mailId)
    _saveMailsToStorage()
    return Promise.resolve()
}

function getById(mailId) {
    const mail = gMails.find(mail => mail.id === mailId);
    return Promise.resolve(mail);
}

function getNextPrev(mailId, diff) {
    const mailIndex = gMails.findIndex(mail => mail.id === mailId);
    let nextPrevIndex = mailIndex + diff
    if (nextPrevIndex < 0) nextPrevIndex = gMails.length - 1
    if (nextPrevIndex === gMails.length) nextPrevIndex = 0

    return Promise.resolve(gMails[nextPrevIndex])
}

function markAsRead(mailId) {
    const mailsCopy = [...gMails]
    const mailIndex = gMails.findIndex(mail => mail.id === mailId);
    mailsCopy[mailIndex].isRead = true
    gMails = mailsCopy
    _saveMailsToStorage()
}

function toggleMark(mailId) {
    const mailsCopy = [...gMails]
    const mailIndex = gMails.findIndex(mail => mail.id === mailId);
    mailsCopy[mailIndex].isRead = !mailsCopy[mailIndex].isRead
    gMails = mailsCopy
    _saveMailsToStorage()
    return Promise.resolve()
}

function getReadPercentage() {
    const readMails = gMails.filter(mail => mail.isRead === true)
    return Promise.resolve(Math.round(readMails.length / gMails.length * 100))
}

function save(mail) {
    const mailToAdd = {
        id: utilService.makeId(),
        isReas: false,
        sentAt: Date.now(),
        ...mail
    };
    gMails = [mailToAdd, ...gMails];
    _saveMailsToStorage();
}

function getKeep(keep) {
    var newKeep = {
        id: utilService.makeId(),
        isReas: false,
        sentAt: Date.now(),
        subject: 'E-MAIL From Keeps ' + keep.title,
        body: keep.body
    }
    gMails = [newKeep, ...gMails];
    _saveMailsToStorage();
}

function _saveMailsToStorage() {
    storageService.save(KEY, gMails)
}



function _getDemoMails() {
    const mails = [{
            id: utilService.makeId(),
            subject: 'Good morning',
            body: 'I just called to say I love you, I just called to say how much I care, I do, I just called to say I love you, And I mean it from the bottom of my heart, I just called to say I love you, I just called to say how much I care, I do, I just called to say I love you, And I mean it from the bottom of my heart, I just called to say I love you, I just called to say how much I care, I do, I just called to say I love you, And I mean it from the bottom of my heart ',
            isRead: true,
            sentAt: 1551133930594
        },
        { id: utilService.makeId(), subject: 'Hurry up!!', body: 'Sprint 3 is here', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'dear puki', body: 'I will always remember you', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'Important task', body: 'Let me know when it\'s done!', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Annual Board Meeting', body: 'Please confirm your arrival', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'SUMMER SALE!', body: 'no mail box without spam, right? so to make coogle look realistic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis lacus, rutrum ac neque ut, porta hendrerit orci. Ut posuere aliquet metus, nec varius leo viverra sed. Vestibulum ipsum tortor, pharetra nec suscipit non, iaculis sit amet augue. Donec erat risus, lacinia imperdiet iaculis vitae, fringilla sed turpis. Nunc scelerisque vel libero sed vehicula. Nam ornare pretium nisl accumsan malesuada. Pellentesque non leo dictum, pretium tortor non, molestie turpis. Duis et purus ligula. Quisque vitae faucibus sapien, consectetur rutrum nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consectetur est scelerisque eros convallis euismod. Nam iaculis porta urna in vestibulum. Class aptent taciti sociosqu ad litora', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'hello world', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Dropbox', body: 'and 49 others made changes in your shared folders', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'A first-party GitHub', body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. Visit https://github.com/settings/connections/applications/0120e057bd645470c1ed for more information.', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Important task', body: 'Let me know when it\'s done!', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Annual Board Meeting', body: 'Please confirm your arrival', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'SUMMER SALE!', body: 'no mail box without spam, right? so to make coogle look realistic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis lacus, rutrum ac neque ut, porta hendrerit orci. Ut posuere aliquet metus, nec varius leo viverra sed. Vestibulum ipsum tortor, pharetra nec suscipit non, iaculis sit amet augue. Donec erat risus, lacinia imperdiet iaculis vitae, fringilla sed turpis. Nunc scelerisque vel libero sed vehicula. Nam ornare pretium nisl accumsan malesuada. Pellentesque non leo dictum, pretium tortor non, molestie turpis. Duis et purus ligula. Quisque vitae faucibus sapien, consectetur rutrum nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consectetur est scelerisque eros convallis euismod. Nam iaculis porta urna in vestibulum. Class aptent taciti sociosqu ad litora', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'hello world', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Dropbox', body: 'and 49 others made changes in your shared folders', isRead: true, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'A first-party GitHub', body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. Visit https://github.com/settings/connections/applications/0120e057bd645470c1ed for more information.', isRead: false, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Important task', body: 'Let me know when it\'s done!', isRead: true, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Annual Board Meeting', body: 'Please confirm your arrival', isRead: true, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'SUMMER SALE!', body: 'no mail box without spam, right? so to make coogle look realistic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis lacus, rutrum ac neque ut, porta hendrerit orci. Ut posuere aliquet metus, nec varius leo viverra sed. Vestibulum ipsum tortor, pharetra nec suscipit non, iaculis sit amet augue. Donec erat risus, lacinia imperdiet iaculis vitae, fringilla sed turpis. Nunc scelerisque vel libero sed vehicula. Nam ornare pretium nisl accumsan malesuada. Pellentesque non leo dictum, pretium tortor non, molestie turpis. Duis et purus ligula. Quisque vitae faucibus sapien, consectetur rutrum nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consectetur est scelerisque eros convallis euismod. Nam iaculis porta urna in vestibulum. Class aptent taciti sociosqu ad litora', isRead: true, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'hello world', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', isRead: true, sentAt: 1551133130594 },
        { id: utilService.makeId(), subject: 'Dropbox', body: 'and 49 others made changes in your shared folders', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'A first-party GitHub', body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. Visit https://github.com/settings/connections/applications/0120e057bd645470c1ed for more information.', isRead: true, sentAt: 1551133130594 },
    ]
    return mails
}