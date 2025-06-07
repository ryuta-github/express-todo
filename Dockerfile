FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# npm パッケージをインストール
RUN npm install

# ts-node-dev をグローバルにインストール
RUN npm install -g ts-node-dev

# ソースコードをコピー
COPY . .

# アプリケーションを起動
CMD ["npm", "run", "dev"]