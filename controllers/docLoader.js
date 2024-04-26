const fs = require("fs");
const pdf = require("pdf-parse");
const { conversations } = require("../sequelize/models");

const docLoader = async (req, res) => {
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { RetrievalQAChain } = await import("langchain/chains");
    const { FaissStore } = await import(
      "@langchain/community/vectorstores/faiss"
    );
    const { HuggingFaceTransformersEmbeddings } = await import(
      "@langchain/community/embeddings/hf_transformers"
    );
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );
    const { RunnablePassthrough, RunnableSequence } = await import(
      "langchain/schema/runnable"
    );

    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/test.pdf";

    const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0.1 });

    const pdfContent = await extractTextfromPdf(pdfpath);
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 10,
      separators: [",", ".", "!", "?", "\n"],
    });

    const output = await splitter.createDocuments([pdfContent]);
    const texts = output.map((doc) => doc.pageContent);

    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: "Xenova/all-MiniLM-L6-v2",
    });

    const response = await embeddings.embedDocuments(texts);
    const vectorstore = await FaissStore.fromDocuments(output, embeddings);

    const result = await vectorstore.similaritySearch(userInput, 10);

    const chain = RetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
      qaTemplate: QA_PROMPT,
    });
    const call = await chain._call({ query: userInput });

    await conversations.create({
      userInput: userInput,
      botResponse: call.answer,
    });

    return res.json({ success: true, response: call });
  } catch (error) {
    console.error("Error in docLoader:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

async function extractTextfromPdf(pdfpath) {
  try {
    const dataBuffer = fs.readFileSync(pdfpath);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error in extractTextfromPdf:", error);
    throw error;
  }
}

module.exports = {
  docLoader,
};
