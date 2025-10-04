import asyncio
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
