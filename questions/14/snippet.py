import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await io_bound()
    await io_bound()
    print("here")


asyncio.run(main())
