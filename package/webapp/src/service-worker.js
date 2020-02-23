/* eslint-disable */

import {precacheAndRoute} from 'workbox-precaching';
import {skipWaiting, clientsClaim} from 'workbox-core';

skipWaiting();
clientsClaim();

const precache = self.__WB_MANIFEST.filter(entry => !entry.url.includes('hot-update'));
precacheAndRoute(precache);
