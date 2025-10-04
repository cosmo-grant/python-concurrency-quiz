import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    task = asyncio.create_task(foo())
    await bar()
    await task


asyncio.run(main())
