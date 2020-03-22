import os
from elasticsearch_dsl.connections import create_connection
from fastapi import FastAPI

from itm.search.routes import router as search_router
from itm.publishing.infrastructure.api.routes import router as publishing_router


elastic = create_connection(alias='default', hosts=[os.getenv('ELASTIC_HOST', '127.0.0.1')])

app = FastAPI()

app.include_router(search_router, prefix='/api/search/scholarships')
app.include_router(publishing_router, prefix='/api/publishing/scholarships')
