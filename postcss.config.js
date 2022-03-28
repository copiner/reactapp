module.exports = {
  plugins: {
    'postcss-preset-env':{
      autoprefixer: { grid: true },
      stage: 1,//0 1 2 3
      features: {
        'nesting-rules': true
      }
    }
  }
}
