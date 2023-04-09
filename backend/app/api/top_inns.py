from fastapi import APIRouter
import json
import pandas as pd
import numpy as np
import os

router = APIRouter()

DATA_PATH = 'app/data/'


# Для второй кнопки
def return_top_20_inns(category, deadline_days, is_supplier):
    if is_supplier:
        contracts_aggr = pd.read_csv(os.path.join(
            DATA_PATH, 'contracts_aggr_supplier.csv'))
    else:
        contracts_aggr = pd.read_csv(os.path.join(
            DATA_PATH, 'contracts_aggr_customer.csv'))

    contracts_aggr = contracts_aggr.query(
        f'contract_subject == "{category}" and days_in_execution <= {deadline_days}')
    output = contracts_aggr.sort_values(['id_contract', 'quality'], ascending=False)\
        .rename(columns={'inn': 'ИНН',
                         'contract_price_rub': 'средний чек руб',
                         'id_contract': 'количество успешно выполненных контрактов',
                         'advance_sum_percents': 'средний залог по сделке %',
                         'quality': 'средняя удовлетворенность контрагента %'})[['ИНН', 'количество успешно выполненных контрактов',
                                                                                 'средний чек руб', 'средний залог по сделке %', 'средняя удовлетворенность контрагента %']]

    output.fillna(0, inplace=True)
    output['средний чек руб'] = output['средний чек руб'].astype(int)
    output['средняя удовлетворенность контрагента %'] = output['средняя удовлетворенность контрагента %'].astype(
        int)
    output['средний залог по сделке %'] = output['средний залог по сделке %'].astype(
        int)

    return output.head(20)


@router.get('/top-inns/{category}/{agent}/{deadline_days}')
async def get_top_inns(category: str, agent: str, deadline_days: int):
    """Топ ИНН по конкретной категории

    Args:
        category (str): наименование категории через -
        agent (str): агент или контрагент
        deadline_days (int): за сколько дней хотят получить товар

    Returns:
        _type_: _description_
    """
    is_supplier = False if agent == 'агент' else True
    category = category.replace('-', ' ')

    print(category)
    print(is_supplier)
    print(deadline_days)

    df = return_top_20_inns(category, deadline_days, is_supplier)

    print(df.to_dict())

    return df.to_dict()
