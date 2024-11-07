FROM python:3.9-slim

RUN useradd -m appuser

WORKDIR /app

COPY app/ /app
RUN pip install -r requirements.txt

USER appuser

EXPOSE 5000

CMD ["python", "app.py"]
