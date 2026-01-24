// Generated automatically. Do not edit.

const QUESTIONS = [
  {
    preface: `Let's warm up.<br />
<br />
What does this output?
`,
    code: `from time import sleep

sleep(3)
print("done")
print("here")
`,
    answers: [
      `NOT ME!
`,
      `<~3s>
done
here
`,
      `NOT ME!
`,
    ],
    correct: 1,
    explanation: `One process, one thread, no event loop.

La dolce vita.
`,
  },

  {
    preface: `Now let's add some threads. Output?
`,
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
    answers: [
      `<~3s>
here
done
done
`,
      `<~3s>
done
done
here
`,
      `here
<~3s>
done
done
`,
    ],
    correct: 2,
    explanation: `There are three threads in play: the main thread, <code>thread1</code>,
<code>thread2</code>.<br />
<br />
The main thread runs while the others are sleeping.
`,
  },

  {
    preface: `What if we <code>join()</code> them?
`,
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
    answers: [
      `here
<~3s>
done
done
`,
      `<~3s>
done
<~3s>
done
here
`,
      `<~3s>
done
done
here
`,
    ],
    correct: 1,
    explanation: `<code>join()</code> blocks until the receiver completes.
`,
  },

  {
    preface: `Does re-ordering make a difference?
`,
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
    answers: [
      `<~3s>
done
done
here
`,
      `<~3s>
done
<~3s>
done
here
`,
      `here
<~3s>
done
done
`,
    ],
    correct: 0,
    explanation: `<code>thread1.join()</code> blocks the main thread, but not
<code>thread2</code>.<br />
<br />
<code>thread1</code> and <code>thread2</code> are IO-bound, so interleaving
helps.
`,
  },

  {
    preface: `What if the threads are cpu-bound instead?
`,
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s of cpu
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
`,
    answers: [
      `here
<~3s>
done
done
`,
      `here
<~6s>
done
done
`,
      `<~6s>
done
done
here
`,
    ],
    correct: 1,
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
    preface: `Ok, let's <code>join()</code> again.
`,
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s of cpu
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
    answers: [
      `<~3s>
done
<~3s>
done
here
`,
      `<~3s>
done
done
here
`,
      `here
<~6s>
done
done
`,
    ],
    correct: 0,
    explanation: `<code>join()</code> blocks until the receiver completes.
`,
  },

  {
    preface: `Does re-ordering make a difference?
`,
    code: `from threading import Thread


def cpu_bound():
    sum(i**2 for i in range(2**26))  # assume takes 3s of cpu
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
    answers: [
      `<~3s>
done
<~3s>
done
here
`,
      `<~6s>
done
done
here
`,
      `here
<~3s>
done
<~3s>
done
`,
    ],
    correct: 1,
    explanation: `<code>thread1.join()</code> blocks the main thread, but not
<code>thread2</code>.<br />
<br />
<code>thread1</code> and <code>thread2</code> are CPU-bound, so interleaving
doesn't help.
`,
  },

  {
    preface: `This is just like the previous question, right?
`,
    code: `from threading import Thread


def cpu_bound():
    sum(range(2**26))  # assume takes 3s of cpu
    print("done")


thread1, thread2 = Thread(target=cpu_bound), Thread(target=cpu_bound)

thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
    answers: [
      `<~6s>
done
done
here
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
    explanation: `Careful!<br />
<br />
The interpreter won't pause a thread while it's running native code, like
<code>sum()</code> does.
`,
  },

  {
    preface: `Let's swap threads for processes.
`,
    code: `from multiprocessing import Process
from time import sleep


def io_bound():
    sleep(3)
    print("done")


if __name__ == "__main__":
    # assume running on multicore machine
    proc1, proc2 = Process(target=io_bound), Process(target=io_bound)

    proc1.start()
    proc2.start()
    print("here")
`,
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
For IO-bound targets, threads might be the better choice.
`,
  },

  {
    preface: `Just like Question 5, but with processes instead of threads.
`,
    code: `from multiprocessing import Process


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
`,
    answers: [
      `TODO
`,
      `<~6s>
done
done
here
`,
      `<~3s>
done
done
here
`,
    ],
    correct: 2,
    explanation: `Process objects run in separate Python processes, each with their own GIL.<br />
<br />
So they can run in parallel on multicore machines.<br />
<br />
For CPU-bound processes, running in parallel helps.
`,
  },

  {
    preface: `Starting and joining by hand is tricky. The standard library provides some
helpful higher-level constructs. Know how they work?
`,
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def io_bound():
    sleep(4)
    print("done")


with ThreadPoolExecutor() as executor:
    for _ in range(3):
        executor.submit(io_bound)
    print("foo")

print("bar")
`,
    answers: [
      `TODO
`,
      `<~4s>
done
<~4s>
done
<~4s>
done
here
bar
`,
      `foo
<~4s>
done
done
done
bar

`,
    ],
    correct: 2,
    explanation: `The context manager's <code>__exit__</code> blocks until the threads are done
and the resources freed.
`,
  },

  {
    preface: `Can you predict the <code>Future</code>?
`,
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
    answers: [
      `<~3s>
42
here
`,
      `Exception
`,
      `None 
here
`,
    ],
    correct: 0,
    explanation: `<code>submit()</code> returns a <code>Future</code>.

<code>Future</code>s encapsulate async calls, letting you queue them, query
their state, get their results etc.

<code>result()</code> gets the call's return value, blocking until it's
available.
`,
  },

  {
    preface: `What if threads go bad?
`,
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
    answers: [
      `<~3s>
Exception
`,
      `<~3s>
here
`,
      `<~3s>
None
here
`,
    ],
    correct: 1,
    explanation: `Raising an exception is one way for a future to complete.<br />
<br />
<code>wait()</code> blocks until the receiver completes, but doesn't raise the
exception.
`,
  },

  {
    preface: `Same or different?
`,
    code: `from concurrent.futures import ThreadPoolExecutor
from time import sleep


def foo():
    sleep(3)
    raise Exception


with ThreadPoolExecutor() as executor:
    f = executor.submit(foo)
    f.result()
    print("here")
`,
    answers: [
      `<~3s>
here
`,
      `<~3s>
None
here
`,
      `<~3s>
Exception
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
    preface: `A third approach to concurrency: <code>async</code> and <code>await</code>.
`,
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
    answers: [
      `<~3s>
hello
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `A function defined with <code>async def</code> is a coroutine function and
returns a coroutine.<br />
<br />
Awaiting a coroutine blocks until that coroutine has completed.<br />
<br />
An <code>await</code> expression's value is whatever the awaited coroutine
returns.
`,
  },

  {
    preface: `Ever forgotten <code>await</code>?
`,
    code: `import asyncio
from time import sleep


async def main():
    bar = foo()
    print(bar)


async def foo():
    sleep(3)
    return "hello"


asyncio.run(main())
`,
    answers: [
      `<~3s>
hello
`,
      `TODO
`,
      `<coroutine object foo at 0x100>
`,
    ],
    correct: 2,
    explanation: `A function defined with <code>async def</code> is a coroutine function and
returns a coroutine.<br />
<br />
To actually run a coroutine you need to e.g. <code>await</code> it.
`,
  },

  {
    preface: `Output?
`,
    code: `import asyncio
from time import sleep


async def main():
    asyncio.create_task(foo())
    asyncio.create_task(bar())


async def foo():
    sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
`,
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
    explanation: `<code>sleep()</code> blocks the one and only thread.
`,
  },

  {
    preface: `Is <code>asyncio.sleep</code> any help?
`,
    code: `import asyncio


async def main():
    asyncio.create_task(foo())
    asyncio.create_task(bar())


async def foo():
    await asyncio.sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
`,
    answers: [
      `TODO
`,
      `<~3s>
in foo
in bar
`,
      `in bar
<~3s>
in foo
`,
    ],
    correct: 2,
    explanation: `<code>asyncio.sleep()</code> passes control back to the event loop, so it can
drive other coroutines.
`,
  },

  {
    preface: `Output?
`,
    code: `import asyncio
from time import sleep


def file_io():
    sleep(4)
    print("done")


async def main():
    await asyncio.gather(
        file_io(),
        asyncio.to_thread(file_io),
        asyncio.sleep(4),
    )
    print("here")


asyncio.run(main())
`,
    answers: [
      `<~4s>
done
here
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>asyncio.to_thread()</code> runs the passed function in a separate thread,
returning a coroutine.<br />
<br />
<code>sleep()</code> releases the GIL so control can pass back to the main
thread.
`,
  },

  {
    preface: `Output?
`,
    code: `import asyncio


async def foo():
    print("in foo")


async def main():
    asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
    answers: [
      `TODO
`,
      `TODO
`,
      `in main
in foo
`,
    ],
    correct: 2,
    explanation: `<code>create_task()</code> schedules the task for execution.<br />
<br />
But no <code>await</code>, so the <code>main()</code> coroutine keeps control.
`,
  },

  {
    preface: `Just like Question 1, but with threads.
`,
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
    answers: [
      `<~4s>
here
<~4s>
here
done
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `<code>asyncio.sleep</code> passes control to the event loop, but there's no
other work scheduled.
`,
  },

  {
    preface: `Output?
`,
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
    answers: [
      `in bar
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
No <code>await</code>, so the <code>main()</code> coroutine keeps control.<br />
<br />
Awaiting a coroutine doesn't cede control to the event loop.
`,
  },

  {
    preface: `Output?
`,
    code: `import asyncio


async def foo():
    print("in foo")


async def main():
    foo_coro = foo()
    await asyncio.create_task(foo_coro)
    print("in main")


asyncio.run(main())
`,
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
    explanation: `Awaiting a task cedes control to the event loop.
`,
  },

  {
    preface: `Output?
`,
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
    answers: [
      `in bar
in foo
`,
      `TODO
`,
      `TODO
`,
    ],
    correct: 0,
    explanation: `Awaiting a coroutine doesn't cede control to the event loop.
`,
  },

  {
    preface: `Output?
`,
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
];
