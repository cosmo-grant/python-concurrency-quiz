from multiprocessing import Process


def bad():
    raise Exception


if __name__ == "__main__":
    proc = Process(target=bad)
    proc.start()
    proc.join()
    print("here")
