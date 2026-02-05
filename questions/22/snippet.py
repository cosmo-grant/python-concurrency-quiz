import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await asyncio.create_task(bar())


asyncio.run(main())
