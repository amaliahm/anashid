import AdminHomeRepo from "../repos/admin-home-repo.js";

export default class AdminHomeController {

    static async getData (req, res) {
        const total_users = await AdminHomeRepo.totalUsers();
        const total_anasheed = await AdminHomeRepo.totalAnasheed();
        const total_categories = await AdminHomeRepo.totalCategories();
        const new_users = await AdminHomeRepo.newUsers();
        
        const popularCategories = await AdminHomeRepo.popularCategories();
        const popularAnasheed = await AdminHomeRepo.popularAnasheed();

        const anasheed_into_categories = await AdminHomeRepo.anasheedIntCategory();
        const anasheed_into_categories_with_url = await AdminHomeRepo.getUrl(anasheed_into_categories);

        const artists = await AdminHomeRepo.artists();
        const active_users = await AdminHomeRepo.activeUsers();

        if (
            !total_users && !total_anasheed && !total_categories 
            && !new_users 
            && !anasheed_into_categories && !artists 
            && !active_users
            && !popularCategories
            && !popularAnasheed
        ) {
            return res.status(404).json({ error: 'Failed to fetch data' });
        }
        const data = {
            total_users: total_users[0].total_users,
            total_anasheed: total_anasheed[0].total_anasheed,
            total_categories: total_categories[0].total_categories,
            new_users,
            anasheed_into_categories : anasheed_into_categories_with_url,
            artists,
            popularCategories: popularCategories,
            popularAnasheed: popularAnasheed,
            active_users: active_users[0]
        }
        res.status(200).json(data);
    }
}