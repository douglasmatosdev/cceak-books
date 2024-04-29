/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'books.google.com',
                port: '',
                pathname: '/books/content?id=KYarDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
            }
        ]
    }
};

export default nextConfig;
