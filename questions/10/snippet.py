from multiprocessing import Process
from time import sleep


def io_bound():
    sleep(3)
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1 = Process(target=io_bound)
    proc2 = Process(target=io_bound)
    proc1.start()
    proc2.start()
    print("here")
