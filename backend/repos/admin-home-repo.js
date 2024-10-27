import DataBaseRepo from "../database/index.js";
import { _activeUsers, _anasheedIntoCategories, _artists, _newUsers, _totalAnasheed, _totalCategories, _totalUsers, _popularCategories, _popularAnasheed } from "../database/queries/admin-home-queries.js";

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class AdminHomeRepo {

    static async totalUsers() {
      const rows = await DataBaseRepo.queryDatabase(_totalUsers, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        total_users: Number(elem.total_users)
      }))
      return sanitized_rows
    }

    static async totalAnasheed() {
      const rows = await DataBaseRepo.queryDatabase(_totalAnasheed, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        total_anasheed: Number(elem.total_anasheed)
      }))
      return sanitized_rows
    }

    static async totalCategories() {
      const rows = await DataBaseRepo.queryDatabase(_totalCategories, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        total_categories: Number(elem.total_categories)
      }))
      return sanitized_rows
    }

    static async popularCategories() {
      const rows = await DataBaseRepo.queryDatabase(_popularCategories, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        value: Number(elem.duration)
      }))
      return sanitized_rows
    }

    static async popularAnasheed() {
      const rows = await DataBaseRepo.queryDatabase(_popularAnasheed, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        value: Number(elem.duration)
      }))
      return sanitized_rows
    }

    static async newUsers() {
      const rows = await DataBaseRepo.queryDatabase(_newUsers, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        users: Number(elem.users)
      }))
      return sanitized_rows
    }

    static async anasheedIntCategory() {
      const rows = await DataBaseRepo.queryDatabase(_anasheedIntoCategories, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        anasheed_count: Number(elem.anasheed_count)
      }))
      return sanitized_rows
    }

    static async artists() {
      const rows = await DataBaseRepo.queryDatabase(_artists, [])
      if (rows === null ) return null
      const sanitized_rows = rows.map(elem => ({
        ...elem,
        anasheed_count: Number(elem.anasheed_count)
      }))
      return sanitized_rows
    }

    static async activeUsers() {
      const rows = await DataBaseRepo.queryDatabase(_activeUsers, [])
      return (rows === null ) ? null : rows
    }

    static async getUrl(result) {
      const url = await Promise.all(result.map(async (elem) => {
        const url = await getSignedUrl(s3client, new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: elem.file_path,
        }), {
            expiresIn: 3600
        })
        return {
            ...elem,
            file_path: url,
        };
      }));
      return url
  }
}