import axios from "axios";

const base_url = 'http://94.131.246.109:5555/'
const class_key = '2'

export const api = axios.create({
    baseURL: `${base_url}v1/${class_key}`,
});
