$(document).ready(function(){
		var token = '';
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
		function submitData(_settings) {  
			console.log(`msg_ _settings`,settings);
			$.ajax(settings)
			.done(function (response) {
				console.log(response);
			}) 
		}
		var deviceId = '?device_id=dd0912c69cdee7516a8e038da34f103dad6a6330'
    $("#prev").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/previous${deviceId}`;
			submitData(settings)
      console.log(`msg_ prev `);    
    });
    $("#play").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/play${deviceId}`;
			settings['method'] = 'PUT'
			submitData(settings)
			console.log(`msg_ play `);  
				  
    });
    $("#pause").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/pause${deviceId}`;
			settings['method'] = 'PUT'
			submitData(settings)
			console.log(`msg_ pause `);   
    });
    $("#next").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/next${deviceId}`;
			submitData(settings)
    });
		$("#vol0").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/volume?volume_percent=0&${deviceId}`;
			settings['method'] = 'PUT'
			submitData(settings);
			console.log(`msg_ vol0 `); 
		});
    $("#vol50").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/volume?volume_percent=50&${deviceId}`;
			settings['method'] = 'PUT'
			submitData(settings);
			console.log(`msg_ vol 50 `);    
    });
    $("#vol100").click(function(){
			settings['url'] = `https://api.spotify.com/v1/me/player/volume?volume_percent=100&${deviceId}`;
			settings['method'] = 'PUT'
			submitData(settings);
			console.log(`msg_ vol 100 `);  
    });

 

		var stateKey = 'spotify_auth_state';

		/**
		 * Obtains parameters from the hash of the URL
		 * @return Object
		 */
		function getHashParams() {
			var hashParams = {};
			var e, r = /([^&;=]+)=?([^&;]*)/g,
					q = window.location.hash.substring(1);
			while ( e = r.exec(q)) {
					hashParams[e[1]] = decodeURIComponent(e[2]);
			}
			return hashParams;
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
		

		function loadLogin() {
			
			var client_id = '8d0eabf6d4a647f1a6113a3e3b07168d'; // Your client id
			var redirect_uri = 'http://127.0.0.1:5500'; // Your redirect uri

			var state = generateRandomString(16);

			localStorage.setItem(stateKey, state);
			var scope = 'user-read-private user-read-email user-modify-playback-state playlist-modify-public';

			var url = 'https://accounts.spotify.com/authorize';
			url += '?response_type=token';
			url += '&client_id=' + encodeURIComponent(client_id);
			url += '&scope=' + encodeURIComponent(scope);
			url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
			url += '&state=' + encodeURIComponent(state);

			window.location = url;
		}

		var params = getHashParams(); 
		var access_token = '';
		if(params.hasOwnProperty('access_token')) {
			localStorage.setItem('access_token', params.access_token);
			access_token = params.access_token;
		}
		else if(localStorage.getItem('access_token')!=null) {
			access_token = localStorage.getItem('access_token');
		} 

		if (access_token==null) {
			window.location = '?msg=There was an error during the authentication'
		} else {
			localStorage.removeItem(stateKey);
			if (access_token) { 
				settings['headers']['Authorization'] = `Bearer ${access_token}`; 
				token = access_token;
				$.ajax({
						url: 'https://api.spotify.com/v1/me',
						headers: {
							'Authorization': 'Bearer ' + access_token
						},
						success: function(response) { 
							$('#login-button').hide(); 
						}
				});
			} else { 
					$('#login-button').show();
			}

			document.getElementById('login-button').addEventListener('click', function() {
				loadLogin();
			}, false);
		}
    
});