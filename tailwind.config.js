module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
