interface QuestionProps {
  question: string;
  onChange: (value: string) => void;
  value: string;
}

export const Question = ({ question, onChange, value }: QuestionProps) => {
  return (
    <div className="mb-4">
      <label className="block text-purple-600 text-lg font-medium mb-2">
        {question}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
      />
    </div>
  );
};