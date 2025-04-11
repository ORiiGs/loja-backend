FROM node:18-slim

# novamente define o diretorio de trabalho
WORKDIR /app

#instala dependências necessárias para compilar certos módulos como python3 cujo é necessário para o node-gyp e o mage/g++ que são compiladores C/C++ tambem para módulos que usam código nativo
RUN apt-get update && apt-get install -y python3 make g++

# copia os arquivos que definem as dependências
COPY package*.json ./
# copia os templates de variaveis de ambiente
COPY .env .env.example ./
# instala todas as dependências do projeto incluindo as de desenvolvimento
RUN npm install --include=dev
#copia todo o código fonte para o diretorio
COPY . .

#define a porta padrão 
ENV PORT=3000
#expoe a porte para acesso externo
EXPOSE ${PORT}
#comando para iniciar a aplicação mirado no index
CMD ["node", "src/index.js"]

#Devidamente otimizado