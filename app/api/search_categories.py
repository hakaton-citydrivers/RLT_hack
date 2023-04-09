from fastapi import APIRouter
import pandas as pd
import numpy as np

router = APIRouter()

DATA_PATH = 'app/data/categories.npy'


@router.get('/search-categories/{start_text}')
async def get_search_categories(start_text: str):
    """Поиск по ИНН

    Args:
        start_text (str): с каких символов начинается инн

    Returns:
        list[str]: перечислены инн
    """
    categories = np.load(DATA_PATH, allow_pickle=True)
    categories = categories[np.char.startswith(categories, start_text)]
    return categories.tolist()


@router.get('/search-categories/')
async def get_search_categories_without_text():
    """Поиск по ИНН

    Returns:
        list[str]: перечислены инн
    """
    categories = np.load(DATA_PATH, allow_pickle=True)
    return categories.tolist()
