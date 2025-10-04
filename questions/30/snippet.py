import asyncio


async def foo():
    print("in foo")


async def main():
    foo_coro = foo()
    await asyncio.create_task(foo_coro)
    print("in main")


asyncio.run(main())
