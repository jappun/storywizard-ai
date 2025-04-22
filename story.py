# # prompt:
# # write a 1 page story in the style of a third grader.
# # here are some provided details you must use.
# # the protagonist:
# #   - name
# #   - likes
# #   - dislike
# #   - personality/looks
# # the setting:
# # main conflict: 
# # rising action(s):
# # climax: 
# # resolution: 

class PlotElement:
    def __init__(self, prompt, element):
        self.prompt = prompt
        self.element = element


plot_elements = [
    PlotElement("protagonist?", "protagonist"),
    PlotElement("setting?", "setting"),
    PlotElement("conflict?", "conflict"),
    PlotElement("rising action?", "rising action"),
    PlotElement("climax?", "climax"),
    PlotElement("resolution?", "resolution")
]


def build_story(plot_elements):
    story = ""
    for pe in plot_elements:
        res = input(pe.prompt)
        detail = "the " + pe.element + " is: " + res + "\n"
        story += detail    
    print(story)

build_story(plot_elements)