from fastapi import FastAPI, Depends

from itm.shared.utils.auth import verify_token
from itm.search.routes import router as search_router

from itm.users.auth import router as auth_router
from itm.users.routes import router as users_router
from itm.publishing.infrastructure.api.routes import router as publishing_router
from itm.entity.infrastructure.api.routes import router as entity_router

app = FastAPI()


@app.get('/api/ping')
def ping_status():
    return {'status': "It's alive"}


app.include_router(search_router, prefix='/api/search/scholarships')

app.include_router(publishing_router,
                   prefix='/api/publishing/scholarships',
                   dependencies=[Depends(verify_token)])

app.include_router(users_router,
                   prefix='/api/users',
                   dependencies=[Depends(verify_token)])

app.include_router(entity_router,
                   prefix='/api/entities',
                   dependencies=[Depends(verify_token)])

app.include_router(auth_router, prefix='/api/auth')
