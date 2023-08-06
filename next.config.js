/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'uploadthing.com']
    },
    experimental: {
        appDir: true
    }
}

module.exports = nextConfig
