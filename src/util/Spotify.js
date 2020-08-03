import {clientId} from 'spotifyClientId';

function getCookieValue(value) {
    var cookie = document.cookie.match('(^|;)\\s*' + value + '\\s*=\\s*([^;]+)');
    return cookie ? cookie.pop() : '';
}

function setCookie(cname, cvalue, exsecs = 0) {
  if (exsecs !== 0){
    var d = new Date();
    d.setTime(d.getTime() + exsecs * 1000);
    var expires = "expires="+ d;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  } else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
}




const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'token';
const redirectUri = 'http://localhost:3000';
const authTerms = [
  `client_id=${clientId}`,
  `response_type=${responseType}`,
  `redirect_uri=${redirectUri}`,
  'scopes=playlist-modify-public playlist-modify-public'
];
const queryUrl = authEndpoint + '?' + authTerms.join('&');
const searchEndpoint = 'https://api.spotify.com/v1/search';

const Spotify = {

  getAccessToken() {
    /*
    See reference flow chart in Reference folder for detail in functionality

    Note: Function does not currently handle if there is an error in authentication
    future revisions need to add that functionality or it can get caught in an
    infinite authentication loop
    */
    let _token= getCookieValue('access_token');
    if (_token !== '') {
      return _token;
    } else {
      const currentUrl = window.location.href;
      if (currentUrl.match('access_token=([^&]*)') &&
          currentUrl.match('expires_in=([^&]*)')) {

        _token = currentUrl.match('access_token=([^&]*)')[1];
        const expire_secs = currentUrl.match('expires_in=([^&]*)')[1];

        setCookie('access_token', _token, expire_secs);
        //redirects back to home site URL in order to keep window clean
        window.location.assign(redirectUri);

        return _token;
      } else {
        window.location.assign(queryUrl);
      }
    }
  },

  search(searchTerm, _token) {
    let tracks = {};
    const searchTerms = [
      'type=track',
      `q=${searchTerm}`
    ];
    const searchUrl = searchEndpoint + '?' + searchTerms.join('&');
    return fetch(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + _token
      }
    })
    .then((response) => {
      return response.json()
      ;
    })
    .then((jsonResponse) => {
      return jsonResponse.tracks.items.map((track) => {
        const tracksObj = {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
        return  tracksObj;
      })
    });
  },

  getUserid(_token) {
    const userProfileEnpoint = 'https://api.spotify.com/v1/me';

    return fetch(userProfileEnpoint, {
      headers: {
        Authorization: 'Bearer ' + _token
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      return jsonResponse.id;
    });
  },

  savePlaylist (playlistName, trackURIs, _token) {

    this.getUserid(_token).then((userid) => {
      const playlistEndpoint = `https://api.spotify.com/v1/users/${userid}/playlists`
      console.log(playlistEndpoint);
      const playlistCreate = fetch(playlistEndpoint, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + _token
        },
        body: {
          name: playlistName
        }
      })
      .then((playlistResponse) => {
        return playlistResponse.json();
      });
      console.log(playlistCreate);
    });
  }
};

export default Spotify;
