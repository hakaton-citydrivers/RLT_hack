import sys
from typing import Any, Dict, List, Optional

from pydantic import BaseSettings, HttpUrl, PostgresDsn, validator
from pydantic.networks import AnyHttpUrl

all_applications_file = 'app/data/applications.json'


class Settings(BaseSettings):

    PROJECT_NAME: str = "backend"

    SENTRY_DSN: Optional[HttpUrl] = None

    API_PATH: str = ""

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 7 * 24 * 60  # 7 days

    # BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ['*']
    BACKEND_CORS_ORIGINS: List[str] = ['*']

    # The following variables need to be defined in environment


settings = Settings()
