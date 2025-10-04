import asyncio


async def foo():
    await asyncio.sleep(3)
    return "foo"


async def bar():
    await asyncio.sleep(1)
    return "bar"


async def main():
    results = await asyncio.gather(foo(), bar())
    print(results)


asyncio.run(main())
