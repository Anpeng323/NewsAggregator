"""
NewsAggregator API Server
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import threading

from db import init_db, get_news, get_images, get_videos, get_social_hot, get_counts
from crawler import crawl_all

app = FastAPI(title="NewsAggregator API", version="1.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def root():
    return {"message": "NewsAggregator API", "version": "1.0"}


@app.get("/api/counts")
def counts():
    return get_counts()


@app.get("/api/news")
def news(
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    keyword: str = Query(None),
):
    return get_news(limit=limit, offset=offset, keyword=keyword)


@app.get("/api/images")
def images(
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    keyword: str = Query(None),
):
    return get_images(limit=limit, offset=offset, keyword=keyword)


@app.get("/api/videos")
def videos(
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    keyword: str = Query(None),
):
    return get_videos(limit=limit, offset=offset, keyword=keyword)


@app.get("/api/hot")
def hot(platform: str = Query(None)):
    return get_social_hot(platform=platform)


@app.get("/api/search")
def search(q: str = Query(...)):
    news_results = get_news(keyword=q, limit=20)
    image_results = get_images(keyword=q, limit=20)
    video_results = get_videos(keyword=q, limit=20)
    return {
        "news": news_results,
        "images": image_results,
        "videos": video_results,
        "total_news": len(news_results),
        "total_images": len(image_results),
        "total_videos": len(video_results),
    }


@app.post("/api/crawl")
def trigger_crawl():
    """触发爬虫（在后台运行）"""
    def run():
        crawl_all()
    thread = threading.Thread(target=run)
    thread.start()
    return {"message": "Crawl started in background"}


if __name__ == "__main__":
    import os
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "8765")))
