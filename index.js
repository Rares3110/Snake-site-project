const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

var baseData = 
{
    "userName" : "Guest",
    "score" : "-",
    "image" : "images/userIcon.jpg",
    "high" :
    [
        { "userName" : "-", "score" : "-" },
        { "userName" : "-", "score" : "-" },
        { "userName" : "-", "score" : "-" },
        { "userName" : "-", "score" : "-" },
        { "userName" : "-", "score" : "-" }
    ]
};
var dataToUse;
var data;

function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    dataToUse = JSON.parse(JSON.stringify(baseData));

    fs.readFile('userData.json', (err, data) => {
        if (err) throw err;

        var obj = JSON.parse(data);

        obj.users.sort(compare);
        for(var i = 0; i < 5; i++)
            if(i < obj.users.length)
            {
                dataToUse.high[i].userName = obj.users[i].name;
                dataToUse.high[i].score = obj.users[i].score;
            }

        res.render(path.join(__dirname, 'public', 'mainPage.ejs'), {dataToUse});
    });
});

app.use('/pathLogged', express.urlencoded({extended:true}));

app.post('/pathLogged', (req, res) => {
    fs.readFile('userData.json', (err, data) => {
        if (err) throw err;

        var obj = JSON.parse(data);
        
        if(req.body.isRegister == 'on')
        {
            if(req.body.pass1 != req.body.pass2)
            {
                //render cu mesaj
                return;
            }

            for(var i = 0; i < obj.users.length; i++)
                if(obj.users[i].name == req.body.userName)
                {
                    //render cu mesaj
                    return;
                }
        
            obj.users.push(
                {
                    "name" : req.body.userName,
                    "password" : req.body.pass1,
                    "score" : 0
                }
            );
            
            dataToUse.image = "images/snakeIcon.png";
            dataToUse.userName = obj.users[i].name;
            dataToUse.score = obj.users[i].score;
            res.render(path.join(__dirname, 'public', 'mainPage.ejs'), {dataToUse});
            fs.writeFileSync('userData.json', JSON.stringify(obj, null, 2));
        }
        else
        {
            for(var i = 0; i < obj.users.length; i++)
                if(obj.users[i].name == req.body.userName)
                {
                    if(obj.users[i].password != req.body.pass1)
                    {
                        //render mesaj
                        return;
                    }
                    
                    dataToUse.image = "images/snakeIcon.png";
                    dataToUse.userName = obj.users[i].name;
                    dataToUse.score = obj.users[i].score;
                    res.render(path.join(__dirname, 'public', 'mainPage.ejs'), {dataToUse});
                    return;
                }

            //render mesaj
        }
    });
});

app.use('/pathGuest', express.urlencoded({extended:true}));

app.post('/pathGuest', (req, res) => {
    dataToUse.image = baseData.image;
    dataToUse.userName = baseData.userName;
    dataToUse.score = baseData.score;
    res.render(path.join(__dirname, 'public', 'mainPage.ejs'), {dataToUse});
});

app.use('/pathLoggedUpdate', express.urlencoded({extended:true}));

app.post('/pathLoggedUpdate', (req, res) => {

    if(dataToUse.userName == "Guest")
        return;

    if(dataToUse.score < parseInt(req.body.score))
        dataToUse.score = parseInt(req.body.score);
    else
        return;

    fs.readFile('userData.json', (err, data) => {
        if (err) throw err;

        var obj = JSON.parse(data);

        for(var i = 0; i < obj.users.length; i++)
            if(obj.users[i].name == dataToUse.userName)
            {
                obj.users[i].score = dataToUse.score;
                break;
            }

        obj.users.sort(compare);
        for(var i = 0; i < 5; i++)
            if(i < obj.users.length)
            {
                dataToUse.high[i].userName = obj.users[i].name;
                dataToUse.high[i].score = obj.users[i].score;
            }
        
        fs.writeFileSync('userData.json', JSON.stringify(obj, null, 2));
        res.render(path.join(__dirname, 'public', 'mainPage.ejs'), {dataToUse});
    });
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});