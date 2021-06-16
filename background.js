
var stateKey = 'spotify_auth_state';
var host = 'https://api.spotify.com/v1/me/player';
var deviceId = '?device_id=dd0912c69cdee7516a8e038da34f103dad6a6330';
var settings = {
    "url": "",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": ``
    },
};

function submitData() {  
    console.log(`msg_ _settings`,settings);
    jQuery.ajax(settings)
    .done(function (response) {
        console.log(response);
    }) 
}

function next() {
    console.log(`msg_ play next track`);
    settings['url'] = `${host}/next${deviceId}`;
	submitData()
}

function play() {
    console.log(`msg_ play track`);
    settings['url'] = `${host}/play${deviceId}`;
	submitData()
}

function pause() {
    console.log(`msg_ pause track`);
    settings['url'] = `${host}/pause${deviceId}`;
	submitData()
}

function setVol(_vol) {
    settings['url'] = `${host}/volume?volume_percent=${_vol}&${deviceId}`;
    settings['method'] = 'PUT'
	submitData()
}

function previous() {
    console.log(`msg_ play next track`);
    settings['url'] = `${host}/next${deviceId}`;
	submitData()
}


/**
		 * Generates a random string containing numbers and letters
		 * @param  {number} length The length of the string
		 * @return {string} The generated string
		 */
 function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

function getHashParams(url) {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = url.substring(1);
    while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}


function loadLoginUrl() {
			
    var client_id = '8d0eabf6d4a647f1a6113a3e3b07168d'; // Your client id
    var redirect_uri = chrome.identity.getRedirectURL("oauth2"); // Your redirect uri

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email user-modify-playback-state playlist-modify-public';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    console.log(`msg_ url`,url);
    //window.location = url;
    return url;
} 


let authUrl  = loadLoginUrl()
chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function (redirectUrl) { 
    if (redirectUrl) { 
        const token = getHashParams(redirectUrl.replace(`${chrome.identity.getRedirectURL("oauth2")}#`, ''))
        console.log('Background login complete',token);
        // return callback(redirectUrl); // call the original callback now that we've intercepted what we needed
        localStorage.setItem('access_token', token['ccess_token']);
        settings['headers']['Authorization'] = `Bearer ${token['ccess_token']}`;

    } else {
        console.log("launchWebAuthFlow login failed. Is your redirect URL (" + chrome.identity.getRedirectURL("oauth2") + ") configured with your OAuth2 provider?");
        return (null);
    }
}); 


chrome.commands.onCommand.addListener(function(command) { 
    console.log(`msg_ command`,command);
    if(command=='spotify-like') {
        // like()
    }
    else if(command=='spotify-previous') {
        previous()
    }
    else if(command=='spotify-play') {
        play()
    }
    else if(command=='spotify-pause') {
        pause()
    }
    else if(command=='spotify-next') {
        next()
    }
    else if(command=='spotify-v0') {
        setVol(0);
    }
    else if(command=='spotify-v50') {
        setVol(50);
    }
    else if(command=='spotify-v100') {
        setVol(99);
    }
   
});