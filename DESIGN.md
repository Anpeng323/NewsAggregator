# Design System — NewsAggregator

## Product Context
- **What this is**: 一站式网络内容聚合平台（新闻 / 图片 / 视频 / 热搜），聚合多源公开数据并可视化展示。
- **Who it's for**: 想在一个界面里浏览全网热点的信息消费者、内容运营、产品/技术观察者。
- **Space/industry**: 个人新闻聚合器 / 信息仪表盘。
- **Project type**: Web app（仪表盘式内容流）。

## Aesthetic Direction
- **Direction**: Restrained Cyberpunk（克制型赛博朋克）—— 深空底色 + 分层玻璃 + 霓虹仅做交互/焦点点缀。
- **Decoration level**: intentional（极淡扫描线/网格底纹；玻璃卡片内高光描边 + 多层柔影；发光只在 hover/active 点亮）。
- **Mood**: 像深夜作战室的一块数据大屏——冷静、锐利、有科技张力，但不刺眼、不廉价。

## Typography
- **Display/Heading**: Poppins 700（标题 28px，卡片标题 18px/600）。
- **Body**: Poppins 400（正文 14px，辅助 12px）。
- **Data/Mono**: JetBrains Mono —— 专门承载排名序号、热度值、时间戳、来源标签、分辨率、时长。这是赛博朋克「数据感」核心，提升扫读效率。统一加 `.font-data`（等宽 + `tabular-nums` 数字对齐）。
- **Loading**: Google Fonts（Poppins + JetBrains Mono）。
- **Scale**: h1 28 / h2 22 / h3 18 / body 14 / caption 12（8px 基准模数）。

## Color
- **Approach**: balanced + 霓虹仅作 accent（克制用光，避免 flooding）。
- **Background（分层，避免纯黑）**:
  - `--color-space-900: #0a0e17`（深空黑，全局底）
  - `--color-space-800: #0f172a`（卡片/面板底）
  - `--color-space-700: #131c2e`（悬浮/弹层，比 surface 亮一档做深度）
  - `--color-space-600: #1e293b`（占位/分隔）
- **Text**:
  - `--color-text-primary: #f8fafc`（主文字，非纯白降饱和）
  - `--color-text-secondary: #94a3b8`（次要/元信息）
  - `--color-text-muted: #64748b`（弱信息）
- **Neon（点缀，仅交互/焦点/排名）**:
  - `--color-neon-cyan: #00d4ff`（主交互、focus 环、active tab 下划线）
  - `--color-neon-purple: #a855f7`（次级渐变、激活分类、装饰光晕）
- **Semantic**:
  - `--color-profit: #10b981`（实时/在线状态点 LIVE）
  - `--color-hot: #f59e0b`（热搜高亮/CRAWLING 状态）
  - `--color-loss: #ef4444`（错误/关闭按钮）
- **Dark mode**: 通过 `--color-space-*` 三级分层实现深度；霓虹饱和度在深底上已降一档，避免暗色下刺眼。

## Spacing
- **Base unit**: 8px。
- **Density**: comfortable。
- **Scale**: 2xs(4) xs(8) sm(12) md(16) lg(24) xl(32) 2xl(48) 3xl(64)。
- **Border radius（分层）**: sm:6 / md:10 / lg:16 / full:9999px（玻璃卡片用 16，按钮/标签用 full 或 sm）。

## Layout
- **Approach**: grid-disciplined（卡片网格可预测，桌面 4 列 / 平板 2–3 列 / 手机 1–2 列）。
- **破格点（仪表化 Header）**: 顶部一条流动的青→紫渐变细线（`.scanline` 顶部流动 + `.header-flow` Header 底边流动）；Header 含左侧霓虹标题、右侧等宽统计数字 + LIVE/CRAWLING 状态点（绿=实时 / 琥珀=抓取中）+ 刷新按钮（发光边框）。制造「聚合平台」身份。
- **Max content width**: 内容区 `max-w-3xl` 用于热搜排行，其余铺满。
- **导航**: TabNav 在 Header 下方。

## Motion
- **Approach**: intentional（微动效，不喧宾夺主）。
- **Easing**: enter(ease-out) / exit(ease-in) / move(ease-in-out)。
- **Duration**: micro(60-100ms) short(150-250ms) medium(250-400ms)。
- **具体**: 卡片入场上浮淡入（`animate-fadeIn` stagger）；active tab 霓虹呼吸（`animate-neonPulse`）；hover 微抬升(-3px) + 边框发光 + 内高光；加载霓虹骨架闪烁（`skeleton`/`shimmer`）；Tab 切换滑动过渡；Modal 缩放淡入；顶部/Header 流动渐变线（`scanline`/`headerFlow`）。

## Component-Level Rules
- **Header**: 流动渐变线 + 状态点（LIVE 绿 / CRAWLING 琥珀，带 glow）+ 等宽统计数字 + 刷新按钮（focus/hover 青色发光环）。
- **TabNav**: 未激活 muted 灰；激活态青色底 + 边框 + 微光。
- **SearchBar**: `<input>` 全宽圆角，聚焦时边框 `--color-neon-cyan` 发光（ring）。
- **CategoryFilter**: 标签为 `<button>`，激活态紫底 + 等宽标签文字；横向滚动。
- **NewsCard**: 顶部来源等宽标签（cyan）+ 时间（mono）；标题 2 行截断；摘要 2–3 行 muted；底部 ≤3 关键词 chips（purple 描边）。hover 抬升发光。
- **ImageCard**: 缩略图封面（object-cover）；角标摄影师（mono）+ 分辨率 `{width}p`（mono 紫）；hover 轻微放大 + 边框发光。
- **VideoCard**: 封面 + 居中播放键（hover 浮现，半透明圆 + 青色描边）；角标时长（mono）；hover 抬升发光。
- **HotCard**: 左侧序号（mono，大号，前 3 名用青/紫/琥珀渐变 + 奖杯 + `drop-shadow`）；标题；右侧热度值（mono，hot 色）；平台 chip（mono，rose）；时间（mono）。hover 行高亮。
- **Modals**: 毛玻璃深色遮罩（`bg-black/88` + `backdrop-blur`）；居中卡片 `.glass-elevated`（比卡片亮一档做深度）+ 霓虹外发光；右上角关闭按钮（rose，hover 变亮）。视频 Modal 内嵌 `<video controls autoPlay>`；图片 Modal 大图；新闻 Modal 全文 + 原文链接（cyan）。

## Tailwind v4 令牌映射（index.css @theme）
```css
@import "tailwindcss";
@theme {
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-space-900: #0a0e17;
  --color-space-800: #0f172a;
  --color-space-700: #131c2e;
  --color-space-600: #1e293b;
  --color-neon-cyan: #00d4ff;
  --color-neon-purple: #a855f7;
  --color-profit: #10b981;
  --color-loss: #ef4444;
  --color-hot: #f59e0b;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
}
```
辅助类（自定义）:`glass-card` / `glass-elevated`（分层玻璃）、`font-data`（等宽数字）、`scanline` / `header-flow`（流动渐变线）、`skeleton` / `shimmer`（霓虹骨架）、`neon-text`、`animate-fadeIn` / `animate-neonPulse`。

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-12 | 方向定为克制型赛博朋克 | 原视觉「效果不好」根因是霓虹铺满+纯黑+无层级；竞品研究支持克制用光 |
| 2026-10-12 | 引入 JetBrains Mono 承载数据 | Hacker News 序号排名经验 + 赛博朋克数据感，提升扫读 |
| 2026-10-12 | 保留色板但分层（900/800/700/600） | 避免纯黑伤眼，用层级做深度 |
| 2026-10-12 | Header 仪表化破格（流动渐变线 + 状态点） | 让「聚合」身份成为视觉主角 |
| 2026-10-12 | 前 3 名热搜用青/紫/琥珀渐变 + 奖杯 | 制造排行榜张力，呼应赛博朋克数据感 |
