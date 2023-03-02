/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.vue",
        "./src/**/*.js",
        "./src/**/*.ts",
    ],
    theme: {
        extend: {
            spacing: {
                '128': '32rem',
            }
        },
    },
    plugins: [],
}
