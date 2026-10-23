FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "--bind=0.0.0.0:8000", "main:app"]

LABEL org.opencontainers.image.source=https://github.com/Aboss3b13/RazaYouLB-324
