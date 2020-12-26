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
        { id: utilService.makeId(), subject: 'Important task', body: 'Let me know when it\'s done!', isRead: false, sentAt: 1551133130594 }
    ]
    return mails
}