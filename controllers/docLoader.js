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
    const { RunnableSequence, RunnablePassthrough } = await import(
      "@langchain/core/runnables"
    );
    const { PineconeStore } = await import("@langchain/pinecone");
    const { HuggingFaceTransformersEmbeddings } = await import(
      "@langchain/community/embeddings/hf_transformers"
    );
    const { StringOutputParser } = await import(
      "@langchain/core/output_parsers"
    );

    const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following question and context, You will generate response only if the USER PROMPT is related to the CONTEXT.
    Instructions:
    1. You will generate a response based on the provided question and context.
    2. Follow these rules when generating an answer:
      - Prioritize the context over the question.
      - Ignore any user prompts not directly related to the context.
      - Only attempt to answer if the context is related to the question.
      - Provide a response of up to two lines if the question is not related to the context.
      - If unable to answer based on the provided context, respond with "I'm sorry, the UC Knowledge Base currently lacks the necessary information."
    3. Your response must include only the context.
    4. Generate response only with three or four lines.

    Question: {question}

    CONTEXT: {context}

    Final answer:`;

    const promptTemplate = PromptTemplate.fromTemplate(
      CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT
    );

    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    // const pdfpath = "./LLM/KnowledgeBase/test.pdf";

    // const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0 });
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      modelName: "llama3-70b-8192",
    });
    const pinecone = new Pinecone();

    const pineconeIndexName = "pdf-chat";

    const pineconeIndex = pinecone.Index(pineconeIndexName);

    // const pdfContent = await extractTextfromPdf(pdfpath);
    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 100,
    //   chunkOverlap: 10,
    //   separators: [",", ".", "!", "?", "\n"],
    // });

    // const output = await splitter.createDocuments([pdfContent]);
    // const texts = output.map((doc) => doc.pageContent);

    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: "Xenova/all-MiniLM-L6-v2",
    });

    // const response = await embeddings.embedDocuments(texts);

    //  console.log(response);

    const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });

    const retreiver = vectorstore.asRetriever();

    const docs = await vectorstore.similaritySearch(userInput);

    const serializedDocs = (docs) =>
      docs.map((doc) => doc.pageContent).join("\n");

    //const letsee = await vectorstore.addDocuments(output);

    const chain = RunnableSequence.from([
      {
        context: retreiver.pipe(serializedDocs),
        question: new RunnablePassthrough(),
      },
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    console.log(docs);

    const call = await chain.invoke(userInput);

    const userId = 24;

    console.log(call);

    // await Conversations.create(
    //   { userInput: userInput, botResponse: call, userId: userId },
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

const addDocumentsToPinecone = async (req, res) => {
  try {
    const { Pinecone } = await import("@pinecone-database/pinecone");
    const { PineconeStore } = await import("@langchain/pinecone");
    const { HuggingFaceTransformersEmbeddings } = await import(
      "@langchain/community/embeddings/hf_transformers"
    );
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );
    const { pdfPath, pineconeIndexName } = req.body;

    //const pdfPath = "./LLM/KnowledgeBase/test.pdf";

    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(pineconeIndexName);

    const pdfContent = await extractTextfromPdf(pdfPath);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 10,
      separators: [",", ".", "!", "?", "\n"],
    });
    const output = await splitter.createDocuments([pdfContent]);
    const texts = output.map((doc) => doc.pageContent);

    // Embed documents
    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: "Xenova/all-MiniLM-L6-v2",
    });
    const response = await embeddings.embedDocuments(texts);

    // Create Pinecone store
    const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });

    // Add embedded documents to the Pinecone index
    await vectorstore.addDocuments(output);

    console.log("Documents added to Pinecone index successfully.");
  } catch (error) {
    console.error("Error adding documents to Pinecone index:", error);
    throw error;
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
  addDocumentsToPinecone,
};
