from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**25))  # assume takes 3s of cpu
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
