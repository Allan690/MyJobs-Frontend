import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';

const herokuUrl = 'https://cors-anywhere.herokuapp.com';
const githubUrl =  'https://jobs.github.com/positions.json';

const axios = async () => {
    await localforage.defineDriver(memoryDriver);

    const forageStore = localforage.createInstance({
        driver: [
            localforage.INDEXEDDB,
            localforage.LOCALSTORAGE,
            memoryDriver._driver
        ],
        name: 'jobs-cache'
    });
    return setup({
        baseURL: `${herokuUrl}/${githubUrl}`,
        cache: {
            maxAge: 15 * 60 * 1000,
            store: forageStore
        }
    })
};

export default axios;
