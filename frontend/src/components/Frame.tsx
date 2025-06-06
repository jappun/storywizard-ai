import { useState } from 'react';
import { Progress } from './Progress';
import { Page } from './Page';
import { Question } from './Question';
import Next from './Next';
import Back from './Back';
import WizardHead from '../assets/head.svg';
import axios from "axios";
import Loading from './Loading';


const pages = [
  {
    title: "Setting",
    wizardDialogue: "Let's set the scene for our story! Where does it take place?",
    description: "The setting is where your story happens. It's where your characters will live!",
    questions: [
      { key: "place", text: "Where does your story take place? A big city? A magical forest?" },
      { key: "place_details", text: "What does this place look like?" }
    ]
  },
  {
    title: "Main Character",
    wizardDialogue: "Now, who is this story about? Tell me about our hero!",
    description: "The main character is the star of your story. They're the one who goes on the adventure!",
    questions: [
      { key: "name", text: "What is their name?" },
      { key: "species", text: "What type of creature are they? A young girl? An old man? A dragon? Something else?" },
      { key: "looks", text: "How do they look? Are they tall and smart? Short and strong?" },
      // { key: "details", text: "What is something that makes your hero special?" }
    ]
  },
  {
    title: "Conflict",
    wizardDialogue: "Uh oh! What problem does our hero face?",
    description: "The conflict is the main problem that your character needs to solve.",
    questions: [
      { key: "conflict", text: "What is the big problem in your story?" }
    ]
  },
  {
    title: "Rising Action",
    wizardDialogue: "What happens while our hero tries to solve their problem?",
    description: "The rising action is all the exciting things that happen while trying to solve the problem!",
    questions: [
      { key: "rising", text: "What does your character try to do?" }
    ]
  },
  {
    title: "Climax",
    wizardDialogue: "This is the most exciting part! How does your hero finally solve the big problem?",
    description: "The climax is the most exciting part of the story where the hero faces their biggest challenge!",
    questions: [
      { key: "climax", text: "How does your character solve the problem?" }
    ]
  },
  {
    title: "Falling Action",
    wizardDialogue: "What happens after the problem is solved?",
    description: "The falling action shows what happens after the big problem is solved.",
    questions: [
      { key: "falling", text: "What happens after the problem is solved?" }
    ]
  },
  {
    title: "Resolution",
    wizardDialogue: "It's time to wrap up our story!",
    description: "The resolution is how your story ends. It's like tying a bow on a present!",
    questions: [
      { key: "resolution", text: "How does your story end? Is it happily ever after? Does a new adventure await your hero?" }
    ]
  }
];

export const Frame = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedStory, setGeneratedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storyToDisplay, setStoryToDisplay] = useState(null);




  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const currentPageData = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;
  const [hasSubmitted, setHasSubmitted] = useState(false);


  return (
    <div className="max-w-3xl min-h-1/2 mx-auto bg-white border-4 border-yellow-200 rounded-2xl p-6 mt-8">
      {/* {isLoading ? (
        <Loading onFinish={() => {
          setGeneratedStory(storyToDisplay);
          setIsLoading(false);
        }} />
      ) :  */}
      
      {generatedStory ? (
        (() => {
          const lines = generatedStory.split("\n").filter(line => line.trim() !== "");
          const title = lines[0];
          const body = lines.slice(1).join("\n");

          return (
            <div className="p-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">{title}</h2>
              <p className="whitespace-pre-line text-lg text-purple-900">{body}</p>
            </div>
          );
        })()
      ) : (
          <>
          <Progress currentPage={currentPage + 1} totalPages={pages.length} />
      
      <div className="flex items-center gap-6 mt-8 mb-8">
        {/* <div className="w-20 h-20 rounded-full border-4 border-purple-400 bg-white flex-shrink-0"> */}
          <img src={WizardHead} alt="Wizard" className="object-contain rounded-full h-50 w-50 border-4 border-purple-400" />
        {/* </div> */}
        <div className="bg-blue-100 p-6 rounded-lg flex-grow">
          <p className="text-blue-800 text-xl font-medium">{currentPageData.wizardDialogue}</p>
        </div>
      </div>

      <Page
        title={currentPageData.title}
        description={currentPageData.description}
        wizardDialogue={currentPageData.wizardDialogue}
      >
        {currentPageData.questions.map(question => (
          <Question
            key={question.key}
            question={question.text}
            value={answers[question.key] || ''}
            onChange={(value) => handleAnswer(question.key, value)}
          />
        ))}
        
        <div className="flex justify-between mt-8">
          <Back onBack={() => setCurrentPage(prev => Math.max(0, prev - 1))} isFirstPage={currentPage === 0}/>
          <Next 
            isLastPage={isLastPage} 
            onNext={async () => {
              if (isLastPage && !hasSubmitted) {
                try {
                  setIsLoading(true); 
                  setHasSubmitted(true)
                  const res = await axios.post("http://localhost:8000/generate", answers);
                  // setStoryToDisplay(res.data.story);
                  setGeneratedStory(res.data.story);
                } catch (err) {
                  console.error("Error generating story:", err);
                  setHasSubmitted(false);
                  setIsLoading(false);
                }
              } else {
                setCurrentPage(prev => Math.min(pages.length - 1, prev + 1));
              }
            }}
            
          />
        </div>
      </Page>
      </>

        )}
      
    </div>
  );
};