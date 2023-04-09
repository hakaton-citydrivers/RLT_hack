from fastapi import APIRouter

from app.api import search_inns, inn, search_categories, top_inns, frontend

api_router = APIRouter()

api_router.include_router(search_inns.router, tags=["search-inns"])

api_router.include_router(inn.router, tags=["inn"])

api_router.include_router(search_categories.router, tags=["search-categories"])

api_router.include_router(top_inns.router, tags=["top-inns"])

api_router.include_router(frontend.router, tags=["/"])
