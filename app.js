const fs = require('fs');
const FormData = require('form-data');
const moment = require('moment');

// Данные авторизации - подставьте свои данные
const token = '<your-token>';
const networks = [1010101, 2020202, 3030303];
const prj = 5050505;

//Данные поста
let postName = "Первое сообщение, размещённое через API";
let postText = "Мы можем разместить достаточно большой текст, в т.ч. с переводами строк.\nС новой строки текст будет размещён в тех соцсетях, которые не игнорируют данный символ.";
let postTags = '#SEO #news #sample';
let postUrl = 'https://seolit.ru/';
let ImageUrls = ['https://seolit.ru/images/seolit-logo.png'];
let postDateTime = moment().add(7, 'days').format('Y-MM-DD\THH:mm:ss') + 'UTC';
let imageFiles = ["free.jpg"];

//Создание формы
let form = new FormData();
form.append('option', 'com_seolit');
form.append('task', 'publish.publish');
form.append('token', token);
form.append('networks', JSON.stringify(networks));
form.append('postName', postName);
form.append('postText', postText);
form.append('postTags', postTags);
form.append('postUrl', postUrl);
ImageUrls.forEach((v) => {
    form.append('postUrlImage[]', v);
});
form.append('postDateTime', postDateTime);
form.append('prj', prj);
imageFiles.forEach((v, i) => {
    form.append('imageFiles' + i, fs.createReadStream(v), v);
});

// отправка формы
form.submit('https://seolit.ru/index.php', function (err, res) {
    // res – response object (http.IncomingMessage)  //
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        let result = JSON.parse(body);
        console.log(result);
    });
    res.resume();
})

