from pytube import YouTube
import os
from os.path import exists
import random
import json

class Vault:

    def __init__(self: 'Vault') -> None:

        with open('./setup.json', 'r') as json_file:
            json_data = json.load(json_file)
        self.path = json_data['path']

    def url_fetch_file(self: 'Vault', url: str, extension: str) -> str:
        try:
            seed = self.gen_random_seed()
            yt    = YouTube(url.strip())

            if extension.strip() == 'mp3':
                media = yt.streams.filter(only_audio=True).order_by('bitrate').desc().first()

            elif extension.strip() == 'mp4':
                media = yt.streams.get_highest_resolution()

            else:
                raise Exception('WRONG EXTENSION ERROR \n extension must be either: \n .mp3 \n or \n .mp4')

            file_name = yt.title.replace('/', '-') + " - " + yt.author.replace('/', '-')
            file_download = file_name + '.' + extension
            file_name += ' ' + seed + '.' + extension
            out_file = media.download(output_path=self.path, filename=file_name)

            return {"file_name": file_name, "file_download": file_download}

        except Exception as error:
            raise Exception(error)
    
    def url_fetch_data(self: 'Vault', url: str) -> str:
        try:
            yt = YouTube(url.strip())

            return {'thumbnail_url':yt.thumbnail_url, 'title': yt.title, 'author': yt.author}

        except Exception as error:
            raise Exception(error)

    def release_mem(self: 'Vault', path: str) -> None:
        os.remove(self.path)

    def gen_random_seed(self: 'Vault') -> None:
        return str(int(random.uniform(1, 9) * 1_000_000))
