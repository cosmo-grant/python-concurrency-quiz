from threading import Thread


def cpu_bound():
    sum(range(2**26))  # assume takes 3s of cpu
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)

thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
