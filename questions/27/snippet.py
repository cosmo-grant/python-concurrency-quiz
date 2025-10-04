import asyncio


async def foo():
    await asyncio.sleep(4)


async def main():
    await asyncio.gather(foo(), foo())
    print("done")


asyncio.run(main())
