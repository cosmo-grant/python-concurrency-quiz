from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound():
    sleep(4)
    print("done")


with ThreadPoolExecutor() as executor:
    for _ in range(3):
        executor.submit(io_bound)
    print("here")
