from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from googlescrape import scrape_google

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"]
)

@app.get('/')
async def heh():
    return "Hello Kashif"



@app.get("/api/{bar}")
async def scraping(bar: int):
    return {"result": scrape_google(bar)}
