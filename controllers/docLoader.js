const fs = require("fs");
const pdf = require("pdf-parse");
const { Conversations } = require("../sequelize/models");

const docLoader = async (req, res) => {
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { PromptTemplate } = await import("@langchain/core/prompts");
    const { ChatGroq } = await import("@langchain/groq");
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

    const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following user prompt and context, answer only if the USER PROMPT is related to the CONTEXT.
    You should follow the following rules when generating and answer:
    - Always prioritize the context over the user prompt.
    - Ignore any user prompt that is not directly related to the context.
    - Only attempt to answer if a context is related to user prompt.
    - If the user prompt is not related to the context then respond with UC do not have this information.
    - If you are unable to answer the user's question based on the context provided, please respond with "I'm very Sorry, The UC Knowledge Base does'nt have the information currently".
    - Your response must contain only the context you get.

    USER PROMPT: {question}

    CONTEXT: {context}

    Final answer:`;

    const promptTemplate = new PromptTemplate({
      template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
      inputVariables: ["question", "context"],
    });

    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/test.pdf";

    // const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0 });
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
    });
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

    console.log(docs);

    const call = await chain.invoke({ question: userInput, context: docs });

    const userId = 24;

    console.log(call);

    // await Conversations.create(
    //   { userInput: userInput, botResponse: call.text, userId: userId },
    //   {
    //     returning: [
    //       "id",
    //       "userInput",
    //       "botResponse",
    //       "userId",
    //       "createdAt",
    //       "updatedAt",
    //     ],
    //   }
    // );

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
