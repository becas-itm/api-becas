import os
import json


BASE_PATH = os.path.dirname(os.path.abspath(__file__))


def load_file(filename):
    with open(os.path.join(BASE_PATH, filename), encoding='utf8') as file:
        return json.loads(file.read())


def get_country_name(code):
    countries = load_file('country_names_by_code.json')
    return countries.get(code)
