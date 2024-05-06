const fs = require("fs");
const pdf = require("pdf-parse");
const { Conversations } = require("../sequelize/models");

const docLoader = async (req, res) => {
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { Pinecone } = await import("@pinecone-database/pinecone");
    const { ConversationalRetrievalQAChain } = await import("langchain/chains");
    const { PineconeStore } = await import("@langchain/pinecone");
    const { HuggingFaceTransformersEmbeddings } = await import(
      "@langchain/community/embeddings/hf_transformers"
    );
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );
    const { BufferMemory } = await import("langchain/memory");

    const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow-up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow-up question to be a standalone question.
Chat History:
{chat_history}
Follow-Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the user's question.
If you don't have relevant data to answer, simply state that you don't have enough information.
----------------
<Relevant chat history excerpt as context here>
Standalone question: <Rephrased question here>
\`\`\`
Your answer:`;

    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/test.pdf";

    const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0.1 });
    const pinecone = new Pinecone();

    const pineconeIndexName = "pdf-chat";

    const pineconeIndex = pinecone.Index(pineconeIndexName);

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

    //  console.log(response);

    const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });

    const docs = await vectorstore.similaritySearch(userInput);

    //const letsee = await vectorstore.addDocuments(output);

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorstore.asRetriever({ k: 6 }),
      {
        memory: new BufferMemory({
          memoryKey: "chat_history",
          inputKey: "question",
          returnMessages: true,
        }),
        questionGeneratorChainOptions: {
          template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
        },
      }
    );

    const call = await chain.invoke({ question: userInput });

    const userId = 24;

    console.log(call);

    await Conversations.create(
      { userInput: userInput, botResponse: call.text, userId: userId },
      {
        returning: [
          "id",
          "userInput",
          "botResponse",
          "userId",
          "createdAt",
          "updatedAt",
        ],
      }
    );

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
