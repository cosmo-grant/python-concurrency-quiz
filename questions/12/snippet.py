from concurrent.futures import ThreadPoolExecutor
from time import sleep


def foo():
    sleep(3)
    return 42


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    print(f.result())
    print("here")
