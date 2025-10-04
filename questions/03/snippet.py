from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
