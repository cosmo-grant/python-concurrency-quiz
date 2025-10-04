import asyncio


async def main():
    await asyncio.gather(foo(), bar())


async def foo():
    await asyncio.sleep(3)
    print("in foo")


async def bar():
    print("in bar")


asyncio.run(main())
