import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4ac9b.firebaseio.com/',
});

export default instance;