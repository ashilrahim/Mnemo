# 🧠 Mnemo – AI MCQ Flashcard Generator

Turn your notes and documents into smart flashcards powered by AI.  
Mnemo helps you learn faster by automatically creating MCQs and flashcards from your uploaded content.

---

## 🚀 Live Demo
🔗 [mnemo-pi.vercel.app](https://mnemo-pi.vercel.app)

---


## 📸 Preview
<img width="1898" height="923" alt="mnemoscnsht" src="https://github.com/user-attachments/assets/98ab178e-9497-4905-adf5-bbcde5322443" />

---

## 💡 Features
- Upload notes or documents to generate AI flashcards  
- AI-powered multiple-choice question (MCQ) creation  
- Clean, distraction-free interface  
- Secure Google authentication (Supabase)  
- Cloud-based flashcard management  

---

## 🧠 How It Works
1. Upload or paste your study material  
2. Mnemo’s AI processes it and generates smart flashcards  
3. Review and practice them anytime from your dashboard  

---

## 🧰 Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **Supabase (Auth + Database)**
- **OpenAI API**
- **Vercel (Deployment)**

---

## ⚙️ Developer Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ashilrahim/Mnemo.git
cd Mnemo

### 2️⃣ Install Dependencies
```bash
npm install

### 3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY =your_gemini_api_key

### 4️⃣ Run the Development Server
```bash
npm run dev



