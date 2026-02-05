import asyncio


async def foo():
    print("in foo")


async def main():
    await asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
