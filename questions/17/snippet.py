import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
