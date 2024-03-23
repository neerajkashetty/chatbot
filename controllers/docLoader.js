
const docLoader = async (req, res) => {
  console.log("jbfkjab");
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { RetrievalQAChain } = await import("langchain/chains");
    const { HNSWLib } = await import(
      "@langchain/community/vectorstores/hnswlib"
    );
    const { LlamaCppEmbeddings } = await import(
      "@langchain/community/embeddings/llama_cpp"
    );
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );

    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/Bharath_Varma_Module_06.pdf";
    const fs = require("fs");
    const pdf = require("pdf-parse");

    const model = new LlamaCpp({ modelPath: llamaPath, temperature: 0.1 });

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

      const embeddings = new LlamaCppEmbeddings({
        modelPath: llamaPath,
        embedding: output
      });

   //   const response = await embeddings.embedDocuments(pdfContent);

      const vectorstore = await HNSWLib.fromDocuments(output, embeddings); 

      const result = await vectorstore.addVectors
      console.log(result)

      const chain = RetrievalQAChain.fromLLM(
        model,
        vectorstore.asRetriever()
      );

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
