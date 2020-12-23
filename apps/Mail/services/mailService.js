export const mailService = {
    query
}

var gMails;
_createMails();

function _createMails() {
    // Try loading from localStorage
    // gMails = storageService.load(KEY);
    // if (!gMails || !gMails.length) {
    // Nothing in localStorage, use demo data
    gMails = _getDemoMails()
        // _savePetsToStorage();
        // }
}

function _getDemoMails() {
    const mails = [
        { subject: 'Good morning', body: 'Have a good day :)', isRead: true, sentAt: 1551133930594 },
        { subject: 'Hurry up!!', body: 'Sprint 3 is here', isRead: false, sentAt: 1551133630594 },
        { subject: 'Important task', body: 'Let me know when it\'s done', isRead: false, sentAt: 1551133130594 }
    ];
    return mails;
}

function query() {
    return Promise.resolve(gMails);
}