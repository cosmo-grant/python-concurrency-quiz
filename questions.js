// Generated automatically. Do not edit.

const QUESTIONS = [
  {
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `here
<~6s>
done
done
`,
    ],
    correct: 2,
    explanation: `There are three threads in play: main, <code>thread1</code>,
<code>thread2</code>.<br />
<br />
The interpreter pauses the running thread regularly, releasing the GIL, and the
OS decides which to run next.<br />
<br />
<code>thread1</code> and <code>thread2</code> are CPU-bound, so interleaving
doesn't help.
`,
  },

  {
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~3s>
done
<~3s>
done
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>join()</code> blocks until the receiver completes.
`,
  },

  {
    code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    task = asyncio.create_task(foo())
    await asyncio.create_task(bar())
    await task


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `in foo
in bar
`,
    ],
    correct: 2,
    explanation: `Awaiting a task cedes control to the event loop.
`,
  },

  {
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
    question: "Output?",
    answers: [
      `<~6s>
done
done
here
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>thread1.join()</code> blocks the main thread, but not
<code>thread2</code>.<br />
<br />
<code>thread1</code> and <code>thread2</code> are CPU-bound, so interleaving
doesn't help.
`,
  },

  {
    code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1, thread2 = Thread(target=io_bound), Thread(target=io_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~3s>
done
done
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>thread1.join()</code> blocks the main thread, but not
<code>thread2</code>.<br />
<br />
<code>thread1</code> and <code>thread2</code> are IO-bound, so interleaving
helps.
`,
  },

  {
    code: `import asyncio


async def main():
    await asyncio.gather(foo(), bar())


async def foo():
    await asyncio.sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `in bar
<~3s>
in foo
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>asyncio.sleep()</code> passes control back to the event loop, so it can
drive other coroutines.
`,
  },

  {
    code: `import asyncio
from time import sleep


async def main():
    bar = await foo()
    print(bar)


async def foo():
    sleep(3)
    return "hello"


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~3s>
hello
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>await</code> suspends the current coroutine until the awaited coroutine
returns.<br />
<br />
An <code>await</code> expression's value is whatever the awaited coroutine
returns.
`,
  },

  {
    code: `import asyncio


async def foo():
    await asyncio.sleep(4)


async def main():
    await asyncio.gather(foo(), foo())
    print("done")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `<~4s>
done
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>asyncio.gather()</code> schedules passed coroutines as tasks.<br />
<br />
<code>asyncio.sleep()</code> passes control back to the event loop.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep

with ThreadPoolExecutor() as executor:
    res = executor.submit(lambda: sleep(3))
    print(res)

print("here")
`,
    question: "Output?",
    answers: [
      `<Future at 0x100 state=running>
<~3s>
here
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>Future</code> objects encapsulate asynchronous calls, letting you queue
them, query their state, get their results etc.
`,
  },

  {
    code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await bar()


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `in bar
in foo
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>create_task()</code> schedules the task for execution.<br />
<br />
No <code>await</code>, so the <code>main()</code> coroutine keeps control.<br />
<br />
Awaiting a coroutine doesn't cede control to the event loop.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def foo():
    sleep(3)
    raise Exception


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    try:
        f.result()
    except Exception:
        print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<~3s>
here
`,
    ],
    correct: 2,
    explanation: `Raising an exception is one way to complete the future.<br />
<br />
<code>result()</code> blocks until the future's complete, then raises the same
exception.
`,
  },

  {
    code: `import asyncio


async def foo():
    await asyncio.sleep(4)
    print("here")


async def main():
    await foo()
    await foo()
    print("done")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<~4s>
here
<~4s>
here
done
`,
    ],
    correct: 2,
    explanation: `<code>await coro</code> passes control to <code>coro</code>, suspending the
current coroutine until it returns.<br />
<br />
During the sleeps, there's no other work scheduled.
`,
  },

  {
    code: `import asyncio


async def main():
    print(type(foo))
    bar = foo()
    print(type(bar))
    await bar


async def foo():
    print("hello")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<class 'function'>
<class 'coroutine'>
hello
`,
    ],
    correct: 2,
    explanation: `A function defined with <code>async def</code> is a coroutine function and
returns a coroutine.<br />
<br />
Awaiting a coroutine blocks until that coroutine has completed.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound():
    sleep(4)
    print("done")


with ThreadPoolExecutor() as executor:
    for _ in range(3):
        executor.submit(io_bound)

print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~4s>
done
done
done
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `The <code>ThreadPoolExecutor</code> class provides a high-level API for
executing calls in multiple threads.<br />
<br />
The context manager's <code>__exit__</code> blocks until the threads are done
and the resources freed.
`,
  },

  {
    code: `import asyncio


async def main():
    bar = foo()
    print(bar)


async def foo():
    return "hello"


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<coroutine object foo at 0x100>
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `A function defined with <code>async def</code> is a coroutine function and
returns a coroutine.<br />
<br />
To actually run a coroutine you need to e.g. <code>await</code> it.
`,
  },

  {
    code: `import asyncio
from time import sleep


def file_io():
    sleep(4)
    print("done")


async def main():
    await asyncio.gather(
        asyncio.to_thread(file_io),
        asyncio.sleep(4),
    )
    print("here")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~4s>
done
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `<code>asyncio.to_thread()</code> runs the passed function in a separate thread,
returning a coroutine.<br />
<br />
<code>sleep()</code> releases the GIL so control can pass back to the main
thread.
`,
  },

  {
    code: `import asyncio
from time import sleep


async def main():
    await asyncio.gather(foo(), bar())


async def foo():
    sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `<~3s>
in foo
in bar
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>time.sleep()</code> blocks the one and only thread.
`,
  },

  {
    code: `from multiprocessing import Process


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1, proc2 = Process(target=cpu_bound), Process(target=cpu_bound)
    proc1.start()
    proc2.start()
    proc1.join()
    proc2.join()
    print("here")
`,
    question: "Output?",
    answers: [
      `<~3s>
done
done
here
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `Process objects run in separate Python processes, each with their own GIL.<br />
<br />
So they can run in parallel on multicore machines.<br />
<br />
For CPU-bound processes, running in parallel helps.<br />
<br />
The basic API is similar to <code>threading</code>.
`,
  },

  {
    code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1, thread2 = Thread(target=io_bound), Thread(target=io_bound)
thread1.start()
thread2.start()
print("here")
`,
    question: "Output?",
    answers: [
      `here
<~3s>
done
done
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `There are three threads in play: main, <code>thread1</code>,
<code>thread2</code>.<br />
<br />
The interpreter pauses the running thread regularly, releasing the GIL, and the
OS decides which to run next.<br />
<br />
<code>thread1</code> and <code>thread2</code> are IO-bound, so interleaving
helps.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound():
    sleep(4)
    print("done")


with ThreadPoolExecutor() as executor:
    for _ in range(3):
        executor.submit(io_bound)
    print("here")
`,
    question: "Output?",
    answers: [
      `here
<~4s>
done
done
done
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `The <code>ThreadPoolExecutor</code> class provides a high-level API for
executing callables in multiple threads.<br />
<br />
The context manager's <code>__exit__</code> blocks until the threads are done
and the resources freed.
`,
  },

  {
    code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    task = asyncio.create_task(foo())
    await bar()
    await task


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `in bar
in foo
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `Awaiting a coroutine doesn't cede control to the event loop.
`,
  },

  {
    code: `import asyncio


async def foo():
    print("in foo")


async def main():
    foo_coro = foo()
    await asyncio.create_task(foo_coro)
    print("in main")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `in foo
in main
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `Awaiting a task cedes control to the event loop.
`,
  },

  {
    code: `from threading import Thread


def cpu_bound():
    sum(range(2**28))  # assume takes 4s
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)

thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
    question: "Output?",
    answers: [
      `<~4s>
done
<~4s>
done
here`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `Careful!<br />
<br />
The interpreter doesn't pause a thread while it's running native code, like
<code>sum()</code> does.
`,
  },

  {
    code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1, thread2 = Thread(target=io_bound), Thread(target=io_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<~3s>
done
<~3s>
done
here
`,
    ],
    correct: 2,
    explanation: `<code>join()</code> blocks until the receiver completes. 
`,
  },

  {
    code: `from multiprocessing import Process
from time import sleep


def io_bound():
    sleep(3)
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1, proc2 = Process(target=io_bound), Process(target=io_bound)

    proc1.start()
    proc2.start()
    print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `here
<~3s>
done
done
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `Process objects run in separate Python processes, each with their own GIL.<br />
<br />
So they can run in parallel on multicore machines.<br />
<br />
For IO-bound targets, you could use threads instead.<br />
<br />
The basic API is similar to <code>threading</code>.
`,
  },

  {
    code: `import asyncio


async def foo():
    await asyncio.sleep(3)
    return "foo"


async def bar():
    await asyncio.sleep(1)
    return "bar"


async def main():
    results = await asyncio.gather(foo(), bar())
    print(results)


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<~3s>
['foo', 'bar']
`,
    ],
    correct: 2,
    explanation: ``,
  },

  {
    code: `from asyncio import create_task, run


async def main():
    await create_task(foo())
    print("in main")


async def foo():
    print("in foo")


run(main())
`,
    question: "Output?",
    answers: [
      `in foo
in main
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `Awaiting an awaitable (here, a <code>Task</code>) transfers control to it.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor, wait
from time import sleep


def foo():
    sleep(3)
    raise Exception


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    wait((f,))
    print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~3s>
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `Raising an exception is one way for a future to complete.<br />
<br />
<code>wait()</code> blocks until the future completes, but doesn't raise the
exception.
`,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def foo():
    sleep(3)
    return 42


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    print(f.result())
    print("here")
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `TODO
`,
      `<~3s>
42
here
`,
    ],
    correct: 2,
    explanation: `Futures encapsulate asynchronous calls.<br />
<br />
<code>result()</code> gets the call's return value, blocking until it's
available.
`,
  },

  {
    code: `from concurrent.futures import (
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
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~1s>
1
<~1s>
2
<~1s>
3
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: ``,
  },

  {
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound(t):
    sleep(t)
    return t


with ThreadPoolExecutor() as executor:
    for res in executor.map(io_bound, (5, 3, 2)):
        print(res)
    print("here")
`,
    question: "Output?",
    answers: [
      `<~5s>
5
3
2
here
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>map()</code> submits the calls to the executor and returns an iterator
which yields the results in the order submitted, blocking when necessary.
`,
  },

  {
    code: `import asyncio


async def foo():
    print("in foo")


async def main():
    asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `in main
in foo
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>create_task()</code> schedules the task for execution.<br />
<br />
But no <code>await</code>, so the <code>main()</code> coroutine keeps control.
`,
  },

  {
    code: `import asyncio
from time import sleep


async def file_io():
    sleep(4)
    print("done")


async def main():
    await asyncio.gather(
        file_io(),
        asyncio.sleep(4),
    )
    print("here")


asyncio.run(main())
`,
    question: "Output?",
    answers: [
      `TODO
`,
      `<~4s>
done
<~4s>
here
`,
      `TODO
`,
    ],
    correct: 1,
    explanation: `File IO blocks the one and only thread.<br />
<br />
It doesn't pass control back to the event loop.
`,
  },
];
