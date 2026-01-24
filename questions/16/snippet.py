import asyncio
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
