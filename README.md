# 构建
项目使用 22.14.0 版本 node 与 pnpm作为包管理工具

如果你已经有nvm工具, 在项目根目录中使用 `nvm use`, 即可切换到准确版本

`nvm use` 仅对类unix系统有用, window系统需要使用 `nvm use $(cat .nvmrc)`.

如果没有对应的node版本, 请先进行安装.

所有依赖安装脚本为:
```shell
nvm install $(cat .nvmrc)
nvm use $(cat .nvmrc)
npm install -g pnpm
pnpm install
```
如果安装失败, 可以尝试移除pnpm-lock, 移除node_modules重新尝试, 或者是配置镜像后重新安装.