import asyncio


async def main():
    bar = foo()
    print(bar)


async def foo():
    return "hello"


asyncio.run(main())
