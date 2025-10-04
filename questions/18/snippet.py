import asyncio
from time import sleep


async def main():
    bar = await foo()
    print(bar)


async def foo():
    sleep(3)
    return "hello"


asyncio.run(main())
