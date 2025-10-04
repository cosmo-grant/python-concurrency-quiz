import asyncio


async def foo():
    await asyncio.sleep(4)
    print("here")


async def main():
    await foo()
    await foo()
    print("done")


asyncio.run(main())
