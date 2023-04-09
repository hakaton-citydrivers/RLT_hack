from fastapi import APIRouter
from starlette.responses import FileResponse

router = APIRouter()


@router.get('/')
async def get_frontend():
    """Получить фронт

    Returns:
        HTML: HTML-страница
    """
    return FileResponse("static/index.html")
