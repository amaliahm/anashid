import DataBaseRepo from '../database/index.js'
import { _searchQuery, _filterQuery } from '../database/queries/search-queries.js'

// s3
import { s3client } from '../configs/aws-config.js'
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class SearchRepo {

  static async searchForNasheed(searchQuery) {
    const rows = await DataBaseRepo.queryDatabase(_searchQuery, [searchQuery])
    return (rows !== null ) ? rows : null
  }
  
  static async filterForNasheed(gender, theme, language) {
    const rows = await DataBaseRepo.queryDatabase(_filterQuery, [gender, gender, theme, theme, language, language])
    return (rows !== null ) ? rows : null
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