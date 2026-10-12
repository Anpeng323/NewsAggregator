#!/usr/bin/env python3
"""
NewsAggregator 定时爬虫
循环调用 crawler.crawl_all()（增量 upsert，不会清空旧数据）。
用法: python -m crawler.scheduler  或  python backend/crawler/scheduler.py
"""
import sys
import os
import time
import signal

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import db
from crawler import crawl_all

RUNNING = True
INTERVAL_SECONDS = 900  # 15 分钟


def signal_handler(signum, frame):
    global RUNNING
    print('\n[调度] 收到停止信号，正在关闭...')
    RUNNING = False


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def main():
    print('=' * 50)
    print('🌐 NewsAggregator 定时爬虫已启动')
    print(f'⏰ 每 {INTERVAL_SECONDS // 60} 分钟爬取一次 · Ctrl+C 停止')
    print('=' * 50)

    db.init_db()

    # 首次立即爬取
    try:
        crawl_all()
    except Exception as e:
        print(f'[调度] 首次爬取异常: {e}')

    while RUNNING:
        for _ in range(INTERVAL_SECONDS):
            if not RUNNING:
                break
            time.sleep(1)
        if not RUNNING:
            break
        try:
            crawl_all()
        except Exception as e:
            print(f'[调度] 爬取异常: {e}')

    print('[调度] 已停止. 👋')


if __name__ == '__main__':
    main()
