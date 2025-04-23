# from google import genai
import google.genai as genai
import os
from dotenv import load_dotenv


load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

elements = {"place": "", "place_details": "", "name": "", "species": "", "likes":"", "dislikes":"", "looks":"", "personality":"", "conflict":"", "rising":"", "climax":"", "falling":"", "resolution":""}

class PlotElement:
    def __init__(self, prompt, element):
        self.prompt = prompt
        self.element = element


# TODO: limit these
# place -
# main character
# - name
# - merge likes/dislikes/personality into fun facts
element_questions = [
    PlotElement("place? ", "place"),
    PlotElement("place details?  ", "place_details"),
    PlotElement("p name?  ", "name"),
    PlotElement("p species? ", "species"),
    PlotElement("p likes? ", "likes"),
    PlotElement("p dislikes? ", "dislikes"),
    PlotElement("p looks? ", "looks"),
    PlotElement("p personality? ", "personality"),
    PlotElement("conflict? ", "conflict"),
    PlotElement("rising? ",  "rising"),
    PlotElement("climax? ", "climax"),
    PlotElement("falling? ", "falling"),
    PlotElement("resolution? ", "resolution")
]


def build_story(element_questions):
    for pe in element_questions:
        elements[pe.element] = input(pe.prompt)

    prompt = "Write a 500-word short story in the style of a third grader. " \
            "Come up with a title for it. " \
            "Ensure you use a basic and easy to follow plot structure. " \
            "Below are details on key plot elements you must use. " \
            "If any of the details are illogical or grammatically incorrect, make the minimal possible corrections in your story. " \
            f"Setting: This story takes place in {elements['place']}. {elements['place']} looks like {elements['place_details']}. " \
            f"Protagonist: This story is about {elements['name']}, who is a {elements['species']}. {elements['name']} likes {elements['likes']} and dislikes {elements['dislikes']}. " \
            f"They look like {elements['looks']} and their personality is like {elements['personality']}. " \
            f"Conflict: The main problem our protagonist faces is: {elements['conflict']}. " \
            f"Rising action(s): Before solving their conflict, our protagonist tries many things and faces many obstacles. These are: {elements['rising']}. " \
            f"Climax: In the most emotionally intense part of the story, the hero solves their main conflict. They do this by {elements['climax']}. " \
            f"Falling actions: Now we wrap up our key story points. The lessons learned, the changes made, the problems solved. These are our falling actions: {elements['falling']}. " \
            f"Resolution: The story comes to an end like this: {elements['resolution']}."

    write_story(prompt)

def write_story(prompt):
    story = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt]
    )
    print(story.text)

build_story(element_questions)