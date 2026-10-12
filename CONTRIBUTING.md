# 贡献指南 (Contributing)

欢迎参与 **NewsAggregator** 的开发与改进！

## 开发环境

1. Fork 本仓库并克隆到本地。
2. 后端：参见 `README.md` 的「本地启动」，建议使用 Python 虚拟环境。
3. 前端：`cd frontend && npm install && npm run dev`。

## 分支与提交

- 从 `main` 切出新分支：`feature/xxx`（功能）或 `fix/xxx`（修复）。
- 提交信息建议遵循 [Conventional Commits](https://www.conventionalcommits.org/)：
  `feat:` / `fix:` / `docs:` / `style:` / `refactor:` / `chore:`。
- 提交前请在本地通过：
  ```bash
  cd frontend && npm run lint && npm run build
  ```

## Pull Request

- 在 GitHub 向 `main` 发起 PR，并填写 PR 模板。
- 说明改动内容、关联 Issue 与本地验证方式。
- CI（前端 `build`/`lint` + 后端语法检查）必须通过。

## 代码约定

- 前端样式遵循 `DESIGN.md` 中的设计令牌（Tailwind 主题变量、玻璃/霓虹工具类），请勿在组件内硬编码颜色。
- 新增数据源爬虫请放在 `backend/crawler/`，并在 `crawler/__init__.py` 的 `crawl_all` 中串联。
- 数据库为本地 SQLite，运行时自动建库，请勿将 `*.db` 提交入库。

## 行为准则

请友善、尊重地交流，共同维护开放的协作氛围。
