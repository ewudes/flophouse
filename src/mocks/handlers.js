import {http, HttpResponse} from 'msw';

const API_BASE = `https://18.react.pages.academy`;

export const handlers = [
  http.get(`${API_BASE}/hotels`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: `Mocked Hotel Amsterdam`,
        city: {name: `Amsterdam`, location: {latitude: 52.374, longitude: 4.8897}},
        price: 120,
        rating: 4.2,
        isFavorite: false,
        previewImage: `https://via.placeholder.com/260x200`,
        location: {latitude: 52.3909, longitude: 4.8531}
      },
      {
        id: 2,
        title: `Mocked Hotel Paris`,
        city: {name: `Paris`, location: {latitude: 48.8566, longitude: 2.3522}},
        price: 100,
        rating: 4.7,
        isFavorite: true,
        previewImage: `https://via.placeholder.com/260x200`,
        location: {latitude: 48.8566, longitude: 2.3522}
      }
    ]);
  }),

  http.post(`${API_BASE}/favorite/:id/:status`, ({params}) => {
    const {id, status} = params;

    return HttpResponse.json({id: Number(id), isFavorite: status === `1`});
  }),

  http.get(`${API_BASE}/login`, () => {
    return HttpResponse.json({email: `mock@user.com`, token: `fake-token`});
  }),

  http.post(`${API_BASE}/login`, async ({request}) => {
    const body = await request.json();
    const {email, password} = body;

    if (email === `test@test.com` && password === `123456`) {
      return HttpResponse.json({token: `mock-token`, email});
    } else {
      return new HttpResponse(`Unauthorized`, {status: 401});
    }
  }),
];
