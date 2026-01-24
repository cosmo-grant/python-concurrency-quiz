from concurrent.futures import ThreadPoolExecutor
from time import sleep


def foo():
    sleep(3)
    raise Exception


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    f.result()
    print("here")
