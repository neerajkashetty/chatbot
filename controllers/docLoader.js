
const docLoader = async (req, res) => {
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { RetrievalQAChain } = await import("langchain/chains");
    const { FaissStore } = await import(
      "@langchain/community/vectorstores/faiss"
    );
    const { LlamaCppEmbeddings } = await import(
      "@langchain/community/embeddings/llama_cpp"
    );
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );

    
    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/test.pdf";
    const fs = require("fs");
    const {PDFLoader} = await import("langchain/document_loaders/fs/pdf")

    const loader = new PDFLoader(llamaPath)

    const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0.1 });

    console.log("kjefhejw")

    async function extractTextfromPdf(pdfpath) {
      console.log(pdfpath);

      let dataBuffer = fs.readFileSync(pdfpath);

      const pdfData = await pdf(dataBuffer);

      return pdfData.text;
    }

    async function generateEmbeddings() {
      const pdfContent = await extractTextfromPdf(pdfpath);
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 1,
      });

      const output = await splitter.createDocuments([pdfContent]);

      const docs = await loadQAMapReduceChain.load

      const embeddings = new LlamaCppEmbeddings({
        modelPath: llamaPath,
        embedding: output
      });

   //   const response = await embeddings.embedDocuments(pdfContent);

      const vectorstore = await FaissStore.fromDocuments(output, embeddings); 

      const result = await vectorstore.similaritySearch("testing", 1)
      console.log(result)

      // const chain = RetrievalQAChain.fromLLM(
      //   model,
      //   vectorstore.asRetriever()
      // );

    //   console.log(chain)


    // const res = await chain._call({
    //     query: "What is mentioned in pdf?"
    // });
    // console.log({ res });
    }

    generateEmbeddings();

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
    });
  }
};

module.exports = {
  docLoader,
};
