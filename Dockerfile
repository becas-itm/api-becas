FROM python:3.8

ENV PYTHONPATH=.

WORKDIR /usr/src/app

ADD requirements.txt dev_requirements.txt ./
RUN pip install --no-cache-dir -r dev_requirements.txt
RUN python -m spacy download es_core_news_md

COPY . .
