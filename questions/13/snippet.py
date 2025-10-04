from concurrent.futures import (
    ThreadPoolExecutor,
    as_completed,
)
from time import sleep


def io_bound(t):
    sleep(t)
    return t


with ThreadPoolExecutor() as executor:
    futures = [
        executor.submit(io_bound, 3),
        executor.submit(io_bound, 1),
        executor.submit(io_bound, 2),
    ]
    for f in as_completed(futures):
        print(f.result())
    print("here")
