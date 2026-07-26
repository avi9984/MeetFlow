import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const NODE_DEV: string = process.env.NODE_DEV || 'development';