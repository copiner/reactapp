module.exports = {
  presets: [
    ["@babel/preset-env",{
        targets: {
            browsers: ["defaults", "not ie 11"]
        },
        corejs: {
          version: 3,
          proposals: true
        },
        useBuiltIns:"usage"
    }],
    ["@babel/preset-react",{
         useBuiltIns:true
    }]
  ],
  plugins : [
     ["@babel/plugin-proposal-class-properties"],
     ["@babel/plugin-transform-react-jsx", {
        useBuiltIns:true
      }],
     ["@babel/plugin-transform-runtime",{
       corejs:3
     }],
     ["@babel/plugin-syntax-dynamic-import"],
     ["import", {
       libraryName: "antd",
       style: "css"
     }]
  ]
}
