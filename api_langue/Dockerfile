FROM python:3.9
MAINTAINER Dan
RUN apt update -y && apt install ffmpeg -y
RUN python -m pip install --upgrade pip
RUN pip install Flask flask_cors pydub googletrans==3.1.0a0 detectlanguage googletrans gtts python-dotenv

COPY . /data/
WORKDIR /data

EXPOSE 5000
CMD [ "python", "app.py" ]