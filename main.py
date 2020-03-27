import os

import firebase_admin

from fastapi import FastAPI, Depends

from elasticsearch_dsl.connections import create_connection

from itm.shared.utils.auth import verify_token
from itm.search.routes import router as search_router
from itm.publishing.infrastructure.api.routes import router as publishing_router

from itm.users.routes import router as users_router


elastic = create_connection(alias='default', hosts=[os.getenv('ELASTIC_HOST', '127.0.0.1')])

firebase_admin.initialize_app()

app = FastAPI()

app.include_router(search_router, prefix='/api/search/scholarships')

app.include_router(publishing_router,
                   prefix='/api/publishing/scholarships',
                   dependencies=[Depends(verify_token)])

app.include_router(users_router,
                   prefix='/api/users',
                   dependencies=[Depends(verify_token)])
