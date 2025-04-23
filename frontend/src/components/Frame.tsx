import { useState } from 'react';
import { Progress } from './Progress';
import { Page } from './Page';
import { Question } from './Question';

const pages = [
  {
    title: "Setting",
    wizardDialogue: "Let's set the scene for our magical story! Where does it take place?",
    description: "The setting is where and when your story happens. It's like creating the world where your characters will live!",
    questions: [
      { key: "place", text: "Where does your story take place?" },
      { key: "place_details", text: "What does this place look like?" }
    ]
  },
  {
    title: "Main Character",
    wizardDialogue: "Now, who is this story about? Tell me about our hero!",
    description: "The main character is the star of your story. They're the one who goes on the adventure!",
    questions: [
      { key: "name", text: "What is their name?" },
      { key: "species", text: "What kind of creature are they?" },
      { key: "looks", text: "What do they look like?" },
      { key: "details", text: "Tell me something special about them!" }
    ]
  },
  {
    title: "Conflict",
    wizardDialogue: "Uh oh! What problem does our hero face?",
    description: "The conflict is the big problem that your character needs to solve.",
    questions: [
      { key: "conflict", text: "What is the main problem in your story?" }
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
    wizardDialogue: "This is the most exciting part! How does your hero solve their problem?",
    description: "The climax is the most exciting part of the story where the hero faces their biggest challenge!",
    questions: [
      { key: "climax", text: "How does your character solve their problem?" }
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
    wizardDialogue: "Let's wrap up our story with a happy ending!",
    description: "The resolution is how your story ends. It's like tying a bow on a present!",
    questions: [
      { key: "resolution", text: "How does your story end?" }
    ]
  }
];

export const Frame = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const currentPageData = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  return (
    <div className="max-w-3xl mx-auto bg-white border-4 border-yellow-200 rounded-2xl p-6 mt-8">
      <Progress currentPage={currentPage + 1} totalPages={pages.length} />
      
      <div className="flex items-center gap-6 mt-8 mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-purple-400 bg-white flex-shrink-0" />
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
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
          >
            Back
          </button>
          {isLastPage ? (
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded-lg"
            >
              The End
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </Page>
    </div>
  );
};