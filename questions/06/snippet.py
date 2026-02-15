from threading import Thread


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(i**2 for i in range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
