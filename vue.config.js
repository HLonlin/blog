"use strict";
function getIPAddress() {
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === "IPv4" &&
                alias.address !== "127.0.0.1" &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
}
const IP_Host = getIPAddress();
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : './', // 根目录
	outputDir:"dist", // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
	assetsDir:"", // 放置生成的静态资源 (js、css、img、fonts) 的目录 (相对于 outputDir) 
	indexPath:"index.html", // 指定生成的 index.html 的输出路径 (相对于 outputDir)
	devServer:{
		// hot: false, // 热更新
		// liveReload:false, // 是否开启热更新
		host: IP_Host, // 运行测试页面的域名ip
		port: 8888, // 运行测试页面的端口
		open: true, // 项目运行时是否自动打开浏览器
		proxy: {
      '/api': {
        target: "http://" + IP_Host + ":3000/",
        secure: true, // https需要配置的参数
        pathRewrite: {
        	// 代替targe里面的地址，比如我们需要调用"http://news.baidu.com/user/add"接口，我们可以直接写成"/api/user/add"
					"^/api": "/api"
        },
        changeOrigin: true // 接口跨域需要配置的参数
      },
    },
	},
}