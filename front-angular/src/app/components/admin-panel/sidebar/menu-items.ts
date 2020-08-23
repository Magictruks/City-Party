import { RouteInfo } from 'src/app/models/sidebar.model';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Graphique',
        icon: '',
        class: 'nav-small-cap',
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'Gestion Entité',
        icon: '',
        class: 'nav-small-cap',
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '/categories',
        title: 'Categories',
        icon: 'article',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    // {
    //     path: '/promoters',
    //     title: 'Promoters',
    //     icon: 'assignment_ind',
    //     class: '',
    //     label: '',
    //     labelClass: '',
    //     extralink: false,
    //     submenu: []
    // },
    {
        path: '/events',
        title: 'Events',
        icon: 'event',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/users',
        title: 'Users',
        icon: 'face',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
];
