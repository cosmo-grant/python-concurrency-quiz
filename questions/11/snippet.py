from concurrent.futures import ThreadPoolExecutor
from time import sleep

with ThreadPoolExecutor() as executor:
    res = executor.submit(lambda: sleep(3))
    print(res)

print("here")
