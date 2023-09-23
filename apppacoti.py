from flask import Flask, render_template, request
from unidecode import unidecode
import json

app = Flask(__name__)

def buscar_linhas_com_expressao(data, expressao):
    linhas_encontradas = []
    expressao_sem_acentos = unidecode(expressao.lower())  # Remove acentuação e converte para minúsculas

    for item in data:
        nome_fantasia_sem_acentos = unidecode(item['nome_fantasia'].lower())  # Remove acentuação e converte para minúsculas
        cnae_sem_acentos = unidecode(item['cnae_fiscal_'].lower())  # Remove acentuação e converte para minúsculas

        if expressao_sem_acentos in nome_fantasia_sem_acentos or expressao_sem_acentos in cnae_sem_acentos:
            linhas_encontradas.append(item)

    return linhas_encontradas

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consulta', methods=['POST'])
def consulta():
    codigo_cnae = request.form['valor']
    caminho_arquivo_json = r'C:\Users\Marcos Reis\Documents\CNPJ\Home\pacoti.json'  # Substitua pelo caminho correto

    with open(caminho_arquivo_json, 'r', encoding='utf-8') as arquivo_json:
        data = json.load(arquivo_json)

    linhas_com_expressao = buscar_linhas_com_expressao(data, codigo_cnae)

    return render_template('resultado_consulta.html', linhas_com_expressao=linhas_com_expressao)

if __name__ == '__main__':
    app.run(debug=True)
