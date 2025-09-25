

## memo

macのcontainerで動かすコマンド

```bash
% container system start
% cd backend/
# 名前はappじゃない方が良かったかも
% container build -t app .
% container run -p 80:80 app
```