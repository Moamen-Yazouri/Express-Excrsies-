import { promises as fs } from 'fs';
import path from 'path';

export const deleteUploadedAsset = async (fileName: string) => {
  const filePath = path.join(__dirname, '../', 'uploads', fileName);
  await fs.unlink(filePath);
};