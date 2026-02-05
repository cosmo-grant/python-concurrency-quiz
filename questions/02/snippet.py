from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread2.start()
print("here")
