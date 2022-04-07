const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? process.env.REACT_APP_GET_URL : 'https://api.nextjs-blog.com'