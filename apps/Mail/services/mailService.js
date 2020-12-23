import { utilService } from '../../../services/utilService.js';
import { storageService } from '../../../services/storageService.js';

export const mailService = {
    query,
    remove
}

const KEY = 'mailStorage'

var gMails;
_createMails();

function _createMails() {
    // Try loading from localStorage
    gMails = storageService.load(KEY);
    if (!gMails || !gMails.length) {
        // Nothing in localStorage, use demo data
        gMails = _getDemoMails()
        _saveMailsToStorage();
    }
}

function query() {
    return Promise.resolve(gMails);
}

function remove(mailId) {
    gMails = gMails.filter(mail => mail.id !== mailId);
    _saveMailsToStorage();
    return Promise.resolve();
}




function _saveMailsToStorage() {
    storageService.save(KEY, gMails)
}

function _getDemoMails() {
    const mails = [
        { id: utilService.makeId(), subject: 'Good morning', body: 'Have a good day :)', isRead: true, sentAt: 1551133930594 },
        { id: utilService.makeId(), subject: 'Hurry up!!', body: 'Sprint 3 is here', isRead: false, sentAt: 1551133630594 },
        { id: utilService.makeId(), subject: 'Important task', body: 'Let me know when it\'s done!', isRead: false, sentAt: 1551133130594 }
    ];
    return mails;
}