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

export {
    sidebar_element
}