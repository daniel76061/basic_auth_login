// załaduj moduł express i path
const express = require("express");
var path = require('path');

const app = express();

// funkcja do uwierzytelniania  
function authentication(req, res, next) {
    // pobranie nagłówków 
	var authheader = req.headers.authorization;
	console.log(req.headers);

    // jezeli nie mamy poświadczeń - zwróć błąd 401
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

    // pobranie danych logowania od uzytkownika
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

    // porównanie przesłanych danych do prawidłowych
	if (user == 'dan' && pass == 'test') {

		// jeśli dane są poprawne - przejdź dalej
		next();
        // jeśli dane nie są poprawne - zwróć bład 401
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// sprawdzanie poświadczeń
app.use(authentication)
// wyświetlanie zawartości katalogu
app.use(express.static(path.join(__dirname, 'public')));

// uruchom serwer na na porcie 3000
app.listen((3000), () => {
	console.log("Server is Running");
})