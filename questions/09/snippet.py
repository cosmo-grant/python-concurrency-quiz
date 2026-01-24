from multiprocessing import Process


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s of cpu
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1, proc2 = Process(target=cpu_bound), Process(target=cpu_bound)
    proc1.start()
    proc2.start()
    proc1.join()
    proc2.join()
    print("here")
