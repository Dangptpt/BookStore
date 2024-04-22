from fastapi.responses import RedirectResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import book, bill, import_bill, staff, statistic

app = FastAPI()

app.include_router(book.router)
app.include_router(bill.router)
app.include_router(import_bill.router)
app.include_router(staff.router)
app.include_router(statistic.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")

