import { useState } from "react";
import { FileText, Lightbulb, Target, Zap } from "lucide-react";

export default function TextInput({ onTextExtracted }) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [quizType, setQuizType] = useState("comprehensive");
  const [difficulty, setDifficulty] = useState("medium");

  const handleSubmit = () => {
    if (text.trim().length >= 10 && topic.trim().length >= 2) {
      // Combine topic and text for better prompt
      const enhancedText = `TOPIC: ${topic}\nQUIZ TYPE: ${quizType}\nDIFFICULTY: ${difficulty}\nCONTENT:\n${text.trim()}`;
      onTextExtracted(enhancedText);
    } else if (topic.trim().length >= 2 && text.trim().length < 10) {
      // Create structured input for topic-only submission
      const enhancedText = `TOPIC: ${topic}\nQUIZ TYPE: ${quizType}\nDIFFICULTY: ${difficulty}\nCONTENT:\nGenerate questions about ${topic}. Include key facts, concepts, and important details about ${topic}.`;
      onTextExtracted(enhancedText);
    } else {
      alert("Please enter a topic name.");
    }
  };

  // Generate detailed content for common topics
  const generateDetailedContent = (topicName) => {
    const topicLower = topicName.toLowerCase();
    
    if (topicLower.includes('plant cell') || topicLower.includes('plant cells')) {
      return `Plant cells are eukaryotic cells that are the basic building blocks of plants. They have several key features that distinguish them from animal cells:

Key Components:
- Cell Wall: Outer rigid layer made of cellulose that provides structural support and protection
- Cell Membrane: Semi-permeable membrane that controls what enters and exits the cell
- Cytoplasm: Gel-like substance where cellular processes occur
- Nucleus: Contains genetic material (DNA) and controls cell activities
- Chloroplasts: Green organelles that conduct photosynthesis to produce glucose
- Mitochondria: Powerhouses that produce ATP through cellular respiration
- Vacuoles: Large central vacuoles that store water, nutrients, and waste
- Ribosomes: Small organelles that synthesize proteins

Unique Features:
- Plant cells can photosynthesize to make their own food
- They have large central vacuoles for water storage
- The cell wall provides rigidity and fixed shape
- Chloroplasts contain chlorophyll for capturing light energy

Differences from Animal Cells:
- Plant cells have cell walls, animal cells do not
- Plant cells have chloroplasts, animal cells do not  
- Plant cells have large vacuoles, animal cells have small ones
- Plant cells are typically rectangular, animal cells are irregular

The cell wall allows plants to stand upright and maintain their shape. Chloroplasts enable plants to convert sunlight into chemical energy through photosynthesis.`;
    }
    
    if (topicLower.includes('animal cell')) {
      return `Animal cells are eukaryotic cells that make up animal tissues. They have several specialized structures:

Key Components:
- Cell Membrane: Flexible boundary that controls substance movement
- Cytoplasm: Gel-like substance containing organelles
- Nucleus: Control center containing genetic material
- Mitochondria: Powerhouses producing energy (ATP)
- Ribosomes: Sites of protein synthesis
- Endoplasmic Reticulum: Network for synthesizing proteins and lipids
- Golgi Apparatus: Processes and packages proteins
- Lysosomes: Contain digestive enzymes

Unique Features:
- No cell wall, allowing flexible movement
- No chloroplasts, cannot photosynthesize
- Small vacuoles for temporary storage
- Irregular shape for specialized functions
- Centrioles for cell division

Specialized Cells:
- Nerve cells for transmitting signals
- Muscle cells for contraction
- Blood cells for transport
- Skin cells for protection

Animal cells rely on consuming other organisms for energy since they cannot photosynthesize. The flexible cell membrane allows for movement and specialized cell shapes.`;
    }
    
    // Generic content for other topics
    return `${topicName} encompasses fundamental concepts, principles, and applications that are essential for understanding this subject. Key areas include theoretical foundations, practical implementations, and current developments. Important aspects involve core terminology, basic processes, and real-world applications that demonstrate mastery of the topic.`;
  };

  // Generate basic content for common topics
  const generateBasicContent = (topicName) => {
    const topicLower = topicName.toLowerCase();
    
    if (topicLower.includes('plant cell') || topicLower.includes('plant cells')) {
      return `Plant cells are eukaryotic cells that make up plants. Key features include:
- Cell wall: Provides structural support and protection
- Cell membrane: Controls what enters and exits the cell
- Cytoplasm: Gel-like substance where cellular processes occur
- Nucleus: Contains genetic material (DNA) and controls cell activities
- Chloroplasts: Conduct photosynthesis to produce food
- Mitochondria: Produce energy through cellular respiration
- Vacuoles: Store water, nutrients, and waste products
- Ribosomes: Synthesize proteins

Plant cells differ from animal cells by having a cell wall, chloroplasts, and large vacuoles. The cell wall is made of cellulose and provides rigidity. Chloroplasts contain chlorophyll for capturing sunlight energy.`;
    }
    
    if (topicLower.includes('animal cell')) {
      return `Animal cells are eukaryotic cells that make up animal tissues. Key components include:
- Cell membrane: Controls movement of substances in and out
- Cytoplasm: Contains organelles and where metabolic reactions occur
- Nucleus: Houses DNA and controls cellular activities
- Mitochondria: Powerhouses of the cell, producing ATP
- Ribosomes: Sites of protein synthesis
- Endoplasmic reticulum: Synthesizes proteins and lipids
- Golgi apparatus: Processes and packages proteins
- Lysosomes: Contain digestive enzymes

Animal cells lack cell walls and chloroplasts, making them flexible and unable to perform photosynthesis.`;
    }
    
    // Generic content for other topics
    return `${topicName} is an important subject that involves various concepts, principles, and applications. Understanding ${topicName} requires knowledge of key terminology, fundamental processes, and practical examples. This topic encompasses multiple aspects including theoretical foundations, practical applications, and current developments in the field.`;
  };

  const isFormValid = topic.trim().length >= 2;

  // Auto-detect topic from text if possible
  const handleTextChange = (newText) => {
    setText(newText);
    if (!topic && newText.length > 50) {
      // Try to extract a topic from the first few sentences
      const firstSentence = newText.split('.')[0];
      if (firstSentence.length > 10 && firstSentence.length < 50) {
        setTopic(firstSentence.replace(/[^a-zA-Z0-9 ]/g, '').trim());
      }
    }
  };

  const quizTypes = [
    { id: "comprehensive", name: "Comprehensive", desc: "Covers all aspects of the topic" },
    { id: "conceptual", name: "Conceptual", desc: "Focuses on understanding concepts" },
    { id: "detailed", name: "Detailed", desc: "Tests specific facts and details" },
    { id: "application", name: "Application", desc: "Practical application questions" }
  ];

  const difficulties = [
    { id: "easy", name: "Easy", desc: "Basic understanding" },
    { id: "medium", name: "Medium", desc: "Moderate challenge" },
    { id: "hard", name: "Hard", desc: "Advanced questions" },
    { id: "expert", name: "Expert", desc: "In-depth knowledge" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" />
          Create Custom Quiz
        </h2>
        <p className="text-gray-600 mb-4">
          Enter a topic and content to generate a targeted quiz. The AI will create relevant questions based on your input.
        </p>
      </div>

      {/* Topic Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Quiz Topic *
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter the main topic (e.g., 'Python Programming', 'World War II', 'Photosynthesis')"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500">This helps AI generate more focused questions</p>
      </div>

      {/* Quiz Configuration */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Type
          </label>
          <select
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {quizTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.desc}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {difficulties.map(diff => (
              <option key={diff.id} value={diff.id}>
                {diff.name} - {diff.desc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Content for Quiz Generation *
        </label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Paste or type the content you want to be quizzed on. Include key concepts, facts, and details. The AI will generate questions based on this content.

Examples:
- Programming concepts with code examples
- Historical events with dates and significance
- Scientific theories with explanations
- Book summaries with character details"
          className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
          rows={8}
        />
        <div className="flex justify-between items-center">
          <span className={`text-sm ${text.length < 10 ? 'text-red-500' : 'text-green-600'}`}>
            {text.length} characters {text.length < 10 ? '(minimum 10)' : '(✓ ready)'}
          </span>
          <span className={`text-sm ${topic.length < 2 ? 'text-red-500' : 'text-green-600'}`}>
            Topic: {topic || 'Not set'}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center mt-3">
        <div>
          {!isFormValid && (
            <p className="text-red-500 text-sm">
              Please enter a topic and at least 10 characters of content
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 ${
            !isFormValid 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
          }`}
        >
          <Zap className="w-4 h-4" />
          Generate Smart Quiz
        </button>
      </div>

      {text.length > 0 && text.length < 10 && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            ⚠️ Please enter at least 10 characters to generate a meaningful quiz.
          </p>
        </div>
      )}
    </div>
  );
}