import os

from elasticsearch_dsl.connections import create_connection

from app import app


elastic = create_connection(alias='default', hosts=[os.getenv('ELASTIC_HOST', '127.0.0.1')])

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host=os.getenv('APP_HOST', '0.0.0.0'), port=int(os.getenv('APP_PORT', 3001)))
