import { 
    home_icon, category_icon, artist_icon, played_now_icon, 
    recently_played_icon,
    favorite_icon, playlist_icon,
    add_playlist_icon, 
    contact_us_icon, logout_icon, 
} from "../assets/icons"

const sidebar_elements = [
    {
        title: 'menu',
        elements: [
            { name: 'home', icon: home_icon, color: 'white', element: 1 },
            { name: 'categories', icon: category_icon, color: 'white', element: 2 },
            { name: 'artists', icon: artist_icon, color: 'white', element: 3 },
            { name: 'played now', icon: played_now_icon, color: 'white', element: 4 },
        ]
    },
    {
        title: 'library',
        elements: [
            { name: 'recently played', icon: recently_played_icon, color: 'white', element: 5 },
        ]
    },
    {
        title: 'playlist and favorite',
        elements: [
            { name: 'your favorite', icon: favorite_icon, color: 'white', element: 6 },
            { name: 'your playlist', icon: playlist_icon, color: 'white', element: 7 },
            { name: 'add playlist', icon: add_playlist_icon, color: '#0E9EEF', element: 0 },
        ]
    },
    {
        title: 'general',
        elements: [
            { name: 'contact us', icon: contact_us_icon, color: 'white', element: 8 },
            { name: 'logout', icon: logout_icon, color: '#F38BDC', element: 0 },
        ]
    },
]

export {
    sidebar_elements, 
}