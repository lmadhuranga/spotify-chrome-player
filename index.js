$(document).ready(function(){
    var settings = {
			"url": "",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer BQAAI4n7HvUQpQaJlBCSJL837R__PAHz1aiIkajUZRrU0J1D4sykg8YB0uRyYdVPHcZ2xyonXn2EMWLMrYiuRC3JC0voSnbmoYQ2ld0Ds9SAae1aS1xlGhr1sv6Ilv7NnjlOswzb6z-i4yZPG-YljN3vigGEyZQnsTADYuYhoNEAHnjjdsywWkcuUCs_UnnWoW45h_B4BIkr3cwhJILo3QELcmXzf2AewhtEfcMUEwo0JiNrLkbuV81WyUNkvNrBtMNLTHUbAGTOxi0o20EapYqhDiP9e5GbzBacGLYqZf5O"
			},
		};
		function submitData(_settings) {
			$.ajax(_settings).done(function (response) {
				console.log(response);
			});
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
    
});