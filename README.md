# NewsAggregator · 新闻聚合平台

一个聚合新闻 / 图片 / 视频 / 热搜的多源内容平台。后端定时（或手动）爬取多类来源，存入本地 SQLite；前端用 React + Tailwind v4 构建了一套**克制型赛博朋克（Restrained Cyberpunk）**仪表盘界面。

> 设计系统与视觉规范见 [`DESIGN.md`](./DESIGN.md)，产品需求见 [`PRD.md`](./PRD.md)。

## 功能

- **四大内容流**：新闻、图片、视频、社交热搜，独立标签页切换。
- **实时聚合状态**：顶部 Header 显示各流条数，并有「LIVE / CRAWLING」抓取状态指示灯。
- **搜索与分类筛选**：跨内容流关键词搜索，各流可按类别（如 `人工智能`、`nature` 等）过滤。
- **详情弹层**：点击卡片打开对应 Modal 查看摘要 / 大图 / 播放 / 热搜原文。
- **手动刷新**：一键触发后台爬虫重新聚合。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 后端 | Python · FastAPI · SQLite · requests + BeautifulSoup4 + lxml |
| 前端 | React 19 · Vite 8 · Tailwind CSS v4 · TypeScript |
| 通信 | 前端通过 `/api` 代理访问后端（CORS 已开放 `*`） |

## 目录结构

```
NewsAggregator/
├── backend/                 # FastAPI 服务 + 爬虫
│   ├── main.py              # 入口 / API 路由 / 端口 8765
│   ├── db.py                # SQLite 初始化与查询
│   ├── crawler/             # 爬虫实现
│   │   ├── news.py images.py videos.py social.py
│   │   ├── spiders/news_spider.py
│   │   └── scheduler.py
│   └── *.db                 # 运行时生成（已 gitignore）
├── frontend/                # React + Vite 前端
│   ├── src/
│   │   ├── components/      # Header / TabNav / 卡片 / Modal 等
│   │   ├── pages/           # News / Images / Videos / Hot 页面
│   │   ├── hooks/useContent.ts
│   │   ├── api/client.ts
│   │   └── index.css        # 设计令牌与玻璃/霓虹样式
│   └── vite.config.ts       # /api 代理配置
├── requirements.txt         # 后端依赖
├── DESIGN.md  PRD.md        # 设计 / 产品文档
└── .gitignore
```

## 本地启动

### 1. 后端（默认端口 8765）

```bash
cd backend
pip install -r ../requirements.txt        # 建议在虚拟环境中安装
python main.py                            # 或: uvicorn main:app --reload --port 8765
```

- 启动时会自动 `init_db()` 建库（生成 `news_aggregator.db` / `news.db`，已被 gitignore）。
- 端口可通过环境变量覆盖：`PORT=8799 python main.py`。

### 2. 前端（默认端口 5173）

```bash
cd frontend
npm install
npm run dev
```

- 浏览器打开 `http://localhost:5173`。
- 前端通过 Vite 代理把 `/api` 转发到后端。默认目标 `http://localhost:8765`；若后端不在 8765，用环境变量覆盖：

```bash
API_TARGET=http://localhost:8799 npm run dev
```

### 3. 构建生产包

```bash
cd frontend && npm run build      # 产物在 frontend/dist/
```

## 主要 API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/counts` | 各内容流条数 |
| GET | `/api/news` | 新闻列表（支持 `keyword` 过滤、分页） |
| GET | `/api/images` | 图片列表 |
| GET | `/api/videos` | 视频列表 |
| GET | `/api/hot` | 社交热搜（`platform` 可选） |
| GET | `/api/search?q=` | 跨流搜索 |
| POST | `/api/crawl` | 触发后台爬虫 |

## 说明

- 数据存于本地 SQLite，运行时自动生成，不纳入版本管理。
- 爬虫使用公开 RSS / 免密接口；项目不含任何密钥或环境变量文件。
- `.codebuddy/`、`.gstack/`、`node_modules/`、`dist/`、`*.db` 等已由 `.gitignore` 排除。
