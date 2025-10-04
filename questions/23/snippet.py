from asyncio import create_task, run


async def main():
    await create_task(foo())
    print("in main")


async def foo():
    print("in foo")


run(main())
