# Jigsaw
这


# 用法
1. 如果未安装nodejs，或者nodejs低于6.x.x，npm版本低于3.x.x，请先安装[nodejs](nodejs.cn)。
2. 下载或者clone本工程代码，假设保存到了 d:\rdk-ng2
3. 有两个可选方式
    1. 如果你可以接入zte内部网络，推荐使用install.exe来部署环境。直接运行 `d:\rdk-ng2\install.exe` 即可。
    2. 否则，你只能使用下面脚本通过npm安装，由于国内奇葩的网络环境，可能会出现各种问题，请自行搜索解决吧。
```
cd d:\rdk-ng2
# 如果无代理，则请跳过这一步。
npm config set proxy=http://proxy.zte.com.cn:80
npm config set registry=https://registry.npm.taobao.org/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm install -g @angular/cli
npm install
npm start
```

4. 浏览器里打开 http://localhost:4200 正常的话就能看到测试页面了

# 组件开发云图
![](comp-map.png)

# 参与贡献
项目处于初始阶段，没有issue，可以搜索源码中的TODO列表，帮忙改正。
