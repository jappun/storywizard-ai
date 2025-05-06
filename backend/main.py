# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.genai as genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
genai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# Allow frontend to connect to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StoryElements(BaseModel):
    place: str
    place_details: str
    name: str
    species: str
    looks: str
    details: str
    conflict: str
    rising: str
    climax: str
    falling: str
    resolution: str

@app.post("/generate")
def generate_story(elements: StoryElements):
    prompt = f"""
    Write a 500-word short story in the style of a fifth grader. 
    Come up with a title for it. Use a basic and easy plot structure.
    Fix small grammar issues if needed.

    Setting: This story takes place in {elements.place}. {elements.place} looks like {elements.place_details}.
    Protagonist: This story is about {elements.name}, who is a {elements.species}. 
    They look like {elements.looks} and these are some extra details about them: {elements.details}.
    Conflict: The main problem our protagonist faces is: {elements.conflict}.
    Rising Action: {elements.rising}
    Climax: {elements.climax}
    Falling Action: {elements.falling}
    Resolution: {elements.resolution}
    """

    try:
        story = genai_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt]
        )
        return {"story": story.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
