// APPWRITE
export const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!;
export const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
export const APPWRITE_DB_ID_NEXT_DB = process.env.NEXT_PUBLIC_APPWRITE_DB_ID_NEXT_DB!;
export const APPWRITE_TABLE_USERS = process.env.NEXT_PUBLIC_APPWRITE_TABLE_USERS!;
export const APPWRITE_TABLE_BLOG = process.env.NEXT_PUBLIC_APPWRITE_TABLE_BLOG!;
export const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY!;
export const APPWRITE_BUCKET_NEXT_BUCKET = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_NEXT_BUCKET!;

export const BASE_URL =
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_BASE_URL! : process.env.NEXT_PUBLIC_BASE_URL_PROD!;

// SUPABASE
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// YOUTUBE
export const googleApiKey = process.env.GOOGLE_API_KEY!;
export const ytUrl = process.env.YT_URL!;
export const ytChannelIdWpu = process.env.YT_CHANNEL_ID_WPU!;

export const limits = { product: 16, address: 8 };

// PUBLIC API
export const dummyjsonUrl = "https://dummyjson.com";
export const jpUrl = "https://jsonplaceholder.typicode.com";
