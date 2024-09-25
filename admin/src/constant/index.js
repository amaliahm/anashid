import { 
    artist_icon, category_icon, delete_icon, home_icon, nasheed_icon, user_icon,
    artist_clicked, category_clicked, delete_clicked, home_clicked, nasheed_clicked, user_clicked
 } from '../assets/icons/index'

const sidebar_element = [
    {
        icon: home_icon,
        to: '/admin/home',
        clicked: home_clicked,
        name: 'home',
    },
    {
        icon: user_icon,
        to: '/admin/users',
        clicked: user_clicked,
        name: 'users',
    },
    {
        icon: nasheed_icon,
        to: '/admin/anasheed',
        clicked: nasheed_clicked,
        name: 'anasheed'
    },
    {
        icon: artist_icon,
        to: '/admin/artists',
        clicked: artist_clicked,
        name: 'artists',
    },
    {
        icon: category_icon,
        to: '/admin/categories',
        clicked: category_clicked,
        name: 'categories'
    },
    {
        icon: delete_icon,
        to: '/admin/trash',
        clicked: delete_clicked,
        name: 'trash',
    },
]

const head_users = [
    {
        name: 'username',
    },
    {
        name: 'photo',
    },
    {
        name: 'created at',
    },
    {
        name: 'last login',
    },
    {
        name: 'email',
    },
    {
        name: 'listened anasheed',
    },
    {
        name: 'playlist',
    },
    {
        name: '',
    },
]

const head_categories = [
    {
        name: 'name',
    },
    {
        name: 'photo',
    },
    {
        name: 'anasheed',
    },
    {
        name: 'created at',
    },
    {
        name: '',
    },
    {
        name: '',
    },
]

const head_artists = [
    {
        name: 'name',
    },
    {
        name: 'photo',
    },
    {
        name: 'bio',
    },
    {
        name: 'added at',
    },
    {
        name: 'anasheed',
    },
    {
        name: '',
    },
    {
        name: '',
    },
]

const head_anasheed = [
    {
        name: 'title',
    },
    {
        name: 'photo',
    },
    {
        name: 'artist',
    },
    {
        name: 'created at',
    },
    {
        name: 'listened',
    },
    {
        name: 'favorite',
    },
    {
        name: 'playlist',
    },
    {
        name: '',
    },
    {
        name: '',
    },
]

export {
    sidebar_element, 
    head_users, head_categories, head_artists, head_anasheed, 
}