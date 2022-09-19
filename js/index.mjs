import {updateAPI} from "./components/main.mjs"
const API = updateAPI();
console.log(await API.getPosts())