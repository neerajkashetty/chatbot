
const docLoader = async (req, res) => {
  try {
    const { userInput } = req.body;
    const { LlamaCpp } = await import("@langchain/community/llms/llama_cpp");
    const { RetrievalQAChain } = await import("langchain/chains");
    const { FaissStore } = await import(
      "@langchain/community/vectorstores/faiss"
    );
    const {HuggingFaceTransformersEmbeddings} = await import("@langchain/community/embeddings/hf_transformers")
    const { RecursiveCharacterTextSplitter } = await import(
      "langchain/text_splitter"
    );

    
    const llamaPath = "./LLM/llama-2-7b-chat.Q2_K.gguf";
    const pdfpath = "./LLM/KnowledgeBase/test.pdf";
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
        chunkSize: 100,
        chunkOverlap: 10,
        separators: [",", ".", "!", "?", "\n"]      });

      const output = await splitter.createDocuments([pdfContent]);
      const texts = output.map(doc => doc.pageContent)
      console.log(output[0])
      

      const embeddings = new HuggingFaceTransformersEmbeddings({
        modelName: "Xenova/all-MiniLM-L6-v2",
      });

     const response = await embeddings.embedDocuments(texts);

     console.log(response)


      const vectorstore = await FaissStore.fromDocuments(output, embeddings)
  
      const result = await vectorstore.similaritySearch(userInput, 10)
      console.log(result, "result")

      const chain = RetrievalQAChain.fromLLM(
        model,
        vectorstore.asRetriever()
      );

    const res = await chain._call({
        query: userInput
    });
    console.log({ res });
    }
    const res = await generateEmbeddings(await extractTextfromPdf(pdfpath));

    return res.json({
      success: true,
      res
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
