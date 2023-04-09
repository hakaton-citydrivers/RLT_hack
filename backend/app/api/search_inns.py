from fastapi import APIRouter
import json
import pandas as pd

router = APIRouter()

DATA_PATH = 'app/data/inn_list.csv'


@router.get('/search-inns/{start_text}')
async def get_search_inns(start_text: str):
    """Поиск по ИНН

    Args:
        start_text (str): с каких символов начинается инн

    Returns:
        list[str]: перечислены инн
    """
    df = pd.read_csv(DATA_PATH, dtype=str)
    df = df[df['inn'].str.startswith(start_text)]
    return df.head(100)['inn'].to_list()


@router.get('/search-inns/')
async def get_search_inns_without_text():
    """Поиск по ИНН

    Returns:
        list[str]: перечислены инн
    """
    df = pd.read_csv(DATA_PATH, dtype=str)
    return df.head(100)['inn'].to_list()
