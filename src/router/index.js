import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';
import nProgress from '../plugins/nprogress';
import { useUserInfoStore } from '../store/user-info';
import qs from 'qs';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/Dashboard/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'serverSettings',
                name: 'serverSettings',
                component: () => import('../views/ServerSettings/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'map',
                name: 'map',
                component: () => import('../views/Map/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'playerList',
                name: 'playerList',
                redirect: '/playerList/onlinePlayers',
                children: [
                    {
                        path: 'onlinePlayers',
                        name: 'playerList.onlinePlayers',
                        component: () => import('../views/PlayerList/OnlinePlayers/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'historyPlayers',
                        name: 'playerList.historyPlayers',
                        component: () => import('../views/PlayerList/HistoryPlayers/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: 'chat',
                name: 'chat',
                redirect: '/chat/liveChat',
                children: [
                    {
                        path: 'liveChat',
                        name: 'chat.liveChat',
                        component: () => import('../views/Chat/LiveChat/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'chatRecord',
                        name: 'chat.chatRecord',
                        component: () => import('../views/Chat/ChatRecord/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: 'blacklist',
                name: 'blacklist',
                component: () => import('../views/Blacklist/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'itemBlocks',
                name: 'itemBlocks',
                component: () => import('../views/ItemBlocks/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'console',
                name: 'console',
                component: () => import('../views/Console/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'globalSettings',
                name: 'globalSettings',
                component: () => import('../views/GlobalSettings/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'autobackup',
                name: 'autobackup',
                redirect: '/autobackup/settings',
                children: [
                    {
                        path: 'settings',
                        name: 'autobackup.settings',
                        component: () => import('../views/AutoBackup/Settings/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'management',
                        name: 'autobackup.management',
                        component: () => import('../views/AutoBackup/Management/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: 'gameNotice',
                name: 'GameNotice',
                component: () => import('../views/GameNotice/index.vue'),
                meta: { requiresAuth: true, keepAlive: true },
            },
            {
                path: 'pointsSystem',
                name: 'pointsSystem',
                redirect: '/pointsSystem/settings',
                children: [
                    {
                        path: 'settings',
                        name: 'PointsSystem.Settings',
                        component: () => import('../views/PointsSystem/Settings/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'management',
                        name: 'PointsSystem.Management',
                        component: () => import('../views/PointsSystem/Management/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: 'listManagement',
                name: 'listManagement',
                redirect: '/listManagement/itemList',
                children: [
                    {
                        path: 'itemList',
                        name: 'ListManagement.ItemList',
                        component: () => import('../views/ListManagement/ItemList/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'commandList',
                        name: 'ListManagement.CommandList',
                        component: () => import('../views/ListManagement/CommandList/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: '/gameStore',
                name: '/gameStore',
                redirect: '/gameStore/settings',
                children: [
                    {
                        path: 'settings',
                        name: 'GameStore.Settings',
                        component: () => import('../views/GameStore/Settings/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'management',
                        name: 'GameStore.Management',
                        component: () => import('../views/GameStore/Management/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: '/vipGift',
                name: '/vipGift',
                redirect: '/vipGift/settings',
                children: [
                    {
                        path: 'settings',
                        name: 'VipGift.Settings',
                        component: () => import('../views/VipGift/Settings/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'management',
                        name: 'VipGift.Management',
                        component: () => import('../views/VipGift/Management/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                ],
            },
            {
                path: 'teleSystem',
                name: 'teleSystem',
                redirect: '/teleSystem/friend',
                children: [
                    {
                        path: 'friend',
                        name: 'TeleportFriend',
                        component: () => import('../views/TeleportFriend/index.vue'),
                        meta: { requiresAuth: true, keepAlive: true },
                    },
                    {
                        path: 'city',
                        name: 'city',
                        children: [
                            {
                                path: 'settings',
                                name: 'TeleportCity.Settings',
                                component: () => import('../views/TeleportCity/Settings/index.vue'),
                                meta: { requiresAuth: true, keepAlive: true },
                            },
                            {
                                path: 'management',
                                name: 'TeleportCity.Management',
                                component: () => import('../views/TeleportCity/Management/index.vue'),
                                meta: { requiresAuth: true, keepAlive: true },
                            },
                        ],
                    },
                    {
                        path: 'home',
                        name: 'home',
                        children: [
                            {
                                path: 'settings',
                                name: 'TeleportHome.Settings',
                                component: () => import('../views/TeleportHome/Settings/index.vue'),
                                meta: { requiresAuth: true, keepAlive: true },
                            },
                            {
                                path: 'management',
                                name: 'TeleportHome.Management',
                                component: () => import('../views/TeleportHome/Management/index.vue'),
                                meta: { requiresAuth: true, keepAlive: true },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/index.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    parseQuery: qs.parse,
    stringifyQuery: qs.stringify,
});

router.beforeEach(async (to, from) => {
    nProgress.start();
    // Check if this route requires authorization and if the user has logged in
    if (to.meta.requiresAuth) {
        const userInfoStore = useUserInfoStore();
        const isLoggedIn = await userInfoStore.isLoggedIn();
        if (!isLoggedIn) {
            // If not, redirect to the login page
            return '/login?redirect=' + to.fullPath;
        }
    }
});

router.afterEach(() => {
    nProgress.done();
});

export default router;

const keepAlives = [];
const filterKeepAlive = (routes, cache) => {
    routes.forEach((item) => {
        item.meta?.keepAlive && item.name && cache.push(item.name);
        item?.children?.length && filterKeepAlive(item.children, cache);
    });
};

filterKeepAlive(routes, keepAlives);

export { keepAlives };
