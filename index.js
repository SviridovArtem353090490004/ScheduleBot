const TelgramApi = require('node-telegram-bot-api')

const token = ''

const bot = new TelgramApi(token, {polling: true})

var users = [];  // { username, uid, ugroup }

var notes = [];  // { uid, time, text, announcementMonth, announcementDay }

var groupNotes = [];  // { group, description }

function isNotListed(msg) {
    var isUserNotListed = true;
    for(var i=0; i < users.length; i++) {
        if (msg.from.id == users[i]['uid']) {
            isUserNotListed = false;
            break;
        }
    }
    return isUserNotListed;
}


function isGroup(tmp) {
    var isGroup = true;

    var directionNumber = '';
    var groupNumber = '';

    var n = 0;

    if (tmp[n] == 'з') {
        ++n;
    }
    else {
        while ((tmp[n] != '/') && (n < tmp.length)) {
            directionNumber += tmp[n];
            ++n;
        }

        if (n == tmp.length) {
            isGroup = false;
            return isGroup;
        }

        if (isNaN(parseInt(directionNumber, 10)) || (directionNumber.length != 7)) {
            isGroup = false;
            return isGroup;
        }

        ++n;

        while (n < tmp.length) {
            groupNumber += tmp[n];
            ++n;
        }

        if (isNaN(parseInt(groupNumber, 10)) || (groupNumber.length != 5)) {
            isGroup = false;
            return isGroup;
        }
    }

    return isGroup;
}

function getInfo() {
    return '--------------Commands--------------\n' +
        '1) /setGroup <group_number> - Установка вашего номера группы;\n' +
        '    <group_number> - номер группы в формате: <направление>/<группа>, допускается перед номером группы для указания заочной формы обучения;\n' +
    '2) /addGroupNote <note_description> - добавление записей в список записей группы, которая доступна всем участникам этой группы;\n' +
    '    <note_description> - сама запись;\n' +
    '3) /deleteGroupNote <note_id> - удаление записей из списка записей группы, который доступен всем участникам этой группы;\n' +
    '    <note_id> - номер существующей записи из списка записей группы(/getGroupNotes);\n' +
    '4) /getGroupNotes - возможность просмотра записей группы;\n' +
    '5) /getSchedule - получение ссылки на расписание группы;\n' +
    '6) /getLinks - получение необходимых ссылок для студента;'
}

function getUserGroup(tmp) {
    for (var i = 0; i < users.length; i++) {
        if (users[i]['uid'] == tmp) {
            return users[i]['ugroup'];
        }
    }
}

bot.on('message', (msg) => {
    var userId = msg.from.id;

    if (isNotListed(msg)) {
        users.push({'uid': userId, 'ugroup': 'Undefined',});

        bot.sendMessage(userId, 'It\'s your first message, send you some commands for start!\n\n' + getInfo());
    }
});

bot.onText(/help/, function (msg) {
    var userId = msg.from.id;

    bot.sendMessage(userId, getInfo());
});

bot.onText(/setGroup (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var group = match[1];

    if (isGroup(group)) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]['uid'] == userId) {
                users[i]['ugroup'] = group;
            }
        }

        bot.sendMessage(userId, 'Group is changed!');
    }
    else {
        bot.sendMessage(userId, 'Wrong group name!');
    }
});

bot.onText(/addGroupNote (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var description = match[1];
    var group = getUserGroup(userId);

    if (group != 'Undefined') {
        groupNotes.push({'group': group, 'description': description});

        bot.sendMessage(userId, 'Group note was added!');
    }
    else {
        bot.sendMessage(userId, 'Firstly you need to set your group by \'/setGroup\'!');
    }
});

bot.onText(/deleteGroupNote (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var noteId = match[1];

    var group = getUserGroup(userId);
    var n = 0;

    if ((group != 'Undefined')) {

        for (var i = 0; i < groupNotes.length; i++) {
            if (groupNotes[i]['group'] == group) {
                ++n;
                if (noteId == n) {
                    groupNotes.splice(i, 1);
                    bot.sendMessage(userId, 'Group note \'' + noteId + '\' was deleted!');
                    return;
                }
            }
        }
        bot.sendMessage(userId, 'Wrong noteId!');
    }
    else {
        bot.sendMessage(userId, 'Firstly you need to set your group by \'/setGroup\'!');
    }
});

bot.onText(/getGroupNotes/, function (msg) {
    var userId = msg.from.id;
    var group = getUserGroup(userId);

    if (group == 'Undefined') {
        bot.sendMessage(userId, 'Firstly you need to set your group by \'/setGroup\'!');
    }
    else {
        var n = 0;
        var output = '';

        output += '--------------Group notes--------------'

        for (var i = 0; i < groupNotes.length; i++) {
            if (groupNotes[i]['group'] == group) {
                output += '\n';
                output += n + 1;
                output += ':\n';
                output += 'Description: ' + groupNotes[i]['description'];
                ++n;
            }
        }

        if (n == 0) {
            output += '\nNothing there';
        }

        bot.sendMessage(userId, output);
    }
});


bot.onText(/getNotes/, function (msg) {
    var userId = msg.from.id;

    var n = 0;
    var output = '';

    output += '--------------Notes--------------'

    for (var i = 0; i < notes.length; i++) {
        if (notes[i]['uid'] == userId) {
            output += '\n';
            output += n + 1;
            output += ':\n';
            output += 'Text: ' + notes[i]['text'] + '\n';
            output += 'Time: ' + notes[i]['time'] + '\n';
            output += 'Description: ' + notes[i]['description'];
            ++n;
        }
    }

    if (n == 0) {
        output += '\nNothing there';
    }

    bot.sendMessage(userId, output);
});

bot.onText(/getSchedule/, function (msg) {
    var userId = msg.from.id;
    var group = getUserGroup(userId);

    if (group == 'Undefined') {
        bot.sendMessage(userId, 'Firstly you need to set your group by \'/setGroup\'!');
    }
    else {
        var url = 'https://ruz.spbstu.ru/search/groups?q=';

        var n = 0;
        var directionNumber = '';
        var groupNumber = '';

        if (group[n] == 'з') {
            url += group[n];
            ++n;
        }

        while (group[n] != '/') {
            directionNumber += group[n];
            ++n;
        }

        url += directionNumber + '%2F';

        ++n;

        while (n < group.length) {
            groupNumber += group[n];
            ++n;
        }

        url += groupNumber;

        bot.sendMessage(userId, 'Your schedule: ' + url);
    }
});

bot.onText(/getLinks/, function (msg) {
    var userId = msg.from.id;

    var output = '';

    output += '--------------Links--------------\n'
        + '1) Личный кабинет - https://lk.spbstu.ru/\n'
        + '2) Профсоюз - https://vk.com/profunionpro\n'
        + '3) Открытое образование - https://openedu.ru/\n'
        + '4) СДО ИКНТ - https://dl.spbstu.ru/\n'
        + '5) СДО СПбПУ - https://lms.spbstu.ru/\n'
        + '6) СДО ГИ - https://dl-hum.spbstu.ru/';

    bot.sendMessage(userId, output);
});
