import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getBookSummary(req,res){
    try{
        const { title, author, description } = req.body;

        if(!title || !author){
            return res.status(400).json({
                success: false,
                message: "Title and author are required."
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        const prompt =`
          You are a professional audiobook assistant.
          
          Give me a structured summary for the following book:
          Title: "${title}"
          Author: "${author}"
          ${description ? `Description: "${description}"` : ""}

          Respond in this exact JSON format with no extra text:
          { 
           "overview": "2-3 sentence overview of what the book is about",
           "keyThemes": ["theme 1", "theme 2", "theme 3"],
           "targetAudience": "who should read this book",
           "keyTakeaway": "the single most important lesson from this book",
           "rating" : "your rating out of 10 with one sentence reason"
           }
        `;
        
        const result =  await model.generateContent(prompt);
        const text = result.response.text();

        //Cleaning the response to ensure it's valid JSON
        const cleaned = text
            .replace(/```json/g, "") // Remove code block markers if present
            .replace(/```/g, "") // Remove any remaining code block markers
            .trim();

        const summary = JSON.parse(cleaned);

        res.json({ success: true, summary });
    } catch(error){
        console.log("AI error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to generate summary. Try again."
        });
    }
}

export async function getRecommendations(req,res) {
    try{
        const { likedBooks } = req.body;

        if(!likedBooks || likedBooks.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please provide a list of liked books."
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        const bookList = likedBooks
             .map((b) => `"${b.title}" by ${b.author}`)
             .join(", ");

        const prompt = `
         A user enjoys these audiobooks: ${bookList}.
         
         Recommend 4 similar audiobooks they would love.
         
         Respond in this exact JSON format with no extra text:
         {
                "recommendations": [
                {
                    "title": "Book Title",
                    "author": "Author Name",
                    "reason": "One sentence reason why this book is recommended"
                }
            ]
         }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        //Cleaning the response to ensure it's valid JSON
        const cleaned = text
            .replace(/```json/g, "") // Remove code block markers if present
            .replace(/```/g, "") // Remove any remaining code block markers
            .trim();

        const data = JSON.parse(cleaned);

        res.json({success: true, recommendations: data.recommendations});
    } catch(error){
        console.log("AI error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to generate recommendations. Try again."
        });
    }
}