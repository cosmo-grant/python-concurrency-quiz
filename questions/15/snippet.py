from concurrent.futures import ThreadPoolExecutor, wait
from time import sleep


def foo():
    sleep(3)
    raise Exception


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    wait((f,))
    print("here")
