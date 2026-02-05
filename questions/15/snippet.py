import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("here")


async def main():
    await io_bound()
    await io_bound()
    print("done")


asyncio.run(main())
