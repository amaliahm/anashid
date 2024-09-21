import DataBaseRepo from "../database/index.js";
import { 
    _findAnasheedById,
    _deleteAnasheed, 
    _getAllAnasheed, 
    _updateAnasheed
} from "../database/queries/anasheed-queries.js";

export default class AnasheedRepo {

    static async getAllAnasheed() {
        const rows = await DataBaseRepo.queryDatabase(_getAllAnasheed, [])
        return (rows === null || rows.length > 0) ? rows : null
    }

    static async findAnasheedById(id) {
        const rows = await DataBaseRepo.queryDatabase(_findAnasheedById, [id])
        return (rows === null || rows.length > 0) ? rows : null
    }

    static async deleteAnasheed(id) {
        await DataBaseRepo.queryDatabase(_deleteAnasheed, [id])
    }

    static async updateAnasheed(id, title, description) {
        await DataBaseRepo.queryDatabase(_updateAnasheed, [id, title, description])
    }
}