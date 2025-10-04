import asyncio


async def main():
    print(type(foo))
    bar = foo()
    print(type(bar))
    await bar


async def foo():
    print("hello")


asyncio.run(main())
