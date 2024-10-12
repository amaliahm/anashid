import { 
    home_icon, category_icon, artist_icon, played_now_icon, 
    recently_played_icon,
    favorite_icon, playlist_icon,
    add_playlist_icon, 
    contact_us_icon, logout_icon, 
    profile_icon,
} from "../assets/icons"

const sidebar_elements = [
    {
        title: 'menu',
        elements: [
            { name: 'home', icon: home_icon, color: 'white', element: 1, to: '/user/home' }, //done
            { name: 'categories', icon: category_icon, color: 'white', element: 2, to: '/user/categories' }, //done
            { name: 'artists', icon: artist_icon, color: 'white', element: 3, to: '/user/artists' }, //done
            { name: 'played now', icon: played_now_icon, color: 'white', element: 4, to: '/user/playednow' },  //done
        ]
    },
    {
        title: 'library',
        elements: [
            { name: 'recently played', icon: recently_played_icon, color: 'white', element: 5, to: '/user/history' }, //done
        ]
    },
    {
        title: 'playlist and favorite',
        elements: [
            { name: 'your favorite', icon: favorite_icon, color: 'white', element: 6, to: '/user/favorites' }, //done
            { name: 'your playlist', icon: playlist_icon, color: 'white', element: 7, to: '/user/playlists' }, //done
            { name: 'add playlist', icon: add_playlist_icon, color: '#0E9EEF', element: 8, to: '/user/add-playlist' },
        ]
    },
    {
        title: 'general',
        elements: [
            { name: 'contact us', icon: contact_us_icon, color: 'white', element: 9, to: 'user/contact' },
            { name: 'profile', icon: profile_icon, color: 'white', element: 10, to: '/user/profile' },
            { name: 'logout', icon: logout_icon, color: '#F38BDC', element: 0, to: 'modal logout' },
        ]
    },
]

export {
    sidebar_elements, 
}