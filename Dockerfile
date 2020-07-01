FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

ENV PYTHONPATH=.

WORKDIR /app

ADD requirements.txt dev_requirements.txt ./
RUN pip install --no-cache-dir -r dev_requirements.txt

COPY . ./
