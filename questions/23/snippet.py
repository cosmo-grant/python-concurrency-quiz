import asyncio


async def foo():
    raise Exception


async def bar():
    await asyncio.sleep(3)
    print("here")


async def main():
    await asyncio.gather(foo(), bar())
    print("done")


asyncio.run(main())
