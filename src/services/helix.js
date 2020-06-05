const BASE_URL = 'https://api.twitch.tv/helix';

const _urls = {};

const clientId = 'rsu58la3gxg5j5i38hsthvbkdlg356';
const clientSecret = '0swgrplxpq1gff3rhfnjuzr0qpyw7f';

const getToken = async () => {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: 'post',
    },
  );
  const body = await response.json();

  return body;
};

const headers = {
  'Client-ID': clientId,
};

_urls.games = `${BASE_URL}/games/top`;
_urls.streams = `${BASE_URL}/streams`;

const api = async (url) => {
  if (!headers.Authorization) {
    const {access_token} = await getToken();
    headers.Authorization = `Bearer ${access_token}`;
  }

  return await fetch(url, {headers});
};

const getGames = async () => {
  const response = await api(_urls.games);
  const body = await response.json();

  return body;
};

const getStreams = async (game, limit = 15) => {
  const response = await api(`${_urls.streams}?game=${game}&limit=${limit}`);
  const body = await response.json();

  return body;
};

export {getGames, getStreams};
