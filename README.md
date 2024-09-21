# University of Cincinnati Chatbot ( Unibot)

## Description
This chatbot assists students at the University of Cincinnati by providing accurate, real-time answers to their queries. Built with the Retrieval-Augmented Generation (RAG) framework, the chatbot pulls data from university knowledge bases and uses advanced natural language processing (NLP) through LLAMA-3 for intelligent responses. The system is designed for scalability and ease of use, combining a serverless architecture with Cloudflare Workers for the backend.

## Features
- Real-time, accurate responses using RAG and LLAMA-3 models.
- Serverless backend using Cloudflare Workers.
- Scalable and fast queries with Pinecone as the vector database.
- PostgreSQL for storing persistent data such as FAQs and logs.
- React-based frontend for a responsive user interface.

## Technologies
- **Backend**: Serverless architecture powered by Cloudflare Workers.
- **Frontend**: React.js.
- **Database**: PostgreSQL (for data storage) and Pinecone (as a vector database for semantic search).
- **Machine Learning**: LLAMA-3 model integrated with the RAG framework for NLP.
  
## Installation
### Prerequisites
- Node.js v14+
- PostgreSQL
- Cloudflare Workers CLI (`wrangler`)
- Pinecone API access

### Clone the Repository
```bash
git clone https://github.com/username/university-chatbot.git
