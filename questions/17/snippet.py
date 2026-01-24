import asyncio


async def main():
    asyncio.create_task(foo())
    asyncio.create_task(bar())


async def foo():
    await asyncio.sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
