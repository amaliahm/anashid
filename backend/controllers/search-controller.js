import SearchRepo from "../repos/search-repo.js";

export default class SearchController {

    static async searchForNasheed (req, res) {
        const { searchQuery } = req.body;
        const result = await SearchRepo.searchForNasheed(searchQuery);
        if (!result) {
            return res.status(404).json({ error: 'Failed to find nasheed' });
        }
        const result_with_url = await SearchRepo.getUrl(result);
        if (!result_with_url) {
            return res.status(404).json({ error: 'Failed to find nasheed' });
        }
        return res.status(200).json(result_with_url);
    }

    static async filterForNasheed (req, res) {
        const { gender, theme, language } = req.body;
        const result = await SearchRepo.filterForNasheed(gender, theme, language);
        if (!result) {
            return res.status(404).json({ error: 'Failed to find nasheed' });
        }
        const result_with_url = await SearchRepo.getUrl(result);
        if (!result_with_url) {
            return res.status(404).json({ error: 'Failed to find nasheed' });
        }
        return res.status(200).json(result_with_url);
    }
}