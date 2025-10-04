import asyncio
from time import sleep


async def main():
    await asyncio.gather(foo(), bar())


async def foo():
    sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
