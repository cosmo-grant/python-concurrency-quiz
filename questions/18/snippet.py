import asyncio
from time import sleep


def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(
        asyncio.to_thread(io_bound),
        asyncio.to_thread(io_bound),
    )
    print("here")


asyncio.run(main())
