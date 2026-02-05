import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
