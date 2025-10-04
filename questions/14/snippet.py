from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound(t):
    sleep(t)
    return t


with ThreadPoolExecutor() as executor:
    for res in executor.map(io_bound, (5, 3, 2)):
        print(res)
    print("here")
