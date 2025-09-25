FROM public.ecr.aws/docker/library/python:3.12.11-slim-bookworm

# Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=8080

WORKDIR /var/task

# 依存関係を先にインストールしてビルドキャッシュを活用
COPY pyproject.toml uv.lock ./

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir fastapi[standard]==0.117.1

# アプリケーションコードを配置
COPY ./app /var/task/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
