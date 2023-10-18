/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "resizer.otstatic.com"
            },
            {
                protocol: "https",
                hostname: "images.otstatic.com"
            }

        ]
    }
}

module.exports = nextConfig
